<template>
  <div id="regist-success">
    <div class="img">
      <span class="iconfont icon-shizhong"></span>
    </div>
    <div class="txt">
      <span class="span1">恭喜您 {{username}}</span>
      <br>
      <span class="span2">您已成功注册为狗东用户，祝您购物愉快~</span>
    </div>
    <div @click="goShopping" id="btn">去购物</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue';

import RegisterStore from '@/store/RegisterStore';
import User from '@/pojo/User';
import { loginApi } from '@/api/GoudongOauth2ServerApi';
import Result from '@/pojo/Result';
import LocalStorageUtil from "@/utils/LocalStorageUtil";
import {TOKEN_LOCAL_STORAGE, USER_LOCAL_STORAGE} from "@/constant/LocalStorageConst";
import Token from "@/pojo/Token";
import {INDEX_PAGE} from "@/constant/PageUriConst";

export default defineComponent({
  props: {
    username: String,
  },
  setup() {
    const goShopping = () => {
      window.location.href = INDEX_PAGE;
    };
    onMounted(() => {
      // 进行登录
      const { user } = RegisterStore.state;
      const username: string = (user as User).username as string;
      const password: string = (user as User).password as string;
      // 登录
      loginApi(username, password).then((response) => {
        // 这个是才后端反的data一层数据
        let result = response.data.data;
        // 用户信息
        const user: Result<User> = result.user;
        // 设置用户信息
        LocalStorageUtil.set(USER_LOCAL_STORAGE, user);
        // 生成token对象
        const token = new Token(result.accessToken, result.refreshToken,result.accessExpires, result.refreshExpires);
        // 设置token对象
        LocalStorageUtil.set(TOKEN_LOCAL_STORAGE, token);

        setTimeout(goShopping, 3000);
      });
    });

    return {
      goShopping,
    };
  },
});
</script>

<style lang='less' scoped>
  /*@import url('~@/assets/fonts/iconfont.css');*/

  #regist-success {
    width: @regist-inner-main-width;
    height: 230px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 243px;
    .img {
      width: 60px;
      height: 60px;
      color: #33bb44 !important;

      span {
        font-size: 60px;
      }
    }

    .txt {
      margin-top: 20px;

      .span1 {
        font-size: 20px;
      }

      .span2 {
        font-size: 14px;
        color: #999;
        display: block;
        margin-top: 10px;
      }
    }

    #btn {
      width: 100px;
      height: 50px;
      color: #fff;
      background-color: #ee2223;
      line-height: 50px;
      font-weight: bold;
      margin-top: 35px;
      cursor: pointer;
    }
  }
</style>
