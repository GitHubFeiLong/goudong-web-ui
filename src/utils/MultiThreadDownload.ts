import * as FileServerApi from "@/api/GoudongFileServerApi";
import * as HttpHeaderConst from "@/constant/HttpHeaderConst";
import AxiosUtil from "@/utils/AxiosUtil";

export function concatenate(arrays:Uint8Array[]) {
  if (!arrays.length) return null;
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
  let result = new Uint8Array(totalLength);
  let length = 0;
  for (let array of arrays) {
    result.set(array, length);
    length += array.length;
  }
  return result;
}


/**
 * 获取二进制内容
 * @param url 资源路径
 * @param start 块开始字节下标
 * @param end 块结束字节下标
 * @param i 第几块
 */
export function getBinaryContent(url:string, start:number, end:number, i:number) {
  return new Promise((resolve, reject) => {
    try {
      let config = {
        headers:{ "Range": `bytes=${start}-${end}`}  // 请求头上设置范围请求信息
      }
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("range", `bytes=${start}-${end}`); // 请求头上设置范围请求信息
      xhr.responseType = "arraybuffer"; // 设置返回的类型为arraybuffer
      xhr.onload = function () {
        resolve({
          index: i, // 文件块的索引
          buffer: xhr.response, // 范围请求对应的数据
        });
      };
      xhr.send();
    } catch (err:any) {
      reject(new Error(err));
    }
  });
}

export function saveAs(name:string, buffers:any, mime = "application/octet-stream") {
  const blob = new Blob([buffers], { type: mime });
  const blobUrl = URL.createObjectURL(blob);
  const a:any = document.createElement("a");
  a.download = name || Math.random();
  a.href = blobUrl;
  a.click();
  //@ts-ignore
  URL.revokeObjectURL(blob);
}

export async function asyncPool(poolLimit:number, array:number[], iteratorFn:any){
  const ret = []; // 存储所有的异步任务
  const executing:any = []; // 存储正在执行的异步任务
  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e:any = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(ret);
}

/**
 * 异步多线程分块下载
 * @param url 指定资源路径
 * @param contentLength 下载文件大小，单位字节
 * @param chunkSize 每次下载块的大小
 * @param poolLimit 线程数量
 */
export async function download(url:string, contentLength:number, chunkSize:number, poolLimit:number = 1) {

  // 块的数量
  const chunks = typeof chunkSize === "number" ? Math.ceil(contentLength / chunkSize) : 1;
  console.log(new Array(chunks).keys())

  const results = await asyncPool(
    poolLimit,
    [...new Array(chunks).keys()],
    (i:number) => {
      // 块开始字节下标
      let start = i * chunkSize;
      // 块结束字节下标
      let end = i + 1 == chunks ? contentLength - 1 : (i + 1) * chunkSize - 1;
      return getBinaryContent(url, start, end, i);
    }
  );

  const sortedBuffers = results.map((item) => new Uint8Array(item.buffer));
  return concatenate(sortedBuffers);
}
