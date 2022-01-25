<template>
  <div id="body">
    <div class="tab-nav">
      <div class="tab tab-left tab-current">
        <em class="iconfont icon-annex"></em>
        <span>已有京东账号，请绑定</span>
      </div>
      <div class="tab tab-right">
        <em class="iconfont icon-icon-"></em>
        <a href='/register.html'>没有京东账号，请完善资料</a>
      </div>
    </div>
    <div class="panle">
      <div class="wellcome-tip">
        <img :src="headPortrait30" alt="头像"/>
        <p>Hi, {{nickname}} 欢迎来京东，完成绑定后可以QQ账号 <br>一键登录哦~</p>
      </div>
      <div class="error-container" v-show="errorMsg != ''">
        <span class="iconfont icon-jinggao"></span>
        <span>{{errorMsg}}</span>
      </div>
      <div class="form-item">
        <label for="username">狗 东 账 号</label>
        <input v-model="username" id="username" type="text" placeholder="邮箱/用户名/登录手机">
        <span v-show="username.length > 0" class="iconfont icon-fork" @click="username = ''"></span>
      </div>
      <div class="hint-tip"></div>
      <div class="form-item">
        <label for="password">输 入 密 码</label>
        <input v-model="password" id="password" type="password" placeholder="密码">
        <span v-show="password.length > 0" class="iconfont icon-fork" @click="password = ''"></span>
      </div>
      <div class="hint-tip"></div>
      <div class="forget">
        <a href="/forgotPwd.html">忘记登录密码</a>
      </div>
      <PuzzleVerify v-if="showPuzzle" @successPuzzle="successPuzzle" @closePuzzle="closePuzzle"/>
      <div class="form-item form-button">
        <button @click="binding">{{btnValue}}</button>
      </div>
      <div class="useApp">
        <span class="iconfont icon-erweima"></span>
        <span class="text">用狗东App扫码绑定</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import PuzzleVerify from '@/components/PuzzleVerify.vue';

// eslint-disable-next-line import/named
import resolveBindPageParam from '@/utils/HtmlParamUtil';
import BindPageParam from '@/pojo/BindPageParam';
import { updateOpenIdApi } from '@/api/GoudongUserServerApi';

export default defineComponent({
  components: {
    PuzzleVerify,
  },
  setup() {
    const headPortrait30 = ref('');
    const nickname = ref('');
    const username = ref('');
    const password = ref('');
    const errorMsg = ref('');
    const showPuzzle = ref(false);
    const puzzleSure = ref(false);
    const btnValue = ref('立即绑定');
    let bindPageParam: BindPageParam;

    const binding = () => {
      // 超时了重新跳转qq登录页面
      if ((new Date().getTime() - (bindPageParam.current as number)) > 300000) {
        window.location.href = 'http://www.goudong.shop/oauth/qq/login';
        return;
      }
      if (username.value === '' && password.value === '') {
        errorMsg.value = '请输入账户名和密码';
        return;
      }
      if (username.value === '') {
        errorMsg.value = '请输入账户名';
        return;
      }
      if (password.value === '') {
        errorMsg.value = '请输入密码';
        return;
      }

      showPuzzle.value = true;
    };

    const successPuzzle = () => {
      puzzleSure.value = true;
      // 延迟关闭滑块验证码
      setTimeout(() => {
        showPuzzle.value = false;
      }, 1000);
      btnValue.value = '正在绑定...';
      // 后台校验
      updateOpenIdApi({
        qqOpenId: bindPageParam.openId,
        loginName: username.value,
        password: password.value,
        userType: bindPageParam.userType,
      }).then((response) => {
        // window.location.href = "/index.html";
      }).finally(() => {
        btnValue.value = '立即绑定';
      });
      // if (false) {
      //   errorMsg.value = '账户名不存在，请重新输入';
      //   errorMsg.value = '账户名与密码不匹配，请重新输入';
      // }
      // // 校验成功
      // if (false) {
      //   errorMsg.value = '';
      // }
    };
    const closePuzzle = () => {
      showPuzzle.value = false;
    };

    onMounted(() => {
      bindPageParam = resolveBindPageParam();
      headPortrait30.value = bindPageParam.headPortrait30 as any;
      nickname.value = bindPageParam.nickname as any;
      const current = bindPageParam.current as number;

      // 超过了5分钟后就超时
      if ((new Date().getTime() - current) > 300000) {
        window.location.href = 'http://www.goudong.shop/oauth/qq/login';
        return;
      }
      console.log(bindPageParam);
    });

    return {
      headPortrait30,
      nickname,
      username,
      password,
      errorMsg,
      binding,
      btnValue,
      puzzleSure,
      showPuzzle,
      successPuzzle,
      closePuzzle,
    };
  },
});
</script>

<style lang="less">
  #puzzle-warp{
    bottom: 395px;
  }
</style>

<style lang='less' scoped>
  *{
    box-sizing: border-box;
  }
  input::-webkit-input-placeholder{
    color: #999;
  }
  #body{
    width: 1210px;
    height: 740px;
    margin: auto;
    padding: 50px 190px 60px;
    color: #666;
    font-size: 14px;
    border-bottom: solid 1px #e6e6e6;
    .tab-nav{
      height: 32px;
      margin-bottom: 34px;
      font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
      .tab{
        display: inline-block;
        width: 400px;
        height: 100%;
        border-bottom: 2px solid #ececec;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        color: #666;
        em{
          width: 23px;
          height: 22px;
          display: inline-block;
          margin-right: 10px;
          font-size: 20px;
        }
        a{
         color: #666;
        }
        a:hover{
          color: #C81623;
        }
      }
      .tab-current{
        font-weight: 700;
        border-bottom: solid 2px #e22;
        color: #e22;
        span:hover{
          color: #e22;
        }
      }
    }
    .panle{
      width: 400px;
      height: 447px;
      margin: 0 auto;
      .wellcome-tip{
        color: #333;
        font-size: 12px;
        background: #f6f6f6;
        padding: 8px 15px;
        width: 100%;
        height: 58px;
        position: relative;
        margin-bottom: 40px;
        img{
          width: 28px;
          aspect-ratio: auto 28 / 28;
          height: 28px;
          margin: 7px 10px 7px 8px;
        }
        p{
          width: 310px;
          float: right;
          line-height: 20px;
        }
      }
      .error-container{
        position: relative;
        margin-bottom: 8px;
        overflow: hidden;
        width: 398px;
        background: #fdf2ef;
        border: solid 1px #f98;
        color: #e22;
        line-height: 22px;
        padding: 2px 10px;
        overflow: hidden;
        .iconfont{
          margin-right: 10px;
        }
      }
      .form-item{
        width: 400px;
        height: 54px;
        border: solid 1px #ddd;
        position: relative;
        label{
          float: left;
          width: 90px;
          height: 52px;
          line-height: 52px;
          padding-left: 20px;
        }
        input{
          border: 0 none;
          font-size: 14px;
          width: 190px;
          height: 19px;
          box-sizing: unset;
          padding-left: 20px;
          height: 52px;
        }
        span{
          position: absolute;
          right: 20px;
          margin: auto;
          top: 0;
          bottom: 0px;
          height: 20px;
          width: 20px;
          font-size: 20px;
          font-weight: 500;
          color: #acacac;
          cursor:pointer;
        }
        button{
          width: 100%;
          height: 100%;
          border: unset;
          color: #fff;
          background-color: #e22;
          font-size: 16px;
          font-family: "Microsoft YaHei","Hiragino Sans GB";
          cursor: pointer;
        }
      }
      .form-item-error{
        border: solid 1px #e22;
      }
      .form-button{
        border: unset;
        height: 54px;
      }
      .hint-tip{
        width: 100%;
        height: 27px;
        margin-top: 5px;
      }
      .forget{
        width: 100%;
        height: 21px;
        margin: 16px 0;
        a{
          color: #666;
          font-size: 12px;
          font-family: "Microsoft YaHei","Hiragino Sans GB";
          float: right;
          &:hover{
            color: #e22;
          }
        }
      }
      .useApp{
        margin-top: 23px;
        width: 220px;
        height: 49px;
        border: solid 2px #eaeaea;
        margin: 0 auto;
        margin-top: 23px;
        overflow: hidden;
        cursor: pointer;
        line-height: 45px;
        position: relative;
        .iconfont{
          width: 38px;
          height: 38px;
          font-size: 38px;
          margin-right: 23px;
          color: #d0d0d0;
        }
        .text{
          position: absolute;
        }
      }
    }
  }
</style>
