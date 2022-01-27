import Token from "@/pojo/Token";
import LocalStorageUtil from "@/utils/LocalStorageUtil";
import {DISPOSE_401_STATUS, TOKEN_LOCAL_STORAGE, USER_LOCAL_STORAGE} from "@/pojo/ProjectConst";
import {Dispose401StatusEnum} from "@/enumerate/Dispose401StatusEnum";
import {refreshTokenApi} from "@/api/GoudongOauth2ServerApi";
import * as HintEntity from "@/pojo/HintEntity";

/**
 * 同步执行刷新令牌操作
 */
function refreshToken(): Promise<String> {
  return new Promise(((resolve, reject) => {
    let token: Token = LocalStorageUtil.get(TOKEN_LOCAL_STORAGE);
    // 没有token不处理
    if (token == null) {
      console.log("token为空，不做处理")
      // 清除 token
      LocalStorageUtil.remove(TOKEN_LOCAL_STORAGE);
      // 清除 用户信息
      LocalStorageUtil.remove(USER_LOCAL_STORAGE);
      // 将状态值恢复默认
      LocalStorageUtil.set(DISPOSE_401_STATUS, Dispose401StatusEnum.NOT_DONE);
      resolve("没有token，不处理，成功")
    }

    let dispose401Status = LocalStorageUtil.get(DISPOSE_401_STATUS);
    // 判断是否有做刷新令牌的请求
    switch (dispose401Status) {
      case Dispose401StatusEnum.BE_DOING:
        console.log("已经有请求处理")
        resolve("已经有请求处理，不处理，成功");
        return;
      case Dispose401StatusEnum.FINISHED:
        console.log("处理完成");
        resolve("已经有请求处理完成，不处理，成功");
        return;
      case Dispose401StatusEnum.NOT_DONE:
      default:
        console.log("开始处理刷新令牌")
        /*
          1. 判断访问令牌是否过期
          2. 访问令牌未过期：直接使用访问令牌进行访问
          3. 访问令牌已过期：则判断刷新令牌是否过期
          4. 刷新令牌未过期：使用刷新令牌获取新的令牌
          5. 刷新令牌已过期：跳转登录，用户重新认证
        */
        if (new Date().getTime() <= new Date(token.refreshExpires).getTime()) {
          console.log("开始执行刷新令牌")
          refreshTokenApi(token.refreshToken).then((response)=>{
            console.log("刷新令牌response", response)
            // 这个是才后端反的data一层数据
            let result = response.data.data;
            // 生成token对象
            const token = new Token(result.accessToken, result.refreshToken,result.accessExpires, result.refreshExpires);
            // 设置token对象
            LocalStorageUtil.set(TOKEN_LOCAL_STORAGE, token);
            // 设置状态成完成
            LocalStorageUtil.set(DISPOSE_401_STATUS, Dispose401StatusEnum.FINISHED);
          })

        }
        break;
    }
  }));
}

export {refreshToken}
