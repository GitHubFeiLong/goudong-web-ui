import * as FileServerApi from "@/api/GoudongFileServerApi";
import CryptoJS from "crypto-js";
import SparkMD5 from "spark-md5";
import * as HttpHeaderConst from "@/constant/HttpHeaderConst";
import {ElMessage} from "element-plus";

const moment = require("moment");

/**
 * 默认块大小 5MB
 */
const DEFAULT_BLOCK_SIZE: number = 1024*1024*5;

const GB : number = 1024 * 1024 * 1024;

let config = {
  headers: { "Content-Type": "multipart/form-data"}
};

/**
 * 上传失败
 * @param shardUploadReactive
 * @param error
 */
function shardUploadFailed(shardUploadReactive: ShardUploadReactive, error: any) {
  shardUploadReactive.status = UploadStatusEnum.FAILED;
  shardUploadReactive.endTime = new Date().getTime();
  shardUploadReactive.totalTime = shardUploadReactive.endTime -
    (shardUploadReactive.startTime as number) -
    shardUploadReactive.pauseTotalTime;
  if (error.data.clientMessage) {
    shardUploadReactive.errorMessage = error.data.clientMessage;
  } else {
    shardUploadReactive.errorMessage = error;
  }
}

/**
 * 单文件的分片上传
 * @param file 待上传文件
 * @param percentage 接受上传的百分比
 * @param blockSize 分块大小
 */
export function shardUpload (file: File, shardUploadReactive: ShardUploadReactive, blockSize: number = DEFAULT_BLOCK_SIZE){

  new Promise<string>(resolve => {
    /*
      当文件已经计算过md5值后，就直接判断文件是否有修改
      如果未修改就直接使用原md5（减少计算时间）
      如果有修改就需要重新计算md5
     */
    if (shardUploadReactive.shardPrefixCheckParam.lastModifiedTime != null) {
      let equalsLastModify = shardUploadReactive.shardPrefixCheckParam.lastModifiedTime === moment(new Date(file.lastModified)).format("yyyy-MM-DD HH:mm:ss");
      if (equalsLastModify) {
        resolve(shardUploadReactive.shardPrefixCheckParam.fileMd5 as string)
      }
    }
    /*
      正常情况下，需要计算文件的md5值
     */
    if (file.size <= GB) {
      // 获取文件二进制数据，计算md5值
      let fileReader = new FileReader();
      let spark = new SparkMD5.ArrayBuffer();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = function (e) {
        // @ts-ignore
        spark.append(e.target.result);
        let md5 = spark.end();
        resolve(md5)
      };
    } else {
      // @ts-ignore
      let md5 = CryptoJS.MD5(file).toString();
      resolve(md5)
    }
  }).then(md5 => {
    console.log("解析完文件的md5值：%o", md5)

    // 分片
    let num = 0;
    const fileName = file.name;
    const fileSize = file.size;
    const fileType = fileName.substring(fileName.lastIndexOf(".")+1).toUpperCase();
    const lastModifiedTime = moment(new Date(file.lastModified)).format("yyyy-MM-DD HH:mm:ss");
    // 文件API
    num = Math.ceil(fileSize / blockSize);
    // 构造预检参数对象
    let shardPrefixCheckParam = new ShardPrefixCheckParam();
    shardPrefixCheckParam.fileMd5 = md5;
    shardPrefixCheckParam.fileType = fileType
    shardPrefixCheckParam.fileSize = fileSize
    shardPrefixCheckParam.lastModifiedTime = lastModifiedTime
    shardPrefixCheckParam.blockSize = blockSize
    shardPrefixCheckParam.shardTotal = num

    // 先预检，再上传
    FileServerApi.shardPrefixCheck(shardPrefixCheckParam).then((response)=>{
      // 获取后端返回的失败数组和进度
      let entiretySuccessful = response.data.data.entiretySuccessful;

      if (entiretySuccessful) {
        console.log("上传完成")
        // 上传完成
        shardUploadReactive.percentage = response.data.data.percentage;
        shardUploadReactive.endTime = new Date().getTime();
        shardUploadReactive.status = UploadStatusEnum.FINISHED
        shardUploadReactive.totalTime = shardUploadReactive.endTime -
          (shardUploadReactive.startTime as number) -
          shardUploadReactive.pauseTotalTime;

        return;
      }

      // 给rective对象赋值
      shardUploadReactive.shardPrefixCheckParam.fileMd5 = shardPrefixCheckParam.fileMd5;
      shardUploadReactive.shardPrefixCheckParam.fileType = shardPrefixCheckParam.fileType
      shardUploadReactive.shardPrefixCheckParam.fileSize = shardPrefixCheckParam.fileSize
      shardUploadReactive.shardPrefixCheckParam.lastModifiedTime = shardPrefixCheckParam.lastModifiedTime
      shardUploadReactive.shardPrefixCheckParam.blockSize = shardPrefixCheckParam.blockSize
      shardUploadReactive.shardPrefixCheckParam.shardTotal = shardPrefixCheckParam.shardTotal

      // 未上传索引
      let unsuccessfulShardIndexArray:number[] = response.data.data.unsuccessfulShardIndexArray;
      // 将分片后的formData放进数组中
      let formDataArray: FormData[] = [];

      unsuccessfulShardIndexArray.forEach(index=>{
        let start = index * blockSize;
        let end = (start + blockSize) > fileSize ? fileSize : (start + blockSize);
        console.log("第%o块，start=%o,end=%o", index, start, end)
        let param = new FormData(); // 创建form对象
        // 分片
        let shardData = file.slice(start, end);
        param.append("fileMd5", md5); // 通过append向form对象添加数据
        param.append("fileName", fileName); // 通过append向form对象添加数据
        param.append("fileType", fileType); // 通过append向form对象添加数据
        param.append("fileSize", fileSize.toString()); // 通过append向form对象添加数据
        param.append("blockSize", blockSize.toString()); // 通过append向form对象添加数据
        param.append("shardTotal", num.toString()); // 通过append向form对象添加数据
        param.append("shardIndex", index.toString()); // 添加form表单中其他数据
        param.append("shardData", shardData); // 添加form表单中其他数据
        param.append("lastModifiedTime", lastModifiedTime); // 添加form表单中其他数据

        // 添加到数组
        formDataArray.push(param);
      })

      // 前面是准备工作
      shardUploadReactive.status = UploadStatusEnum.UPLOADING;
      // 递归上传
      const innerShardUpload = (index: number) => {
        if (index < formDataArray.length && shardUploadReactive.status == UploadStatusEnum.UPLOADING) {
          console.log("第%o次调用接口", index + 1)
          let formData = formDataArray[index]

          FileServerApi.shardUpload(formData, config).then((response)=>{
            shardUploadReactive.percentage = response.data.data.percentage;
            if (!response.data.data.entiretySuccessful) {
              index++;
              innerShardUpload(index);
            } else {
              shardUploadReactive.status = UploadStatusEnum.FINISHED;
              shardUploadReactive.endTime = new Date().getTime();
              shardUploadReactive.totalTime = shardUploadReactive.endTime -
                (shardUploadReactive.startTime as number) -
                shardUploadReactive.pauseTotalTime;
            }

          }).catch((error)=>{
            console.error("分片%o上传失败：%o", index, error)
            shardUploadFailed(shardUploadReactive, error);
          });
        }
      }

      if (formDataArray.length > 0) {
        innerShardUpload(0);
      }
    }).catch((error)=>{
      console.log("失败", error)
      shardUploadFailed(shardUploadReactive, error);
    })

  })

}

/**
 * 多文件进行分片上传文件
 * @param files 文件数组
 * @param percentages 接受后端上传成功的百分比对象数组
 * @param blockSize 分片大小 默认值是5MB
 */
export function shardUploads (files: FileList, reactive:any[], blockSize: number = DEFAULT_BLOCK_SIZE){
  // if (files.length !== reactive.length) {
  //   console.error("批量上传的文件数量和接受百分比数量不一致")
  //   ElMessage.error('批量上传的文件数量和接受百分比数量不一致')
  //   return false;
  // }
  //
  // for (let i = 0; i < files.length; i++) {
  //   shardUpload(files[i], reactive[i])
  // }
}


/**
 * 分段下载
 */
let bytes = 1024*100;
export function shardDownload():void{
  // getContentLength().then((contentLength)=>{
  //   console.log(contentLength)
  //   rangeDownload(0, contentLength)
  // })

}


//@ts-ignore
import { saveAs } from 'file-saver';
import {shardPrefixCheck} from "@/api/GoudongFileServerApi";
import {ShardPrefixCheckParam} from "@/pojo/ShardPrefixCheckParam";
import {reactive} from "vue";
import {ShardUploadReactive} from "@/pojo/ShardUploadReactive";
import {UploadStatusEnum} from "@/enum/UploadStatusEnum";
function rangeDownload(start:number, end: number) {
  let config = {
    headers: { "Range": `bytes=${start}-${end}`}
  }
  FileServerApi.download(config).then((response)=>{
    let range = response.headers[HttpHeaderConst.CONTENT_RANGE];
    let disposition = response.headers[HttpHeaderConst.CONTENT_DISPOSITION];
    if (response.status === 200) {
      //将arraybuffer转成blob
      saveAs(new Blob([response.data]), '1.png')
    }

    if (response.status === 206) {
      saveAs(new Blob([response.data]), '1.png')
      // rangeDownload(end + 1, 10240000)
    }

    console.log("下载成功：", response)
  });
}
