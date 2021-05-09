<!--用户详细信息-->
<template>
    <div id="userinfo">
        <div id="username-div">
            <label for="username">用　户　名</label>
            <input v-model="username" @blur="usernameBlur" @focus="usernameFocus" ref="usernamrRef" type="text" id="username" placeholder="您的账户名和登录名"  autocomplete="off" maxlength="20">
            <span class='clean-icon normal-icon' v-show="username.length>0 && !usernameSure" @click="cleanUsername"></span>
            <span class='clean-icon succes-icon' v-show="username.length > 0 && usernameSure"></span>
            <Hint :hint="hintUsername" v-show="showHintUsername"/>
            <ul v-show="usableUsernames.length > 0">
              <li><em class="iconfont icon-jinggao"></em>已注册，推荐您选择</li>
              <li v-for="item in usableUsernames" @click="username=item;usableUsernames=[]">{{item}}</li>
            </ul>
        </div>

        <div id="password-div">
            <label for="password">设 置 密 码</label>
            <input v-model="password" @blur="passwordBlur" @focus="passwordFocus" ref="passwordRef" type="password" id="password" placeholder="建议使用两种或两种以上字符组合"  autocomplete="off" maxlength="20">
            <Hint :hint="hintPassword" v-show="showHintPassword"/>
        </div>

        <div id="confirm-password-div">
            <label for="confirm-password">确 认 密 码</label>
            <input v-model="confirmPassword" @blur="cpBlur" @focus="cpFocus" ref="cpasswordRef" type="password" id="confirm-password" placeholder="请再次输入密码"  autocomplete="off" maxlength="20">
            <Hint :hint="hintconfirmPassword" v-show="showHintConfirmPassword"/>
            <span class='clean-icon succes-icon' v-show="confirmPassword.length > 0 && confirmPasswordSure"></span>
        </div>

        <div id="email-div">
          <label for="email-input">邮 箱 验 证</label>
          <input v-model="email" @blur="emailBlur" @focus="emailFocus" ref="emailRef" type="text" id="email-input" placeholder="请输入邮箱"  autocomplete="off">
          <Hint :hint="hintEmail" v-show="showHintEmail"/>
          <span class='clean-icon succes-icon' v-show="email.length > 0 && emailSure"></span>
          <ul v-show="emailFormats.length > 0">
            <li v-for="item in emailFormats" @click="checkEmail(item)">{{item}}</li>
          </ul>
        </div>

        <div id="email-code-div">
          <label for="email-code-input">邮箱验证码</label>
          <input v-model="emailCode" @blur="emailCodeBlur" @focus="emailCodeFocus" ref="emailCodeRef" type="text" id="email-code-input" placeholder="请输入邮箱验证码"  autocomplete="off" maxlength="6">
          <button @click="getEmailCode" ref="emailCodeBtnRef">{{emailCodeBtnVal}}</button>
          <Hint :hint="hintEmailCode" v-show="showHintEmailCode"/>
        </div>
        <div id="next-step-button" @click="regist">立即注册</div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, ref, watch } from 'vue';

    import Hint from './Hint.vue';
    import * as HintEntity from '@/pojo/HintEntity';
    import * as Validate from '@/utils/validate';
    import Axios from '@/utils/Axios';
    import Result from '@/pojo/Result';
    import * as Oauth2Url from '@/utils/Oauth2Url';
    import * as MessageUrl from '@/utils/MessageUrl';

    import {Url} from "@/pojo/Url";
    export default defineComponent ({
        components:{
            Hint
        },
        emits:{
            'hindenUserInfo':null,
        },
      setup: function (props, context) {
        // 用户名
        let username = ref('');
        // 密码
        let password = ref('');
        // 二次输入密码
        let confirmPassword = ref('');
        // 邮箱验证
        let email = ref("");
        // 邮箱验证码
        let emailCode = ref("");
        // 用户名格式是否正确
        let usernameSure = ref(false);
        let passwordSure = ref(false);
        // 确认密码是否正确
        let confirmPasswordSure = ref(false);
        // 邮箱验证格式是否正确
        let emailSure = ref(false);
        // 邮箱验证码正确
        let emailCodeSure = ref(false);
        // 用户名输入框验证提示
        let hintUsername = ref(HintEntity.USERNAME_HINT_0);
        // 密码输入框验证提示
        let hintPassword = ref(HintEntity.PASSWORD_HINT_0);
        // 确认密码输入框验证提示
        let hintconfirmPassword = ref(HintEntity.CONFIRM_PASSWORD_HINT_0);
        // 邮箱验证的提示
        let hintEmail = ref(HintEntity.EMAIL_HINT_30);
        // 邮箱验证码提示
        let hintEmailCode = ref(HintEntity.EMAIL_CODE_HINT_4);
        // 显示用户的验证提示组件
        let showHintUsername = ref(false);
        // 显示密码的验证提示组件
        let showHintPassword = ref(false);
        // 显示确认密码的验证提示组件
        let showHintEmail = ref(false);
        // 显示确认密码的验证提示组件
        let showHintEmailCode = ref(false);

        // 显示确认密码的验证提示组件
        let showHintConfirmPassword = ref(false);

        // 邮箱验证码中的按钮文字
        let emailCodeBtnVal = ref("获取验证码");
        // 默认是空的,页面加载完毕,说明组件已经存在了,获取文本框元素
        let usernamrRef = ref<HTMLElement | null>(null)
        let passwordRef = ref<HTMLElement | null>(null)
        let cpasswordRef = ref<HTMLElement | null>(null)
        let emailRef = ref<HTMLElement | null>(null)
        let emailCodeBtnRef = ref<HTMLElement>();
        let isClickBtn = ref(false);

        // 可以使用的用户名列表
        let usableUsernames = ref([]);
        // 申明一个变量保存旧的用户名
        let oldUsername:string = "";
        // 邮箱格式
        let emailFormats = ref();
        emailFormats.value = [];
        // 已知邮箱格式
        let existsEmailFormats = ["qq", "163", "126", "Gmail", "Souhu", "Sina"];
        const meetEmailFormat = (email:string) => {
          let temp:any[] = [];
          emailFormats.value = [];
          if (email === "") {
            return false;
          }
          // 没有@,追加所有格式
          let reg1 = /[@]+/g;
          if (!reg1.test(email)) {
            existsEmailFormats.forEach(item => {
              temp.push(email + "@" + item + ".com")
            })
            emailFormats.value = temp;
            return false;
          }

          // @ 后的字符串，拿来循环匹配
          let reg2 = /[\d\w]+@([a-zA-Z0-9]+.*)?/g
          let boo = reg2.test(email)
          if (boo) {
            let reg2 = RegExp.$1;
            existsEmailFormats.forEach(item => {
              if (item.indexOf(reg2) != -1) {
                let str = email.substring(0, email.indexOf("@"));
                temp.push(str + "@" + item + ".com")
              }
            })
            emailFormats.value = temp;
          }
        }

        // 清空用户名
        const cleanUsername = () => {
          username.value = '';
          showHintUsername.value = false;
          usernameSure.value = false;
          hintUsername.value = HintEntity.USERNAME_HINT_0;
        }

        // 验证用户名的回调函数
        const usernameCallback = (e: Error) => {
          console.log("调用回调函数")
          if (e) {
            let msg = e.message;
            // 显示
            showHintUsername.value = true;
            if (msg === HintEntity.USERNAME_HINT_0.info) {
              hintUsername.value = HintEntity.USERNAME_HINT_0;
            } else if (msg === HintEntity.USERNAME_HINT_1.info) {
              hintUsername.value = HintEntity.USERNAME_HINT_1;
            }
          } else {
            // 隐藏
            showHintUsername.value = false;
            if (username.value != oldUsername) {
              // 当符合条件时，查寻用户名是否被使用
              let checkUsername: Url = Oauth2Url.checkUsername(username.value)
              Axios.get(checkUsername.url).then(response => {

                let data:[] = response.data.data;
                usableUsernames.value = data;
              })
            }

          }
          oldUsername = username.value;
        }

        // 用户名输入框失去焦点
        const usernameBlur = () => {
          isClickBtn.value = false;
          if (username.value.length > 0) {
            // 检查用户名是否符合条件
            usernameSure.value = Validate.validateUsername(username.value, usernameCallback);

          } else {
            // 默认显示
            usernameSure.value = false;
            showHintUsername.value = false;
          }
        }
        // 用户名输入框得到焦点
        const usernameFocus = () => {
          if (username.value.length == 0 && !isClickBtn.value) {
            showHintUsername.value = true;
            hintUsername.value = HintEntity.USERNAME_HINT_0;
          }
        }

        // 密码框失去焦点
        const passwordBlur = () => {
          cpBlur();
          if (password.value.length === 0) {
            passwordSure.value = false
            showHintPassword.value = false;
          }
        }

        // 密码框得到焦点
        const passwordFocus = () => {
          if (password.value.length == 0 && !isClickBtn.value) {
            showHintPassword.value = true;
          }
        }
        const passwordCallback = (e: Error) => {
          if (e) {
            let msg = e.message;
            // 数量不够
            if (msg === HintEntity.PASSWORD_HINT_0.info) {
              hintPassword.value = HintEntity.PASSWORD_HINT_01;
              passwordSure.value = false;
            } else if (msg === HintEntity.PASSWORD_HINT_1.info) {
              hintPassword.value = HintEntity.PASSWORD_HINT_1;
              passwordSure.value = true;
            } else if (msg === HintEntity.PASSWORD_HINT_3.info) {
              hintPassword.value = HintEntity.PASSWORD_HINT_3;
              passwordSure.value = true;
            } else if (msg === HintEntity.PASSWORD_HINT_2.info) {
              hintPassword.value = HintEntity.PASSWORD_HINT_2;
              passwordSure.value = true;
            }
          }
        }
        // 密码监视
        watch(password, () => {
          if (password.value.length > 0) {
            Validate.validatePassword(password.value, passwordCallback);
          } else {
            hintPassword.value = HintEntity.PASSWORD_HINT_0;
          }
        })

        // 确认密码失去焦点
        const cpBlur = () => {
          if (confirmPassword.value.length == 0) {
            showHintConfirmPassword.value = false;
            confirmPasswordSure.value = false;
          } else {
            // 比较两次密码是否匹配
            if (confirmPassword.value === password.value) {
              showHintConfirmPassword.value = false;
              confirmPasswordSure.value = true;
            } else {
              showHintConfirmPassword.value = true;
              hintconfirmPassword.value = HintEntity.CONFIRM_PASSWORD_HINT_1;
              confirmPasswordSure.value = false;
            }
          }

        }
        // 确认密码得到焦点
        const cpFocus = () => {
          if (confirmPassword.value.length === 0) {
            showHintConfirmPassword.value = true;
            confirmPasswordSure.value = false;
            hintconfirmPassword.value = HintEntity.CONFIRM_PASSWORD_HINT_0;
          }
        }

        // 邮箱验证失去焦点
        let oldEmail = ""; // 上一次邮箱
        const emailBlur = () => {
          if (email.value.length == 0) {
            showHintEmail.value = false;
            // 临时存储本次邮箱
            oldEmail = email.value;
            return false;
          }
          Validate.validateEmail(email.value).then(value => {
            // 邮箱格式正确
            showHintEmail.value = false;
            emailSure.value = true;
            console.log(value)
            // 比较本次和上次是否一致，不一致才调用接口
            if (email.value != oldEmail) {
              let checkEmail = Oauth2Url.checkEmail(email.value);
              Axios.get(checkEmail.url).then(response => {
                let data:boolean = response.data.data;
                console.log(data)
                // 不可以使用
                if (!data) {
                  showHintEmail.value = true;
                  hintEmail.value = HintEntity.EMAIL_HINT_32;
                  emailSure.value = false;
                }
              })
            }
            // 临时存储本次邮箱
            oldEmail = email.value;
          }, reason => {
            // 格式错误
            showHintEmail.value = true;
            hintEmail.value = HintEntity.EMAIL_HINT_31;
            emailSure.value = false;
            // 临时存储本次邮箱
            oldEmail = email.value;
          })


        }
        // 邮箱验证得到焦点
        const emailFocus = () => {
          if (email.value.length === 0) {
            showHintEmail.value = true;
            hintEmail.value = HintEntity.EMAIL_HINT_30;
            emailSure.value = false;
          }
        }
        // 监视邮箱
        watch(email, () => {
          meetEmailFormat(email.value);
          console.log(emailFormats.value)
        })
        // 检查邮箱是否可用
        const checkEmail = (item:string) => {
          email.value = item;
          emailFormats.value = [];
          emailBlur();
        }

        // 邮箱验证失去焦点
        const emailCodeBlur = () => {

        }
        // 确认密码得到焦点
        const emailCodeFocus = () => {
        }

        // 获取邮箱验证码
        const getEmailCode = () => {
          if (email.value === "") {
            hintEmail.value = HintEntity.EMAIL_HINT_2;
            showHintEmail.value = true;
            return false;
          }
          if (emailSure.value && !(emailCodeBtnRef.value as HTMLElement).hasAttribute("disabled")) {
            let emailCodeInterface:Url = MessageUrl.emailCode(email.value);
            Axios.get(emailCodeInterface.url).then(response => {
              intervalEmailCodeBtnVal();
            })
          }
        }

        /**
         * 定时修改按钮属性和值
         */
        const intervalEmailCodeBtnVal = () => {
          (emailCodeBtnRef.value as HTMLElement).setAttribute("disabled", "disabled");
          let time = 300;
          let intervalId = setInterval(()=> {
            time--;
            if (time <= 0) {
              (emailCodeBtnRef.value as HTMLElement).removeAttribute("disabled");
              clearInterval(intervalId);
            }
            emailCodeBtnVal.value = time+"s后重新获取";
          }, 1000);
        }

        // 注册
        const regist = () => {
          let result = usernameSure.value && passwordSure.value && confirmPasswordSure.value && emailSure.value && emailCodeSure.value;
          isClickBtn.value = true;
          if (result) {
            // 触发父组件的方法，将用户名回传
            context.emit('hindenUserInfo', username.value);
          } else if (!usernameSure.value) {
            // 用户名不正确
            if (username.value.length == 0) {
              showHintUsername.value = true;
              hintUsername.value = HintEntity.USERNAME_HINT_01;
            }
            // 得到焦点
            usernamrRef.value && usernamrRef.value.focus()
          } else if (!passwordSure.value) {
            // 密码不正确
            if (password.value.length === 0) {
              showHintPassword.value = true;
              hintPassword.value = HintEntity.PASSWORD_HINT_02;
            }
            // 得到焦点
            passwordRef.value && passwordRef.value.focus()
          } else if (!confirmPasswordSure.value) {
            // 确认密码得到焦点
            cpasswordRef.value && cpasswordRef.value.focus();
          } else if (!emailSure.value) {
            (emailRef.value as HTMLElement).focus()
          } else if (!emailCodeSure.value) {

          }

        }

        return {
          username,
          password,
          confirmPassword,
          email,
          emailCode,
          cleanUsername,
          usernameSure,
          confirmPasswordSure,
          emailSure,
          hintUsername,
          hintconfirmPassword,
          hintPassword,
          hintEmail,
          hintEmailCode,
          showHintUsername,
          showHintPassword,
          showHintConfirmPassword,
          showHintEmail,
          showHintEmailCode,
          usernameBlur,
          usernameFocus,
          passwordBlur,
          passwordFocus,
          cpBlur,
          cpFocus,
          emailBlur,
          emailFocus,
          emailCodeBlur,
          emailCodeFocus,
          regist,
          usernamrRef,
          passwordRef,
          cpasswordRef,
          emailRef,

          emailCodeBtnVal,
          usableUsernames,
          emailFormats,
          getEmailCode,
          emailCodeBtnRef,
          checkEmail,
        }
      }
    })
</script>

<style>
  #body{
    height: 843px !important;
  }
</style>
<style lang='less' scoped>
    @import url('~@/assets/less/globalVariable.less');
    #userinfo{
        width: @regist-inner-main-width;
        height: 516px;
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        font-size: 14px;
        #username-div,#password-div,#confirm-password-div,#email-div, #email-code-div{
            position: relative;
            border: solid 1px #ddd;
            width: 398px;
            height: 52px;
            margin-bottom: 32px;
            label{
                position: relative;
                width:87px;
                height:52px;
                padding-left: 20px;
                border-right: 1px solid rgb(221, 221, 221);
                cursor: pointer;
                color: #666;
                line-height: 50px;
                float: left;
            }
            input{
                width: 230px;
                height: 52px;
                border: 0;
                padding-left: 20px;
                font-size: 14px;
                line-height: 52px;
                font-family: Arial;
            }

            .clean-icon{
                width:16px;
                height:16px;
                margin: auto;
                right: 15px;
                top: 0;
                bottom: 0;
                position: absolute;
                background-image:url('~@/assets/imgs/icon.png');
            }
            .normal-icon{
                background-position: -50px -117px;
                &:hover{
                    cursor: pointer;
                    background-position: -33px -100px;
                }
            }
            .succes-icon{
                background-position: -0 -117px;
                &:hover{
                    background-position: -0 -117px;
                }
            }
            &:hover{
                border: 1px solid #666;
                label{
                    border-right: 1px solid #666;
                }
                button{
                  border-left: 1px solid #666;
                }
            }
        }
        #username-div{
          ul{
            width: 398px;
            height: 165px;
            z-index: 10;
            position: absolute;
            margin-left: -1px;
            border: solid 1px #f98;
            border-bottom: 5px solid RGBA(221,221,221,.15);
            list-style: none;
            li{
              height: 40px;
              line-height: 40px;
              color: #666;
              padding-left: 130px;
              background: #fdf2ef;
              cursor: pointer;
              &:hover{
                background: #ffeae5;
              }
            }
            li:nth-child(1){
              color: #ee2223;
              &:hover{
                background: #fdf2ef;
              }
              em{
                margin-right: 5px;
              }
            }
            li:nth-child(4){
              border-bottom: 1px solid #f98;
            }
          }
        }
        #email-div{
        ul{
          width: 398px;
          height: auto;
          z-index: 10;
          position: absolute;
          margin-left: -1px;
          background: #fff;
          border: solid 1px #ccc;
          list-style: none;
          li{
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            padding-left: 130px;
            color: #333;
            padding-right: 12px;
            text-align: right;
            &:hover{
              background: #f6f6f6;
            }
          }
        }
      }
        #email-code-div{
          input{
            width:152px;
          }
          button{
            position: absolute;
            display: inline-block;
            height: 100%;
            background-color: #fff;
            border: none;
            border-left: 1px solid #ddd;
            cursor: pointer;
            width: 118px;
            text-align: center;
          }
          button[disabled]{
            background-color: #f4f5f6;
            cursor: default;
          }
        }
        #next-step-button{
            border: 0;
            width: 398px;
            height: 54px;
            background-color: #e2231a;
            cursor: pointer;
            text-align: center;
            line-height: 54px;
            color: #fff;
            font-size: 16px;
            font-family: "Microsoft YaHei","Hiragino Sans GB";
            &:hover{
                background-color:#c81623;
            }
        }
    }
</style>
