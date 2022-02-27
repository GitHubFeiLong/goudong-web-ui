<template>
  <input type="file" @change="getFile" multiple >
  <input type="button" value="上传" @click="uploadDemo">
  <input type="button" value="下载" @click="uploadDemo">
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import * as FileServerApi from '@/api/GoudongFileServerApi';
import AxiosUtil from "@/utils/AxiosUtil";
import axios from "axios";
const CryptoJS = require('crypto-js');

const BASE_URL = require('/src/config/BaseUrl.ts');

let myFiles = ref<FileList>();
/**
 * 上传
 */
const uploadDemo = () => {
  let files : FileList | undefined = myFiles.value;

  if (files != undefined) {
    for (let i = 0; i < files.length; i++) {
      console.log("====第%o个文件===", i)
      // 分片
      let num = 0, start = 0, end = 0;
      // 上传块的大小
      const blockSize = 50 * 1024;
      const file = files[i];
      const fileName = file.name;
      const fileSize = file.size;
      const fileType = fileName.substring(fileName.lastIndexOf(".")+1).toUpperCase();
      const fileMd5 = CryptoJS.MD5(file).toString();
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

        let config = {
          headers: { "Content-Type": "multipart/form-data"}
        };

        AxiosUtil.post("/api/file/upload-group/shard-upload", param, config);
        // axios.post("http://localhost:10004/api/file/upload-group/shard-upload", param, config);
      }
    }

    // axios.post("http://localhost:10000/api/file/upload-group/upload-demo", param, config);


    // let param = new FormData(); // 创建form对象
    // param.append("file", file); // 通过append向form对象添加数据
    //
    // param.append("originalFilename", "demo"); // 添加form表单中其他数据
    //
    // console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去


    // let config = {
    //   headers: { "Content-Type": "multipart/form-data", "Range":"bytes=0-10" }
    // };
    //
    // axios.post("http://localhost:10000/api/file/upload-group/upload-demo", param, config);

    // 分片上传
    // FileServerApi.uploadDemo(param,customAxiosRequestConfig).then(response=>{
    //
    // });
  }

}

/**
 * 文件change事件
 * @param e
 */
const getFile = (e:any) => {
  // 返回FileList对象File集合
  let files = e.target.files;
  // let file:File = files[0] as File;
  // console.log(file)
  myFiles.value = files;
}

</script>
