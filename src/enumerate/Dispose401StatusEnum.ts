/**
 * 枚举描述：
 * 在localStorage中保存变量dispose_401_status的值状态
 * 不同的状态进行不同的处理
 * @author e-Feilong.Chen
 * @date 2022/1/27 11:14
 */
export enum Dispose401StatusEnum {
  /**
   * 未处理
   */
  NOT_DONE,
  /**
   * 正在处理
   */
  BE_DOING,
  /**
   * 已经处理完成
   */
  FINISHED
}
