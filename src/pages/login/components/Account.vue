/* 用户名密码登录 */
<template>
  <div id="account">
    <div id="hint-div" v-show="!hint.isHide">
      <b class="hint-icon"></b>
      <span class="hint-info">{{ hint.info }}</span>
    </div>
    <div id="username-div">
      <label class="label-username" for="username"></label>
      <input @blur="usernameBlur" @focus="usernameFocus($event)" id="username" maxlength="20"
             name="username" placeholder="邮箱/用户名/登录手机" type="text" v-model='username'>
      <span @click='cleanUsername' v-show='username.length>0'></span>
    </div>
    <div id="password-div">
      <label for="password"></label>
      <input @blur="passwordBlur($event)" @focus="passwordFocus($event)" id="password"
             maxlength="20" name="password" placeholder="密码" type="password" v-model='password'>
      <span @click='cleanPassword' v-show='password.length>0'></span>
    </div>
    <a @click.prevent="forgetPassword" class="forget-password" href="">忘记密码</a>
    <MiniPuzzleVerify
      v-if="puzzle.showPuzzle"
      @successPuzzle="successPuzzle"
      @closePuzzle="closePuzzle"/>
    <div id="login-btn">
      <a @click.prevent="login" href="">{{btnValue}}</a>
    </div>
  </div>
  <QuickLogin/>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive } from 'vue';
import MiniPuzzleVerify from '@/components/MiniPuzzleVerify.vue';

// 引入工具ts
import * as HintEntity from '@/pojo/HintEntity';
import Result from '@/pojo/Result';
import User from '@/pojo/User';
// import { loginApi } from '@/api/Oauth2Api';
import {loginApi} from '@/api/GoudongOauth2ServerApi';
import QuickLogin from './QuickLogin.vue';
import {INDEX_PAGE} from "@/constants/PageUriConst";
import LocalStorageUtil from "@/utils/LocalStorageUtil";
import {TOKEN_LOCAL_STORAGE, USER_LOCAL_STORAGE} from "@/pojo/ProjectConst";
import Token from "@/pojo/Token";
// 申明jquery
declare let $: (selector: string) => any;

export default defineComponent({
  components: {
    MiniPuzzleVerify,
    QuickLogin,
  },
  setup() {
    const puzzle = reactive({
      showPuzzle: false,
      puzzleSure: false,
    });
    const hint = ref(HintEntity.BLANK);
    const username = ref('');
    const password = ref('');
    const btnValue = ref('登    录');
    // 清除用户名
    function cleanUsername() {
      username.value = '';
    }

    // 清除密码
    function cleanPassword() {
      password.value = '';
    }

    // 用户名输入框得到焦点
    function usernameFocus(e: any) {
      // e.target 是你当前点击的元素
      // e.currentTarget 是你绑定事件的元素

      // 获得点击元素的前一个元素
      // e.currentTarget.previousElementSibling.innerHTML

      // 获得点击元素的第一个子元素
      // e.currentTarget.firstElementChild

      // 获得点击元素的下一个元素
      // e.currentTarget.nextElementSibling

      // 获得点击元素中id为string的元素
      // e.currentTarget.getElementById("string")

      // 获得点击元素的string属性
      // e.currentTarget.getAttributeNode('string')

      // 获得点击元素的父级元素
      // e.currentTarget.parentElement

      // 获得点击元素的前一个元素的第一个子元素的HTML值
      // e.currentTarget.previousElementSibling.firstElementChild.innerHTML
      $(e.currentTarget.previousElementSibling).css('background-position', '0px -48px');
      console.log();
    }

    // 用户名输入框失去焦点事件
    function usernameBlur(e: any) {
      $(e.currentTarget.previousElementSibling).css('background-position', '0px 0px');
    }

    // 密码框得到焦点
    function passwordFocus(e: any) {
      $(e.currentTarget.previousElementSibling).css('background-position', '-48px -48px');
    }

    // 密码框失去焦点
    function passwordBlur(e: any) {
      $(e.currentTarget.previousElementSibling).css('background-position', '-48px 0px');
    }

    // 登录
    function login() {
      if (puzzle.showPuzzle) {
        return;
      }
      if (username.value === '' && password.value === '') {
        hint.value = HintEntity.USERNAME_PASSWORD_HINT_0;
        return;
      }
      if (username.value === '') {
        hint.value = HintEntity.USERNAME_PASSWORD_HINT_1;
      } else if (password.value === '') {
        hint.value = HintEntity.USERNAME_PASSWORD_HINT_2;
      } else {
        hint.value = HintEntity.BLANK;
        // 滑块验证
        puzzle.showPuzzle = true;
      }
    }

    // 滑块成功
    const successPuzzle = () => {
      puzzle.showPuzzle = false;
      puzzle.puzzleSure = true;
      let LoginBtnValue1 = "登    录";
      let LoginBtnValue2 = "正在登录...";
      btnValue.value = LoginBtnValue2;
      // 请求登录接口
      loginApi(username.value, password.value).then((response) => {
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
        // 修改按钮文字
        btnValue.value = LoginBtnValue1;
        // 跳转登录
        // window.location.href = INDEX_PAGE;
      }, (response)=>{
        hint.value = HintEntity.USERNAME_PASSWORD_HINT_3;
        btnValue.value = LoginBtnValue1;
        console.log(response);
      });
    };
    // 关闭滑块
    const closePuzzle = () => {
      puzzle.showPuzzle = false;
      puzzle.puzzleSure = false;
    };

    // 忘记密码
    function forgetPassword() {
      window.location.href = '/forgotPwd.html';
    }

    return {
      hint,
      username,
      password,
      cleanUsername,
      cleanPassword,
      usernameFocus,
      usernameBlur,
      passwordFocus,
      passwordBlur,
      login,
      forgetPassword,
      successPuzzle,
      closePuzzle,
      puzzle,
      btnValue,
    };
  },

});
</script>

<style lang="less">
  #puzzle-warp{
    margin-left: 21px;
    margin-top:-42px;
  }
</style>
<style lang='less' scoped>
  /* 密码框去掉可见样式（眼睛） */
  input[type="password"]::-ms-reveal {
    display: none;
  }

  /*
      输入框：用户名和密码的公共样式
      @margin-top 向上偏移量
  */
  .username-password(@margin-top) {
    position: absolute;
    width: 306px;
    height: 39px;
    margin: @margin-top auto;
    left: 0;
    right: 0;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    label {
      width: 39px;
      height: 100%;
      position: absolute;
      z-index: 10;
      border-right: 1px solid #bdbdbd;
      box-sizing: border-box;
      background-image: url('~@/assets/imgs/pwd-icons-new.png');
    }
    input {
      width: 100%;
      height: 100%;
      padding: 10px 0 10px 50px;
      box-sizing: border-box;
      border: 0;
      position: absolute;
    }
    span {
      width: 14px;
      height: 14px;
      margin: auto;
      right: 5px;
      top: 0;
      bottom: 0;
      position: absolute;
      background-image: url('~@/assets/imgs/pwd-icons-new.png');
      background-position: -26px 30px;

      &:hover {
        cursor: pointer;
        background-position: -51px 30px;
      }
    }
  }

  #account {
    width: 346px;
    height: 255px;
    background-color: #fff;
    border-bottom: 1px solid #f4f4f4;
    position: relative;
    font-size: 14px;
    font-family: '\5b8b\4f53';
    #hint-div{
      width: 306px;
      height: 23px;
      line-height: 20px;
      position: absolute;
      left: 0;
      right: 0;
      margin: 5px auto;
      border: 1px solid #faccc6;
      background-color: #ffebeb;
      box-sizing: border-box;
      font: 12px/150% Arial,Verdana,"\5b8b\4f53";
      .hint-icon{
        width: 16px;
        height: 16px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 10px;
        background-position: 16px -49px;
        background-image: url("~@/assets/imgs/pwd-icons-new.png");
      }
      .hint-info{
        color: #e4393c;
        line-height: 23px;
        margin-left: 38px;
      }
    }
    #username-div {
      label {
        background-image: url('~@/assets/imgs/pwd-icons-new.png');
      }

      .username-password(33px);
      /*margin: 0px auto 33px;*/
    }

    #password-div {
      // background-color: red;
      label {
        background-image: url('~@/assets/imgs/pwd-icons-new.png');
        background-position: -48px 0px;
      }

      .username-password(93px);
    }

    .forget-password {
      position: absolute;
      display: inline-block;
      height: 18px;
      margin: 153px 20px;
      font-size: 7px;
      top: 0;
      bottom: 0;
      right: 0;
      color: #666 !important;

      &:hover {
        color: #E4393C !important;
        cursor: pointer;
        text-decoration: underline;
      }
    }

    #login-btn {
      position: absolute;
      width: 306px;
      height: 33px;
      background-color: #e4393c;
      border: 1px solid #e85356;
      margin: auto;
      left: 0;
      bottom: 33px;
      right: 0;

      a {
        display: block;
        width: 100%;
        height: 31px;
        text-align: center;
        line-height: 31px;
        color: #fff !important;
        font-size: 20px;
        font-family: 'Microsoft YaHei';
        text-decoration: none;
      }
    }
  }
</style>
