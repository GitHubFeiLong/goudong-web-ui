<template>
  <input type="file" @change="getFile" multiple >
  <input type="button" value="上传" @click="shardUpload">
  <input type="button" value="下载" @click="shardUpload">

  <div class="demo-progress">
    <el-progress :percentage="percentage" />
    <el-progress :percentage="100" :format="format" />
    <el-progress :percentage="100" status="success" />
    <el-progress :percentage="100" status="warning" />
    <el-progress :percentage="50" status="exception" />
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import * as FileUtil from '@/utils/FileUtil';

const moment = require('moment');
let myFiles = ref<FileList>();

let config = {
  headers: { "Content-Type": "multipart/form-data"}
};
/**
 * 上传
 */
let percentage = new ref<number>();
percentage.value = 0
const shardUpload = () => {
  let files : FileList | undefined = myFiles.value;

  if (files != undefined) {
    FileUtil.shardUpload(files, 1024*1024*5, percentage)
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




const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
