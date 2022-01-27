/**
 * 类描述：
 * 令牌对象
 * @author e-Feilong.Chen
 * @date 2022/1/27 9:57
 */
export default class Token {
  /**
   * 访问令牌
   */
  accessToken : string;
  /**
   * 刷新令牌
   */
  refreshToken: string;
  /**
   * 访问令牌失效时间
   */
  accessExpires: Date;
  /**
   * 刷新令牌失效时间
   */
  refreshExpires: Date;

  constructor(accessToken: string, refreshToken: string, accessExpires: Date, refreshExpires: Date) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.accessExpires = accessExpires;
    this.refreshExpires = refreshExpires;
  }
}
