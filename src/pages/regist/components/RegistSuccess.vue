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
import AuthorityUser from '@/pojo/AuthorityUser';
import { loginApi } from '@/api/GoudongOauth2ServerApi';
import Result from '@/pojo/Result';

export default defineComponent({
  props: {
    username: String,
  },
  setup() {
    const goShopping = () => {
      window.location.href = '/index';
    };
    onMounted(() => {
      // 进行登录
      const { user } = RegisterStore.state;
      const username: string = (user as AuthorityUser).username as string;
      const password: string = (user as AuthorityUser).password as string;
      // 登录
      loginApi(username, password).then((response) => {
        const result: Result<AuthorityUser> = response.data;

        if (result.code === '1') {
          window.location.href = '/index.html';
        }

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
