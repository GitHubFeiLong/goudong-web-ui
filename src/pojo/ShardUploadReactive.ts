/**
 * 文件分片上传时实时更新的属性
 */
import {UploadStatusEnum} from "@/enum/UploadStatusEnum";
import {ShardPrefixCheckParam} from "@/pojo/ShardPrefixCheckParam";

export class ShardUploadReactive {
  /**
   * 开始上传的时间
   */
  startTime:number|null = null;

  /**
   * 结束上传的时间
   */
  endTime:number|null = null;
  /**
   * 百分比
   */
  percentage:number = 0
  /**
   * 失败信息
   */
  errorMessage:string|null = null

  /**
   * 上传总用时（去掉暂停的时间）
   */
  totalTime:number = 0;

  /**
   * 状态
   * 0 初始状态
   * 1 上传中
   * 2 暂停
   * @see UploadStatusEnum
   */
  status:number = UploadStatusEnum.INIT;

  /**
   * 点击暂停时的时间
   */
  pauseStartTime:number|null = null;

  /**
   * 暂停结束时间
   */
  pauseEndTime:number|null = null;
  /**
   * 暂停总时长
   */
  pauseTotalTime:number = 0;

  /**
   * 文件上传前检查接口的参数对象
   */
  shardPrefixCheckParam:ShardPrefixCheckParam = new ShardPrefixCheckParam();

  private constructor() {
  }

  static getInstance():ShardUploadReactive{
    return new ShardUploadReactive();
  }
  static init(shardUploadReactive:ShardUploadReactive) {
    shardUploadReactive.startTime = null;
    shardUploadReactive.endTime = null;
    shardUploadReactive.percentage = 0;
    shardUploadReactive.errorMessage = null;
    shardUploadReactive.totalTime = 0;
    shardUploadReactive.status = UploadStatusEnum.INIT;
    shardUploadReactive.pauseStartTime = null;
    shardUploadReactive.pauseEndTime = null;
    shardUploadReactive.pauseTotalTime = 0;
  }

}
