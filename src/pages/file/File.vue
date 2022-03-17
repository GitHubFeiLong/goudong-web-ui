<template>
  <div>
    <input type="file" @change="change" >
    <input type="button" value="上传" @click="shardUpload">
    <input v-if="shardUploadReactive.pause" type="button" value="继续" @click="shardUploadReactive.pause=false">
    <input v-else type="button" value="暂停" @click="shardUploadReactive.pause=true">
    <div class="demo-progress">
      <el-progress :percentage="shardUploadReactive.percentage" />
    </div>
  </div>
  <div>
    <input type="text" placeholder="文件id" v-model="downloadFileId">
    <input type="button" value="下载" @click="download">
  </div>

<!--  <input type="button" value="暂停" @click="pauseShardUpload">-->

</template>
<script lang="ts" setup>
import {ref, reactive} from 'vue'
import * as FileUtil from '@/utils/FileUtil';
import {download as dddd, saveAs} from '@/utils/MultiThreadDownload';
import * as FileServerApi from "@/api/GoudongFileServerApi";
import {AxiosResponse} from "axios";
import {ShardUploadReactive} from "@/pojo/ShardUploadReactive";
const moment = require('moment');

let checkedFile:File|null = null;

let downloadFileId = ref<bigint>(BigInt(0));
/**
 * 上传
 */
// 声明一个用于接收上传实时信息
let shardUploadReactive = reactive(ShardUploadReactive.getInstance())
const shardUpload = () => {
  if (checkedFile !== null) {
    FileUtil.shardUpload(checkedFile as File, shardUploadReactive)
  }
}

/**
 * 文件change事件
 * @param e
 */
const change = (e:any) => {
  // 返回FileList对象File集合
  checkedFile = e.target.files[0]
  Object.assign(shardUploadReactive, ShardUploadReactive.getInstance())
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
