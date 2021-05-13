/**
 * 页面初始化执行的方法
 */
import LocalStorageUtil from "@/utils/LocalStorageUtil";
import AxioxUtil from "@/utils/AxiosUtil";
import * as Oauth2Url from '@/utils/Oauth2Url';

import * as ProjectConst from '@/pojo/ProjectConst';

/**
 * 初始化token
 */
export const initToken = () =>{
  let hasToken:boolean = LocalStorageUtil.has(ProjectConst.AUTHORIZATION);

  // 存在token
  if (hasToken) {
    return false;
  }
  // 不存在，去后台拉
  let tokenUrl = Oauth2Url.token();
  AxioxUtil.get(tokenUrl.url).then(response=>{
    // response 的响应头是小写的
    let token = response.headers[ProjectConst.AUTHORIZATION.toLocaleLowerCase()]
    // 保存到localstorage
    LocalStorageUtil.set(ProjectConst.AUTHORIZATION, token)
  })

}
