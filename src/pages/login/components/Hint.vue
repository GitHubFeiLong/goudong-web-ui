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
// import {
//   uiPublicKeyEncrypt, uiPrivateKeyEncrypt, uiPrivateKeyDecrypt, uiPublicDecrypt
//   , serverPublicKeyEncrypt, serverPrivateKeyDecrypt, serverPrivateKeyEncrypt, serverPublicKeyDecrypt
// } from "@/utils/RSAUtil";

import {
  serverPublicKeyEncrypt, serverPrivateKeyDecrypt, serverPrivateKeyEncrypt, serverPublicKeyDecrypt
} from "@/utils/Demo";
export default defineComponent({
  props: {
    hint: String,
  },
  setup() {
    const notDone = () => {
      NotDone();
    };
    const demo = () =>{
      // console.log("前端RSA示例=========")
      // // 测试加密
      // let str = "hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实";
      let str = "hello world";
      // let encrypt1 = uiPublicKeyEncrypt(str);
      // // var encrypt1 = uiPublicKeyEncrypt("hello我操你啊实打实的我去恶趣味");
      // console.log("公钥加密后数据 = ", encrypt1)
      // let encrypt2 = uiPrivateKeyDecrypt(encrypt1);
      // console.log("私钥解密后数据 = ", encrypt2)
      // let encrypt3 = uiPrivateKeyEncrypt(encrypt2);
      // console.log("私钥加密后数据 = ", encrypt3)
      // let encrypt4 = uiPublicDecrypt(encrypt3);
      // console.log("公钥解密后数据 = ", encrypt4)
      //
      console.log("后端RSA示例=========")
      // let encrypt5 = serverPublicKeyEncrypt(str);
      // console.log("服务端公钥加密后数据 = ", encrypt5)
      // let encrypt6 = serverPrivateKeyDecrypt(encrypt5)
      // console.log("服务端私钥解密后数据 = ", encrypt6)
      let encrypt7 = serverPrivateKeyEncrypt("hello world")
      console.log("服务端私钥加密后数据 = ", encrypt7)
      let encrypt8 = serverPublicKeyDecrypt(encrypt7)
      console.log("服务端公钥解密后数据 = ", encrypt8)
      // let d = serverPublicKeyDecrypt("kJjz9XUo6AulEXaYcYi+8JL5UazWevtxqkYxt2/3gIy/MAA3Eh03hUVWWGd0VwX+z5ITWjleyK6AYg+vnCESFV5WxKldQ0MinHOqrUXNl2a9zy4ypwozFDfVXCyV2rahIimDduO7ZcVDGmISLMgjAOwLYhBZuicOzEHbYR2nX7k=");
      // console.log('公钥解密', d)
      //
      // console.log("=====")
      // let a1 = serverPublicKeyDecrypt("DvIi1muxsiCAQwQngV2f+7L9yelvsNKxWf6EU0RKTgfPZefudWjeEgcAjOG+UAcdPdMQxMe3Bei16qTktsnQiaGBlKOVFIZoL4fZngNkeMWJXcYVao2UTptvqIOmvk2o/m+gPS+aK6cRS8xQeUr0Ab/nzY5Zszv3FThdZqloZqSdjYBw05PuiIWWkxE0BOhyPYzAgZGcFLT8HXogZXk+iaMdqRzQfCfX9/vb4vUcQDQJAvtvKtX9CIkyy1MjtTc9FSV0w0tvDXU7q7+lMFmWMBO6S8fkAdUoIz4MpeFCJ2e3R0UY38ok9TH603J3j3gspllXcKXe1lkajjTqF+fQsmchqI6Kwzs2zlgVWWs1ISkUjW610xVfNyDvUbKAX6l10aaZfkVAz2yVYk26ntASS02+YOFrZyvJPIvEqAbD4fQOGg0pCvlJHkE1TUyrHLxFx6tD4UvO2SbCRdRq+uAlZ0NaoRPqLNDsNzWBVNzPr+RH6y+PF0S/syuW7zKh0FaxB1S1EH14MkZHwu68WCOAnArV8BcCLrQf4WMC/I7Dkb9Ax4Xi8IZ/f9ESAnk0txCh9wuPaZ6sxx2rG/kusZAwH1K0RPqWkkO2Hbt1joHKPYYUtilXPil+NYg5fpCzsrJWQR3DCFE7r++eHQE5Vb4l9K2GThIqZq0KPpVCh9JUpblo39NY4l07A5AU2coLKg7NjtnQJwBz7Cov4lrHa0bFH7V402myeDqM8hyLtBtGrrtTXm2L1sEwyY9jOye5y9Sgf98vhhXZFKmSf85Kb7KZovCKNI1LsjPhyub9T4Pwkn4y3Pmxb8s19M2DOW6z31Y2GYFG1BKD+PSX8ZrCCil2ckAG9FjHmDUGRTckRc0LoMQnfPgsUBaY+j6kcvWJOFrnbMh5N9fZ4rSIIsRJDstMQVIVLji3dP5mCMT4Pdrj0U2BsgFLAZSBF0fvSs81cnSGAsonqJQJ32lFGU0xPKfCc3U/vAtflAYM0qwn2oZAcorTTDu3QCn1Io4cmiBJPaWi");
      // console.log(a1);
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
