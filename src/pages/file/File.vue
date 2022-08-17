<template>
  <div class="outer-div">
    <div class="upload">
      <input id="file" type="file" @change="change" class="check-file">
      <el-button type="primary" @click="shardUpload">上传</el-button>
      <el-button v-show="shardUploadReactive.status === UploadStatusEnum.PAUSED"  type="primary" @click="keepUpShardUpload">继续</el-button>
      <el-button v-show="shardUploadReactive.status === UploadStatusEnum.UPLOADING"  type="primary" @click="pauseShardUpload">暂停</el-button>
      <div class="demo-progress">
        <el-progress :percentage="shardUploadReactive.percentage"
                     :indeterminate="shardUploadReactive.status === UploadStatusEnum.READYING"
                     :status="shardUploadReactive.status === UploadStatusEnum.FINISHED ? 'success' : (shardUploadReactive.status === UploadStatusEnum.FAILED ? 'exception' : '')"
        />
      </div>

    </div>
    <div class="download">
      <el-input class="file-id"
                v-model="downloadFileId"
                placeholder="文件id"
                size="default"
                clearable />
      <el-button type="primary" @click="download" class="btn">下载</el-button>
    </div>
  </div>


</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import * as FileUtil from '@/utils/FileUtil';
import {download as dddd, saveAs} from '@/utils/MultiThreadDownload';
import * as FileServerApi from '@/api/GoudongFileServerApi';
import {AxiosResponse} from 'axios';
import {ShardUploadReactive} from '@/pojo/ShardUploadReactive';
import {UploadStatusEnum} from '@/enum/UploadStatusEnum';
import {ElMessage} from 'element-plus';

const moment = require('moment');

let checkedFile = ref();
// 声明一个用于接收上传实时信息
let shardUploadReactive: ShardUploadReactive = reactive(ShardUploadReactive.getInstance());
let downloadFileId = ref<bigint>(BigInt(0));

/**
 * 文件change事件
 * @param e
 */
const change = (e: any) => {
  // 返回FileList对象File集合
  checkedFile.value = e.target.files[0];
  Object.assign(shardUploadReactive, ShardUploadReactive.getInstance());
};

/**
 * 上传
 */
const shardUpload = () => {
  if (checkedFile.value !== null) {
    shardUploadReactive.startTime = new Date().getTime();
    shardUploadReactive.status = UploadStatusEnum.READYING;
    FileUtil.shardUpload(checkedFile.value as File, shardUploadReactive);
  }
};

/**
 * 暂停上传
 */
const pauseShardUpload = () => {
  if (shardUploadReactive.status === UploadStatusEnum.UPLOADING) {
    shardUploadReactive.status = UploadStatusEnum.PAUSED;
    shardUploadReactive.pauseStartTime = new Date().getTime();
    return;
  }
  ElMessage.error('上传文件的状态错误');
  console.error('文件状态错误，此时应该是上传中状态才能调用暂停上传');
};
/**
 * 继续上传
 */
const keepUpShardUpload = () => {
  if (shardUploadReactive.status === UploadStatusEnum.PAUSED) {
    shardUploadReactive.status = UploadStatusEnum.READYING;
    // 暂停总时长
    shardUploadReactive.pauseTotalTime += new Date().getTime() - shardUploadReactive.pauseStartTime;

    // 暂停开始时间和结束时间进行初始
    shardUploadReactive.pauseStartTime = 0;

    FileUtil.shardUpload(checkedFile.value as File, shardUploadReactive);
    return;
  }
  ElMessage.error('上传文件的状态错误');
  console.error('文件状态错误，此时应该是暂停状态才能调用继续上传');
};

async function multiThreadedDownload(fileId: bigint) {
  // 1. 获取文件基本信息
  // let fileId:bigint = BigInt(1503339420588314624);
  let response: AxiosResponse = await FileServerApi.fileLink(fileId, 0);
  let file = response.data.data;
  const url = `http://localhost:9998/api/file/download-group/download?fileId=${fileId}`;
  if (!url || !/https?/.test(url)) return;
  dddd(url, file.size, 1024 * 1024).then((buffers) => {
    console.log(`多线程下载结束: ${+new Date()}`);
    saveAs(file.originalFilename, buffers, file.mimeType);
  });
}

const download = () => {
  multiThreadedDownload(downloadFileId.value);
};

</script>

<style lang='less' scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.outer-div{
  width: 500px;
  height: 700px;
  margin-left: 25%;
  margin-top: 40px;
  .upload{
    .check-file{
      margin-right: 20px;
    }
  }
  .download{
    margin-top: 50px;
    .file-id{
      width: 200px;
    }
    .btn{
      margin-left: 10px;
    }
  }
}
</style>
