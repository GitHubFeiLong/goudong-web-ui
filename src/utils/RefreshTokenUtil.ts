import Token from "@/pojo/Token";
import LocalStorageUtil from "@/utils/LocalStorageUtil";
import {DISPOSE_401_STATUS, TOKEN_LOCAL_STORAGE, USER_LOCAL_STORAGE} from "@/pojo/ProjectConst";
import {Dispose401StatusEnum} from "@/enumerate/Dispose401StatusEnum";
import {refreshTokenApi} from "@/api/GoudongOauth2ServerApi";
import * as HintEntity from "@/pojo/HintEntity";
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
