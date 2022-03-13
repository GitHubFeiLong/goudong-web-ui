<template>
  <input type="file" @change="change" >
  <input type="button" value="上传" @click="shardUpload">
  <input type="button" value="暂停" @click="pauseShardUpload">
  <input type="button" value="下载" @click="download">

  <div class="demo-progress">
    <el-progress :percentage="percentage" />
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import * as FileUtil from '@/utils/FileUtil';
import {download as dddd, saveAs} from '@/utils/MultiThreadDownload';
const moment = require('moment');
let myFiles = ref<FileList>();

/**
 * 上传
 */
let percentage = new ref<number>(0);
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
  console.log("下载")
  // FileUtil.shardDownload();
  multiThreadedDownload()
}

function multiThreadedDownload() {
  const url = "http://localhost:9998/api/file/download-group/download";
  if (!url || !/https?/.test(url)) return;
  console.log("多线程下载开始: " + +new Date());
  dddd(url, 100 * 1024, 1).then((buffers) => {
    console.log("多线程下载结束: " + +new Date());
    saveAs({ buffers, name: "我的压缩包", mime: "application/zip" });
  });
}
</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
