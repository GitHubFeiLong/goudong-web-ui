/**
 * 文件分片上传时实时更新的属性
 */
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
   * 暂停总时常
   */
  pauseTotalSecond:number = 0;

}
