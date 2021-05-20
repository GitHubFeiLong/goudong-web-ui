import BindPageParam from '@/pojo/BindPageParam';

/**
 * 解析绑定账号页面的参数列表
 */
export default function resolveBindPageParam() {
  const { search } = window.location;
  const paramStr = search.substring(1, search.length);
  const paramArr = paramStr.split('&');

  const bindPageParam = new BindPageParam();
  paramArr.forEach((item) => {
    const keyValue = item.split('=');
    const [param, value] = keyValue;

    // @ts-ignore
    bindPageParam[param] = value;
  });

  console.log(bindPageParam);
  return bindPageParam;
}
