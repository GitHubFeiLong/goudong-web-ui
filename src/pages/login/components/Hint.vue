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
import {pubKeyEncrypt, pubKeyDecrypt} from "@/utils/RSAUtil";

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
      // var encrypt1 = pubKeyEncrypt("hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实hello我哦阿松大送到收到送到收到送哦啊实打实");
      var encrypt1 = pubKeyEncrypt("hello我操你啊实打实的我去恶趣味");
      console.log("加密后数据 = ", encrypt1)
      var encrypt2 = pubKeyDecrypt("kJjz9XUo6AulEXaYcYi+8JL5UazWevtxqkYxt2/3gIy/MAA3Eh03hUVWWGd0VwX+z5ITWjleyK6AYg+vnCESFV5WxKldQ0MinHOqrUXNl2a9zy4ypwozFDfVXCyV2rahIimDduO7ZcVDGmISLMgjAOwLYhBZuicOzEHbYR2nX7k=");
      // console.log("解密后数据 = ", encrypt2)



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
