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
import {defineComponent} from 'vue';

// 引入工具ts
import NotDone from '@/utils/NotDone';

import * as UserAPI from '@/api/GoudongUserServerApi'
import CustomAxiosRequestConfig from "@/pojo/CustomAxiosRequestConfig";
import {ResponseOther} from "@/pojo/ResponseOther";
import {RequestOther} from "@/pojo/RequestOther";

export default defineComponent({
  props: {
    hint: String,
  },
  setup() {
    const notDone = () => {
      NotDone();
    };
    const demo = () =>{
      let data: { serialVersionUID: number; password: string; accountRadio: string; code: string; phone: string; loginName: string; nickname: string; qqOpenId: string; remark: string; userType: string; email: string; username: string };
      data = {
        "serialVersionUID": 1,
        "username": "demoData",
        "password": "demoData",
        "email": "demoData",
        "phone": "demoData",
        "nickname": "demoData",
        "remark": "demoData",
        "qqOpenId": "demoData",
        "accountRadio": "demoData",
        "loginName": "demoData",
        "userType": "demoData",
        "code": "demoData"
      };
      let customAxiosRequestConfig = CustomAxiosRequestConfig
        .build()
        .req(RequestOther.builder().needAesEncrypt(true).build())
        .res(ResponseOther.builder().needAesDecrypt(true).build(),
      );

      UserAPI.demoSecrypt(data, customAxiosRequestConfig).then((response)=>{
        console.log("response", response.data);
      });
    };
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
