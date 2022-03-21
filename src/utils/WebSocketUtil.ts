const gatewayUrl:string = require('@/config/BaseUrl').gatewayUrl

// const wsUrl = `ws:${gatewayUrl.substring(gatewayUrl.indexOf("//"))}api/message/test/oneToMany`
const wsUrl = `ws://localhost:10002/api/message/test/one`
/**
 * 类描述：
 * WebSocket操作工具
 * @author e-Feilong.Chen
 * @date 2022/3/21 15:52
 */
export default class WebSocketUtil {
  /**
   * websocket对象
   */
  static websocket:WebSocket

  /**
   * 初始化socket
   */
  static init() {
    console.log(WebSocketUtil.websocket)
    if (WebSocketUtil.websocket !== undefined) {
      return;
    }
    //判断当前浏览器是否支持WebSocket, 主要此处要更换为自己的地址
    if ('WebSocket' in window) {
      WebSocketUtil.websocket = new WebSocket(wsUrl);
    } else {
      console.error("浏览器不支持websocket")
      alert('Not support websocket');
    }

    //连接发生错误的回调方法
    WebSocketUtil.websocket.onerror = function () {
      console.error("连接发生错误的回调方法")
    };

    //连接成功建立的回调方法
    WebSocketUtil.websocket.onopen = function (event) {
      console.log("连接成功建立的回调方法")
    }

    //接收到消息的回调方法
    WebSocketUtil.websocket.onmessage = function (event) {
      console.log("接收到消息的回调方法", event.data);
    }

    //连接关闭的回调方法
    WebSocketUtil.websocket.onclose = function () {
      console.log("连接关闭的回调方法");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
      WebSocketUtil.websocket.close();
    }

    //关闭连接
    function closeWebSocket() {
      WebSocketUtil.websocket.close();
    }
  }

  /**
   * 发送消息
   * @param message
   */
  static send(message:any) {
    if (WebSocketUtil.websocket !== undefined) {
      WebSocketUtil.websocket.send(message);
    }
  }

  /**
   * 销毁socket
   */
  static destroy() {
    if (WebSocketUtil.websocket !== undefined) {
      WebSocketUtil.websocket.close();
    }
  }

}
