<template>
  <input id="text" type="text" v-model="message.msg"/>
  <button @click="message.send">Send</button>
  <button @click="message.close">Close</button>
  <div id="message"></div>
</template>
<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, reactive} from "vue";
// 按需导入 io 方法：调用 io('url') 方法，即可创建 websocket 连接的实例
import { io } from 'socket.io-client'
import WebSocketUtil from '@/utils/WebSocketUtil';
export default defineComponent({

  setup: function () {
    onMounted(()=>{
      console.log(11)
      WebSocketUtil.init();
    })

    onBeforeUnmount(()=>{
      WebSocketUtil.destroy();
    })
    let message = reactive({
      msg:'',
      send:()=>{
        WebSocketUtil.send(message.msg);
        message.msg = '';
      },
      close:()=>{
        WebSocketUtil.destroy();
      }

    })
    return {
      message
    }
  }
})



</script>

<style scoped>

</style>
