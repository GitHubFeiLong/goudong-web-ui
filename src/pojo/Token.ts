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

  /**
   * 转换成该对象
   * @param token
   */
  static toToken(token:Token):Token {
    if (token) {
      return new Token(token.accessToken, token.refreshToken, token.accessExpires, token.refreshExpires);
    }
    return token;
  }

  constructor(accessToken: string, refreshToken: string, accessExpires: Date, refreshExpires: Date) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.accessExpires = accessExpires;
    this.refreshExpires = refreshExpires;
  }

  /**
   * 判断访问令牌是否过期
   * @return boolean 过期返回true,未过期返回false
   */
  isAccessExpires():Boolean {
    // 当前时间大于访问令牌过期时间
    if (new Date().getTime() > new Date(this.accessExpires).getTime()) {
      return true;
    }
    return false;
  }

  /**
   * 判断刷新令牌是否过期
   * @return boolean 过期返回true,未过期返回false
   */
  isRefreshExpires():Boolean {
    // 当前时间大于访问令牌过期时间
    if (new Date().getTime() > new Date(this.refreshExpires).getTime()) {
      return true;
    }
    return false;
  }

}
