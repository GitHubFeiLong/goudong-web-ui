import Token from "@/pojo/Token";
import {refreshTokenApi} from "@/api/GoudongOauth2ServerApi";
import {AxiosResponse} from "axios";

/**
 * 同步执行刷新令牌操作
 */
function refreshToken(token: Token): Promise<AxiosResponse> {
  return new Promise(((resolve, reject) => {
    console.log("开始执行刷新令牌")
    refreshTokenApi(token.refreshToken).then((response)=>{
      console.log("刷新令牌response", response)
      // 返回正确
      resolve(response);
    }, (response) => {
      // 执行错误
      console.error("刷新令牌错误", response)
    })
  }));
}

export {refreshToken}
