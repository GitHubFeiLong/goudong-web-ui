import BindPageParam from "@/pojo/BindPageParam";

/**
 * 解析绑定账号页面的参数列表
 */
export function resolveBindPageParam() {
  let search = window.location.search;
  let paramStr = search.substring(1, search.length);
  let paramArr = paramStr.split("&");

  let bindPageParam = new BindPageParam();
  paramArr.forEach(item=>{
    let keyValue = item.split("=");
    // @ts-ignore
    bindPageParam[keyValue[0]] = keyValue[1];
  })

  console.log(bindPageParam)
  return bindPageParam;
}