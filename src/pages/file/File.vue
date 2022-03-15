<template>
  <div>
    <input type="file" @change="change" >
    <input type="button" value="上传" @click="shardUpload">
    <div class="demo-progress">
      <el-progress :percentage="percentage" />
    </div>
  </div>
  <div>
    <input type="text" placeholder="文件id" v-model="downloadFileId">
    <input type="button" value="下载" @click="download">
  </div>

<!--  <input type="button" value="暂停" @click="pauseShardUpload">-->



</template>
<script lang="ts" setup>
import {ref} from 'vue'
import * as FileUtil from '@/utils/FileUtil';
import {download as dddd, saveAs} from '@/utils/MultiThreadDownload';
import * as FileServerApi from "@/api/GoudongFileServerApi";
import {AxiosResponse} from "axios";
const moment = require('moment');
let myFiles = ref<FileList>();

let downloadFileId = ref<bigint>(BigInt(0));
/**
 * 上传
 */
let percentage = ref<number>(0);
percentage.value = 0
const shardUpload = () => {
  let files : FileList | undefined = myFiles.value;

  if (files != undefined) {
    FileUtil.shardUploads(files, [percentage])
  }
}

/**
 * 文件change事件
 * @param e
 */
const change = (e:any) => {
  // 返回FileList对象File集合
  let files = e.target.files;
  // let file:File = files[0] as File;
  // console.log(file)
  myFiles.value = files;
}

/**
 * 暂停上传
 */
const pauseShardUpload = () => {

}

const download = ()=>{
  // FileUtil.shardDownload();
  multiThreadedDownload(downloadFileId.value)
}

async function multiThreadedDownload(fileId:bigint) {
  // 1. 获取文件基本信息
  // let fileId:bigint = BigInt(1503339420588314624);
  let response:AxiosResponse = await FileServerApi.fileLink(fileId, 0)
  let file = response.data.data;
  const url = "http://localhost:9998/api/file/download-group/download?fileId="+fileId;
  if (!url || !/https?/.test(url)) return;
  dddd(url, file.size, 1024*1024).then((buffers) => {
    console.log("多线程下载结束: " + +new Date());
    saveAs(file.originalFilename, buffers, file.mimeType);
  });
}

</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
