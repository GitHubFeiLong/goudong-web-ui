// 配置API的接口路径('$'参数)
const URL_PARAM = '$';
// 发送邮箱验证码
const apiUserRegistSendEmail = `/api/user/registSendEmail?email=${URL_PARAM}`;
// 注册用户
const apiUserRegistUser = `/api/user/user?registUsername=${URL_PARAM}&registPassword=${URL_PARAM}&registPin=${URL_PARAM}`;
// 登录接口
const apiUserLogin = `/api/user/login?loginUsername=${URL_PARAM}&loginPassword=${URL_PARAM}&rememberPassword=${URL_PARAM}`;
// 验证token接口
const apiUserCheckToken = `/api/user/checkToken`;
// 自动登录接口
const apiUserAutoLogin = `/api/user/autoLogin`;

//
// 查询index页面上的地区
const apiIndexProvinces = `/api/index/provinces`;
// 查询登录人信息
const apiIndexLoginInfo = `/api/index/loginInfo`;
// 获取网站导航的菜单列表
const apiIndexWebNavMenus = `/api/index/webNavMenus`;
// 获取商品菜单相关信息
const apiIndexCommodityTypes = `/api/index/commodityTypes`;
// 获取全天秒杀时间段信息
const apiIndexSpikes = `/api/index/spikes`;

/**
 * 将api接口的raw路径进行转换成最后能访问的ripe路径
 * @param rawUrl    转换前的地址
 * @param params    转换地址需要的参数数组
 */
function convertParamsUrlRipe(rawUrl, params){
    var ripeUrl = rawUrl;
    for (let i = 0; i < params.length; i++) {
        ripeUrl = ripeUrl.replace(URL_PARAM, params[i]);
    }
    return ripeUrl;
}

/**
 * 将api接口的raw路径进行转换成最后能访问的ripe路径
 * @param rawUrl    转换前的地址
 * @param params    转换地址需要的参数数组
 */
function convertParamUrlRipe(rawUrl, param){
    return rawUrl.replace(URL_PARAM, param);
}
