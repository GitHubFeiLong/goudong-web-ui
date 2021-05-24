import BindPageParam from '@/pojo/BindPageParam';
import PageParam from "@/pojo/PageParam";



/**
 * 解析绑定账号页面的参数列表
 */
export default function resolveBindPageParam():BindPageParam {
  const bindPageParam = new BindPageParam();
  generateParam(bindPageParam);
  console.log(bindPageParam);
  return bindPageParam;
}

/**
 * 解析页面参数
 */
export function resolvePageParam(): PageParam {
  const paramObj = new PageParam();
  generateParam(paramObj);
  console.log(paramObj);
  return paramObj;
}

/**
 * 根据路径参数，返回对象键值对
 * @param returnObj
 */
function generateParam(pageParamObj: PageParam | BindPageParam) {
  let {search} = window.location;
  // 解码
  search = decodeURI(search);

  const paramStr = search.substring(1, search.length);
  const paramArr = paramStr.split('&');

  paramArr.forEach((item) => {
    const keyValue = item.split('=');
    const [param, value] = keyValue;

    // @ts-ignore
    pageParamObj[param] = value;
  });
}
