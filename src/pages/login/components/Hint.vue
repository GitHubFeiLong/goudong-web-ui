<!-- 提示模板 -->
<template>
    <div class="row" id="header-hint" @click="demo">
        <p class="hint">
            <i class='header-i'></i>
            <span v-html="hint"></span>
        </p>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue';

// 引入工具ts
import NotDone from '@/utils/NotDone';
import {currentUserInfoApi} from "@/api/GoudongOauth2ServerApi";
import {clientPublicKeyEncrypt, clientPrivateKeyEncrypt, clientPrivateKeyDecrypt, clientPublicDecrypt
, serverPublicKeyEncrypt, serverPrivateKeyDecrypt
} from "@/utils/RSAUtil";

export default defineComponent({
  props: {
    hint: String,
  },
  setup() {
    const notDone = () => {
      NotDone();
    };
    const demo = () =>{
      // 测试加密
      let encrypt1 = clientPublicKeyEncrypt("hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实");
      // var encrypt1 = clientPublicKeyEncrypt("hello我操你啊实打实的我去恶趣味");
      console.log("公钥加密后数据 = ", encrypt1)
      let encrypt2 = clientPrivateKeyDecrypt(encrypt1);
      console.log("私钥解密后数据 = ", encrypt2)
      console.log("===============");
      let encrypt3 = clientPrivateKeyEncrypt(encrypt2);
      console.log("私钥加密后数据 = ", encrypt3)
      let encrypt4 = clientPublicDecrypt(encrypt3);
      console.log("公钥解密后数据 = ", encrypt4)

      console.log("======后端示例=======");
      let encrypt5 = serverPublicKeyEncrypt(encrypt4);
      console.log("服务端公钥加密后数据 = ", encrypt5)
      let encrypt6 = serverPrivateKeyDecrypt(encrypt5)
      console.log("服务端私钥解密后数据 = ", encrypt6)
      // for (let i = 0; i < 1; i++) {
      //   setTimeout(()=>{
      //     currentUserInfoApi(i).then((response) => {
      //     })
      //   }, i*100)
      // }
    }
    return {
      notDone,
      demo,
    };
  },

});
</script>

<!--<style>
    a{
        color:#333 !important;
    }
</style>-->
<style lang="less" scoped>
@font-color:#999;
#header-hint{
    width:100%;
    height:38.9px;
    font-size: 12px;
    font-family: Arial, Verdana, 宋体;
    background-color: rgb(255, 248, 240);
    color: @font-color;
    display: flex;
        .hint{
            margin: 0 auto;
            line-height: 40px;
            display: flex;
            .header-i{
                width: 16px;
                height: 16px;
                position: relative;
                margin: 12px 6px 0px 0px;
                background-image: url("~@/assets/imgs/icon-tips.png");
            }
        }
}
</style>
