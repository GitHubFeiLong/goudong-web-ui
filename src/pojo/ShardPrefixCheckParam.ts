/**
 * 分片上传前进行预检
 */
export class ShardPrefixCheckParam {
  /**
   * 文件MD5
   */
  fileMd5:string|null = null;

  /**
   * 原文件类型
   */
  fileType:string|null = null;

  /**
   * 原文件大小
   */
  fileSize:number|null = null;

  /**
   * 分块大小
   */
  blockSize:number|null = null;

  /**
   * 总分片数量
   */
  shardTotal:number|null = null;
  /**
   * 源文件最后修改时间
   */
  lastModifiedTime:Date|null = null;

}
