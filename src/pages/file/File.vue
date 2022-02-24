<template>
  <el-upload
    class="upload-demo"
    :action="host"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>

  <input type="file" @change="getFile" multiple >
  <input type="button" value="下载" @click="uploadDemo">
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import * as FileServerApi from '@/api/GoudongFileServerApi';
import type {UploadFile} from 'element-plus/es/components/upload/src/upload.type'
import CustomAxiosRequestConfig from "@/pojo/CustomAxiosRequestConfig";
import {RequestOther} from "@/pojo/RequestOther";
import Header from '@/pojo/Header';
import axios from "axios";

const BASE_URL = require('/src/config/BaseUrl.ts');

let customAxiosRequestConfig = CustomAxiosRequestConfig.build();

customAxiosRequestConfig.req(
  RequestOther.builder().headers([new Header("Range","bytes=0-10")]).build()
);
let fileData = []
const download = ()=>{
  console.log(111)
  FileServerApi.download(customAxiosRequestConfig).then((response)=>{
    console.log(response)
    fileData.push(response.data)
  })
}

let myFiles = ref<FileList>();
const uploadDemo = () => {

  let files : FileList | undefined = myFiles.value;

  if (files != undefined) {
    for (let i = 0; i < files.length; i++) {
      console.log("====第%o个文件===", i)
      // 分片
      let num = 0, start = 0, end = 0;
      let blockSize = 50 * 1024;
      let file = files[i];
      // 文件API
      num = Math.ceil(file.size / blockSize);
      for (let j = 0; j <num; j++) {
        start = end == 0 ? 0 : end + 1;
        end = (start + blockSize > file.size) ? file.size : (start + blockSize);
        console.log("第%o块，start=%o,end=%o", j, start, end)

        let param = new FormData(); // 创建form对象
        // 分片
        let shardData = file.slice(start, end);
        param.append("fileMd5", "fileMd5"); // 通过append向form对象添加数据
        param.append("fileName", file.name); // 通过append向form对象添加数据
        param.append("fileSize", file.size.toString()); // 通过append向form对象添加数据
        param.append("shardTotal", num.toString()); // 通过append向form对象添加数据
        param.append("shardIndex", j.toString()); // 添加form表单中其他数据
        param.append("shardData", shardData); // 添加form表单中其他数据

        console.log(param);
        let config = {
          headers: { "Content-Type": "multipart/form-data", "Range":"bytes=0-10" }
        };

        axios.post("http://localhost:10004/api/file/upload-group/upload-demo", param, config);
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

const getFile = (e:any) => {
  let files = e.target.files;
  // let file:File = files[0] as File;
  // console.log(file)

  myFiles.value = files;
}


interface RawFile {
  name: string
  url: string
}
// const host = ref<String>(`${BASE_URL.gatewayUrl}api/file/upload-group/upload`);
const host = ref<String>(`http://localhost:10004/api/file/upload-group/upload`);
const fileList = ref<RawFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
  console.log(file, fileList)
}
const handlePreview = (file: UploadFile) => {
  console.log(file)
}
const handleExceed = (files: FileList, fileList: UploadFile[]) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + fileList.length
    } totally`
  )
}
const beforeRemove = (file: UploadFile, fileList: UploadFile[]) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${file.name} ?`)
}
</script>
