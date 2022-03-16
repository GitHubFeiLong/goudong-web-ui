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
 * 单文件的分片上传
 * @param file 待上传文件
 * @param percentage 接受上传的百分比
 * @param blockSize 分块大小
 */
export function shardUpload (file: File, percentage: any, blockSize: number = DEFAULT_BLOCK_SIZE){
  new Promise<string>(resolve => {
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
    // 将分片后的formData放进数组中
    let formDataArray: FormData[] = [];
    // 分片
    let num = 0, start = 0, end = 0;
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
      let entiretySuccessful = response.data.data.entiretySuccessful
      if (entiretySuccessful) {
        // 上传完成

      }
      let percentage = response.data.data.percentage


      let unsuccessfulShardIndexArray:number[] = response.data.data.unsuccessfulShardIndexArray;

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

      // 递归上传
      const innerShardUpload = (index: number) => {
        if (index < formDataArray.length) {
          console.log("第%o次调用接口", index + 1)
          let formData = formDataArray[index]
          formData.forEach((value, key) => {
            console.log("key %s: value %s", key, value);
          })

          FileServerApi.shardUpload(formData, config).then((response)=>{
            if (!response.data.data.entiretySuccessful) {
              index++;
              innerShardUpload(index);
            }
            percentage.value = response.data.data.percentage;
          }).catch((error)=>{
            console.error("分片%o上传失败：%o", index, error)
            index++;
            // 上传失败就不再上传了，因为可能会出现很多次错误弹框
            ///innerShardUpload(index);
          });
        }
      }

      if (formDataArray.length > 0) {
        // console.log(.keys())

        innerShardUpload(0);
      }
    })

  })

}

/**
 * 多文件进行分片上传文件
 * @param files 文件数组
 * @param percentages 接受后端上传成功的百分比对象数组
 * @param blockSize 分片大小 默认值是5MB
 */
export function shardUploads (files: FileList, percentages:any[], blockSize: number = DEFAULT_BLOCK_SIZE){
  if (files.length !== percentages.length) {
    console.error("批量上传的文件数量和接受百分比数量不一致")
    ElMessage.error('批量上传的文件数量和接受百分比数量不一致')
    return false;
  }

  for (let i = 0; i < files.length; i++) {
    shardUpload(files[i], percentages[i])
  }
}

/**
 * 获取文件完整大小
 */
// function getContentLength(): Promise<number>{
//   return new Promise<number>((resolve, reject)=>{
//     FileServerApi.getContentLength("").then((response)=>{
//       resolve(response.headers[HttpHeaderConst.CONTENT_LENGTH])
//     })
//   })
// }

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
