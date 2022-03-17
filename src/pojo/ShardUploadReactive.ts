/**
 * 文件分片上传时实时更新的属性
 */
import {reactive} from "vue";

export class ShardUploadReactive {
  /**
   * 开始上传的时间
   */
  startTime:Date = new Date();

  /**
   * 结束上传的时间
   */
  endTime:Date|null = null;
  /**
   * 百分比
   */
  percentage:number = 0
  /**
   * 是否上传完成
   */
  entiretySuccessful:boolean = false;

  /**
   * 是否上传失败
   */
  unsuccessful:boolean = false;

  /**
   * 失败信息
   */
  errorMessage:string|null = null

  /**
   * 上传总用时（去掉暂停的时间）
   */
  totalSecond:number = 0;

  /**
   * 是否是暂停的
   */
  pause:boolean = false;

  /**
   * 点击暂停时的时间
   */
  pauseStartTime:Date|null = null;

  /**
   * 暂停结束时间
   */
  pauseEndTime:Date|null = null;
  /**
   * 暂停总时长
   */
  pauseTotalSecond:number = 0;

  private constructor() {
  }

  static getInstance():ShardUploadReactive{
    return new ShardUploadReactive();
  }
  static init(shardUploadReactive:any) {
    shardUploadReactive.startTime = new Date();
    shardUploadReactive.endTime = null;
    shardUploadReactive.percentage = 0;
    shardUploadReactive.entiretySuccessful = false;
    shardUploadReactive.unsuccessful = false;
    shardUploadReactive.errorMessage = null;
    shardUploadReactive.totalSecond = 0;
    shardUploadReactive.pause = false;
    shardUploadReactive.pauseStartTime = null;
    shardUploadReactive.pauseEndTime = null;
    shardUploadReactive.pauseTotalSecond = 0;
  }
}
