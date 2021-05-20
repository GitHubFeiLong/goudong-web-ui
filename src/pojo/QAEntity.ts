export default class QAEntity {
  /**
   * question 问题
   */
  q: string;

  /**
   * answer 答案
   */
  a: string

  constructor(q: string, a: string) {
    this.q = q;
    this.a = a;
  }
}
