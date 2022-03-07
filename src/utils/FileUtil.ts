import * as fileServerApi from "@/api/GoudongFileServerApi";
import SparkMD5 from "spark-md5";

const moment = require("moment");

/**
 * 多文件进行分片上传文件
 * @param files 文件数组
 * @param blockSize 分片大小 默认值是5MB
 * @param percentage 接受后端上传成功的百分比
 */
export function shardUpload (files: FileList, blockSize: number = 1024*1024*5, percentage:any){
  let config = {
    headers: { "Content-Type": "multipart/form-data"}
  };

  new Promise<string[]>((resolve => {
    let filesMd5 : string[] = [];
    // 先计算选择文件的MD5值
    for (let i = 0; i < files.length; i++) {
      // 计算md5值
      // 获取文件二进制数据
      let fileReader = new FileReader();
      let spark = new SparkMD5.ArrayBuffer();
      fileReader.readAsArrayBuffer(files[i]);
      fileReader.onload = function (e) {
        // @ts-ignore
        spark.append(e.target.result);
        let md5 = spark.end();
        filesMd5.push(md5);
        console.log(md5);
        if (i === files?.length - 1) {
          resolve(filesMd5)
        }
      };
    }

  })).then((filesMd5)=>{
    console.log("计算完了所有的md5:"+ filesMd5)

    let formDataArray: Array<FormData> = [];
    for (let i = 0; i < files.length; i++) {
      console.log("====第%o个文件===", i)
      // 分片
      let num = 0, start = 0, end = 0;
      const file = files[i];
      const fileName = file.name;
      const fileSize = file.size;
      const fileType = fileName.substring(fileName.lastIndexOf(".")+1).toUpperCase();
      let fileMd5 = filesMd5[i];

      const lastModifiedTime = moment(new Date(file.lastModified)).format("yyyy-MM-DD HH:mm:ss");
      // 文件API
      num = Math.ceil(fileSize / blockSize);
      for (let j = 0; j <num; j++) {
        // 这里的本次start是上次的end（注意：不然会少一个字节）
        start = end;
        end = (start + blockSize > fileSize) ? fileSize : (start + blockSize);
        console.log("第%o块，start=%o,end=%o", j, start, end)

        let param = new FormData(); // 创建form对象
        // 分片
        let shardData = file.slice(start, end);
        param.append("fileMd5", fileMd5); // 通过append向form对象添加数据
        param.append("fileName", fileName); // 通过append向form对象添加数据
        param.append("fileType", fileType); // 通过append向form对象添加数据
        param.append("fileSize", fileSize.toString()); // 通过append向form对象添加数据
        param.append("blockSize", blockSize.toString()); // 通过append向form对象添加数据
        param.append("shardTotal", num.toString()); // 通过append向form对象添加数据
        param.append("shardIndex", j.toString()); // 添加form表单中其他数据
        param.append("shardData", shardData); // 添加form表单中其他数据
        param.append("lastModifiedTime", lastModifiedTime); // 添加form表单中其他数据

        formDataArray.push(param);

      }
    }

    // 递归上传
    let index = 0;
    const innerShardUpload = (index: number) => {
      if (index < formDataArray.length) {
        console.log("第%o次调用接口", index + 1)
        fileServerApi.shardUpload(formDataArray[index], config).then((response)=>{
          if (!response.data.data.entiretySuccessful) {
            index++;
            innerShardUpload(index);
            console.log("index", index)
            console.log(response.data.data.percentage)
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
      console.log(formDataArray)
      innerShardUpload(0);
    }
  });

}
