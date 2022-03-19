export enum UploadStatusEnum {
  /**
   * 初始状态
   */
  INIT,
  /**
   * 主备状态
   */
  READYING,
  /**
   * 上传中
   */
  UPLOADING,
  /**
   * 暂停中
   */
  PAUSED,

  /**
   * 完成的
   */
  FINISHED,

  /**
   * 失败的
   */
  FAILED,
}
