<!--用户详细信息-->
<template>
  <div id="userinfo">
    <div id="username-div">
      <label for="username">用&nbsp;&nbsp;户&nbsp;&nbsp;名</label>
      <input @blur="usernameBlur" @focus="usernameFocus" autocomplete="off" id="username"
             maxlength="20" placeholder="您的账户名和登录名" ref="usernamrRef" type="text" v-model="username">
      <span @click="cleanUsername" class='clean-icon normal-icon'
            v-show="username.length>0 && !usernameSure"></span>
      <span class='clean-icon succes-icon' v-show="username.length > 0 && usernameSure"></span>
      <Hint :hint="hintUsername"/>
      <ul v-show="usableUsernames.length > 0">
        <li><em class="iconfont icon-jinggao"></em>已注册，推荐您选择</li>
        <li @click="username=item; usableUsernames=[]" v-for="item in usableUsernames" :key="item">{{item}}</li>
      </ul>
    </div>

    <div id="password-div">
      <label for="password">设 置 密 码</label>
      <input @blur="passwordBlur" @focus="passwordFocus" autocomplete="off" id="password"
             maxlength="20" placeholder="建议使用两种或两种以上字符组合" ref="passwordRef" type="password"
             v-model="password">
      <Hint :hint="hintPassword"/>
    </div>

    <div id="confirm-password-div">
      <label for="confirm-password">确 认 密 码</label>
      <input @blur="cpBlur" @focus="cpFocus" autocomplete="off" id="confirm-password"
             maxlength="20" placeholder="请再次输入密码" ref="cpasswordRef" type="password"
             v-model="confirmPassword">
      <Hint :hint="hintconfirmPassword"/>
      <span class='clean-icon succes-icon'
            v-show="confirmPassword.length > 0 && confirmPasswordSure"></span>
    </div>

    <div id="email-div">
      <label for="email-input">邮 箱 验 证</label>
      <input @blur="emailBlur" @focus="emailFocus" autocomplete="off" id="email-input" placeholder="请输入邮箱"
             ref="emailRef" type="text" v-model="email">
      <Hint :hint="hintEmail"/>
      <span class='clean-icon succes-icon' v-show="email.length > 0 && emailSure"></span>
      <ul v-show="emailFormats.length > 0">
        <li @click="checkEmail(item)" v-for="item in emailFormats" :key="item">{{item}}</li>
      </ul>
    </div>

    <div id="email-code-div">
      <label for="email-code-input">邮箱验证码</label>
      <input
        @blur="emailCodeBlur"
        autocomplete="off"
        id="email-code-input"
        maxlength="6"
        placeholder="请输入邮箱验证码"
        ref="emailCodeRef"
        type="text"
        v-model="emailCode">
      <button @click="getEmailCode" ref="emailCodeBtnRef">{{emailCodeBtnVal}}</button>
      <Hint :hint="hintEmailCode"/>
    </div>
    <div @click="regist" id="next-step-button" ref="nextStepRef">立即注册</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue';

import * as HintEntity from '@/pojo/HintEntity';
import { BLANK } from '@/pojo/HintEntity';
import * as Validate from '@/utils/ValidateUtil';
import {
  createUserApi,
  checkRegistryUsernameApi, checkRegistryEmailApi
} from '@/api/GoudongUserServerApi';
import { emailCodeApi,checkEmailCodeApi } from '@/api/GoudongMessageServerApi';
import User from '@/pojo/User';
import RegisterStore from '@/store/RegisterStore';
import Hint from './Hint.vue';

export default defineComponent({
  props: {
    phone: String,
  },
  components: {
    Hint,
  },
  emits: {
    hindenUserInfo: null,
  },
  setup(props, context) {
    // 用户名
    const username = ref('');
    // 密码
    const password = ref('');
    // 二次输入密码
    const confirmPassword = ref('');
    // 邮箱验证
    const email = ref('');
    // 邮箱验证码
    const emailCode = ref('');
    // 用户名格式是否正确
    const usernameSure = ref(false);
    const passwordSure = ref(false);
    // 确认密码是否正确
    const confirmPasswordSure = ref(false);
    // 邮箱验证格式是否正确
    const emailSure = ref(false);
    // 邮箱验证码正确
    const emailCodeSure = ref(false);
    // 用户名输入框验证提示
    const hintUsername = ref(HintEntity.BLANK);
    // 密码输入框验证提示
    const hintPassword = ref(HintEntity.BLANK);
    // 确认密码输入框验证提示
    const hintconfirmPassword = ref(HintEntity.BLANK);
    // 邮箱验证的提示
    const hintEmail = ref(HintEntity.BLANK);
    // 邮箱验证码提示
    // let hintEmailCode = ref(HintEntity.EMAIL_CODE_HINT_4);
    const hintEmailCode = ref(HintEntity.BLANK);
    // 邮箱验证码中的按钮文字
    const emailCodeBtnVal = ref('获取验证码');
    // 默认是空的,页面加载完毕,说明组件已经存在了,获取文本框元素
    const usernamrRef = ref<HTMLElement | null>(null);
    const passwordRef = ref<HTMLElement | null>(null);
    const cpasswordRef = ref<HTMLElement | null>(null);
    const emailRef = ref<HTMLElement | null>(null);
    const emailCodeBtnRef = ref<HTMLElement>();
    // 忘记这个有啥用了
    const isClickBtn = ref(false);
    // 下一步按钮对象
    const nextStepRef = ref<HTMLElement>();
    // 可以使用的用户名列表
    const usableUsernames = ref([]);
    // 申明一个变量保存旧的用户名
    let oldUsername = '';
    // 邮箱格式
    const emailFormats = ref();
    emailFormats.value = [];
    // 已知邮箱格式
    const existsEmailFormats = ['qq', '163', '126', 'Gmail', 'Souhu', 'Sina'];
    const meetEmailFormat = (emailParam: string) => {
      const temp: any[] = [];
      emailFormats.value = [];
      if (emailParam === '') {
        return;
      }
      // 没有@,追加所有格式
      const reg1 = /[@]+/g;
      if (!reg1.test(emailParam)) {
        existsEmailFormats.forEach((item) => {
          temp.push(`${emailParam}@${item}.com`);
        });
        emailFormats.value = temp;
        return;
      }

      // @ 后的字符串，拿来循环匹配
      const reg2 = /[\d\w]+@([a-zA-Z0-9]+.*)?/g;
      const boo = reg2.test(emailParam);
      if (boo) {
        const reg2Str1 = RegExp.$1;
        existsEmailFormats.forEach((item) => {
          if (item.indexOf(reg2Str1) !== -1) {
            const str = emailParam.substring(0, emailParam.indexOf('@'));
            temp.push(`${str}@${item}.com`);
          }
        });
        emailFormats.value = temp;
      }
    };

    // 清空用户名
    const cleanUsername = () => {
      username.value = '';
      usernameSure.value = false;
      hintUsername.value = HintEntity.BLANK;
    };

    // 用户名输入框失去焦点
    const usernameBlur = () => {
      isClickBtn.value = false;
      if (username.value.length > 0) {
        // 检查用户名是否符合条件
        Validate.validateUsername(username.value).then((resolve) => {
          console.log('resolve', resolve);
          usernameSure.value = true;
          hintUsername.value = resolve;
          if (username.value !== oldUsername) {
            // 当符合条件时，查寻用户名是否被使用
            checkRegistryUsernameApi(username.value).then((response) => {
              const { data } = response.data;
              usableUsernames.value = data;
            });
          }
          oldUsername = username.value;
        }).catch((reason) => {
          console.log('reason', reason);
          usernameSure.value = false;
          hintUsername.value = reason;
        });
      } else {
        // 默认显示
        usernameSure.value = false;
        hintUsername.value = HintEntity.BLANK;
      }
    };
    // 用户名输入框得到焦点
    const usernameFocus = () => {
      if (username.value.length === 0 && !isClickBtn.value) {
        hintUsername.value = HintEntity.USERNAME_HINT_0;
      }
    };

    // 确认密码失去焦点
    const cpBlur = () => {
      if (confirmPassword.value.length === 0) {
        hintconfirmPassword.value = HintEntity.BLANK;
        confirmPasswordSure.value = false;
      } else if (confirmPassword.value === password.value) {
        // 比较两次密码是否匹配
        hintconfirmPassword.value = HintEntity.BLANK;
        confirmPasswordSure.value = true;
      } else {
        hintconfirmPassword.value = HintEntity.CONFIRM_PASSWORD_HINT_1;
        confirmPasswordSure.value = false;
      }
    };

    // 密码框失去焦点
    const passwordBlur = () => {
      cpBlur();
      if (password.value.length === 0) {
        passwordSure.value = false;
        hintPassword.value = HintEntity.BLANK;
      }
    };

    // 密码框得到焦点
    const passwordFocus = () => {
      if (password.value.length === 0 && !isClickBtn.value) {
        hintPassword.value = HintEntity.PASSWORD_HINT_0;
      }
    };

    // 密码监视
    watch(password, () => {
      if (password.value.length > 0) {
        Validate.validatePassword(password.value).then((reject) => {
          passwordSure.value = true;
          hintPassword.value = reject;
        }).catch((reason) => {
          passwordSure.value = false;
          hintPassword.value = reason;
        });
      } else {
        hintPassword.value = HintEntity.PASSWORD_HINT_0;
      }
    });

    // 确认密码得到焦点
    const cpFocus = () => {
      if (confirmPassword.value.length === 0) {
        confirmPasswordSure.value = false;
        hintconfirmPassword.value = HintEntity.CONFIRM_PASSWORD_HINT_0;
      }
    };

    // 邮箱验证失去焦点
    let oldEmail = ''; // 上一次邮箱
    let invalidEmail = ''; // 保存临时的无效邮箱
    const emailBlur = () => {
      if (email.value.length === 0) {
        hintEmail.value = BLANK;
        // 临时存储本次邮箱
        oldEmail = email.value;
        return;
      }

      // 值未变
      if (oldEmail === email.value) {
        return;
      }
      // 正则验证
      Validate.validateEmail(email.value).then((value) => {
        // 邮箱格式正确
        hintEmail.value = BLANK;
        emailSure.value = true;
        console.log(value);
        // 当邮箱是已经被自己使用了，就不再验证邮箱是否可用
        if (RegisterStore.state.oldEmail === email.value) {
          emailSure.value = true;
          hintEmail.value = HintEntity.BLANK;
          return;
        }
        // 比较本次和上次是否一致，不一致才调用接口
        if (email.value !== oldEmail) {
          checkRegistryEmailApi(email.value).then((response) => {
            const { data } = response.data;

            console.log(data);
            // 不可以使用
            if (data) {
              emailSure.value = true;
              hintEmail.value = HintEntity.BLANK;
            } else {
              emailSure.value = false;
              hintEmail.value = HintEntity.EMAIL_HINT_32;
              // 不能用
              invalidEmail = email.value;
            }
          });
        }
        // 临时存储本次邮箱
        oldEmail = email.value;
      }, (reason) => {
        // 格式错误
        hintEmail.value = HintEntity.EMAIL_HINT_31;
        emailSure.value = false;
        // 临时存储本次邮箱
        oldEmail = email.value;
      });
    };
    // 邮箱验证得到焦点
    const emailFocus = () => {
      if (email.value.length === 0) {
        hintEmail.value = HintEntity.EMAIL_HINT_30;
        emailSure.value = false;
      }
    };
    // 监视邮箱
    /**
     * 定时修改按钮属性和值
     */
    let intervalId: any;
    watch(email, () => {
      meetEmailFormat(email.value);
      console.log(emailFormats.value);
      emailSure.value = false;
      // 邮箱改变，验证码需要重置
      hintEmailCode.value = HintEntity.BLANK;
      clearInterval(intervalId);
      emailCodeBtnVal.value = '获取验证码';
      (emailCodeBtnRef.value as HTMLElement).removeAttribute('disabled');
    });
    // 检查邮箱是否可用
    const checkEmail = (item: string) => {
      email.value = item;
      emailFormats.value = [];
      emailBlur();
    };

    // 邮箱验证失去焦点
    const emailCodeBlur = () => {
      if (emailCodeSure.value) {
        return;
      }
      if (emailCode.value.length === 0) {
        emailCodeSure.value = false;
        hintEmailCode.value = HintEntity.BLANK;
        return;
      }
      hintEmailCode.value = HintEntity.BLANK;
    };

    const intervalEmailCodeBtnVal = () => {
      hintEmailCode.value = HintEntity.EMAIL_CODE_HINT_4;
      (emailCodeBtnRef.value as HTMLElement).setAttribute('disabled', 'disabled');
      let time = 300;
      emailCodeBtnVal.value = `${time}s后重新获取`;
      intervalId = setInterval(() => {
        time -= 1;
        if (time <= 0) {
          (emailCodeBtnRef.value as HTMLElement).removeAttribute('disabled');
          clearInterval(intervalId);
          hintEmailCode.value = HintEntity.BLANK;
          emailCodeBtnVal.value = '重新获取';
        } else {
          emailCodeBtnVal.value = `${time}s后重新获取`;
        }
      }, 1000);
    };

    // 获取邮箱验证码
    const getEmailCode = () => {
      if (email.value === '') {
        hintEmail.value = HintEntity.EMAIL_HINT_2;
        return;
      }
      if (emailSure.value && !(emailCodeBtnRef.value as HTMLElement).hasAttribute('disabled')) {
        emailCodeSure.value = false;
        emailCode.value = '';
        emailCodeApi(email.value).then((response) => {
          intervalEmailCodeBtnVal();
        });
      }
    };

    // 注册
    const regist = () => {
      const result = usernameSure.value && passwordSure.value && confirmPasswordSure.value && emailSure.value && emailCode.value.length === 6;
      isClickBtn.value = true;
      if (result) {
        if ((nextStepRef.value as HTMLElement).hasAttribute('disabled')) {
          return;
        }
        // 禁用按钮点击
        (nextStepRef.value as HTMLElement).setAttribute('disabled', 'disabled');

        // 检查邮箱和邮箱验证码是否匹配
        checkEmailCodeApi(email.value, emailCode.value).then((response) => {
          const boo: boolean = response.data.data;
          emailCodeSure.value = boo;
          if (boo) {
            hintEmailCode.value = HintEntity.BLANK;

            // 保存到数据库
            const phone: string = props.phone as string;
            const user = new User(phone, username.value, password.value, email.value);
            // 单选框值
            user.accountRadio = RegisterStore.state.accountRadio;
            createUserApi(user).then().then((response) => {
              console.log(response);
              // 触发父组件的方法，将用户名回传
              context.emit('hindenUserInfo', username.value);
              // 修改用户名和密码
              RegisterStore.commit('changeUsernamePassword', user);
            }).finally(() => {
              (nextStepRef.value as HTMLElement).removeAttribute('disabled');
            });
          } else {
            hintEmailCode.value = HintEntity.EMAIL_CODE_HINT_2;
          }
        });
      } else if (!usernameSure.value) {
        // 用户名不正确
        if (username.value.length === 0) {
          hintUsername.value = HintEntity.USERNAME_HINT_01;
        }
        // 得到焦点
        // eslint-disable-next-line no-unused-expressions
        usernamrRef.value && usernamrRef.value.focus();
      } else if (!passwordSure.value) {
        // 密码不正确
        if (password.value.length === 0) {
          hintPassword.value = HintEntity.PASSWORD_HINT_02;
        }
        // 得到焦点
        // eslint-disable-next-line no-unused-expressions
        passwordRef.value && passwordRef.value.focus();
      } else if (!confirmPasswordSure.value) {
        // 确认密码得到焦点
        if (confirmPassword.value !== password.value) {
          (cpasswordRef.value as HTMLElement).focus();
          hintconfirmPassword.value = HintEntity.CONFIRM_PASSWORD_HINT_3;
        }
      } else if (!emailSure.value) {
        hintEmail.value = HintEntity.EMAIL_HINT_2;
      } else if (!emailCodeSure.value) {
        hintEmailCode.value = HintEntity.EMAIL_CODE_HINT_3;
      }
    };

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
      usernameBlur,
      usernameFocus,
      passwordBlur,
      passwordFocus,
      cpBlur,
      cpFocus,
      emailBlur,
      emailFocus,
      emailCodeBlur,
      regist,
      usernamrRef,
      passwordRef,
      cpasswordRef,
      emailRef,
      nextStepRef,
      emailCodeBtnVal,
      usableUsernames,
      emailFormats,
      getEmailCode,
      emailCodeBtnRef,
      checkEmail,
    };
  },
});
</script>

<style lang='less' scoped>

  #userinfo {
    width: @regist-inner-main-width;
    height: 516px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    font-size: 14px;
    padding-bottom: 243px;

    #username-div, #password-div, #confirm-password-div, #email-div, #email-code-div {
      position: relative;
      border: solid 1px #ddd;
      width: 398px;
      height: 52px;
      margin-bottom: 32px;

      label {
        position: relative;
        width: 87px;
        height: 52px;
        padding-left: 20px;
        border-right: 1px solid rgb(221, 221, 221);
        cursor: pointer;
        color: #666;
        line-height: 50px;
        float: left;
      }

      input {
        width: 230px;
        height: 52px;
        border: 0;
        padding-left: 20px;
        font-size: 14px;
        line-height: 52px;
        font-family: Arial;
      }

      .clean-icon {
        width: 16px;
        height: 16px;
        margin: auto;
        right: 15px;
        top: 0;
        bottom: 0;
        position: absolute;
        background-image: url('~@/assets/imgs/icon.png');
      }

      .normal-icon {
        background-position: -50px -117px;

        &:hover {
          cursor: pointer;
          background-position: -33px -100px;
        }
      }

      .succes-icon {
        background-position: -0 -117px;

        &:hover {
          background-position: -0 -117px;
        }
      }

      &:hover {
        border: 1px solid #666;

        label {
          border-right: 1px solid #666;
        }

        button {
          border-left: 1px solid #666;
        }
      }
    }

    #username-div {
      ul {
        width: 398px;
        height: 165px;
        z-index: 10;
        margin-left: -1px;
        border: solid 1px #f98;
        border-bottom: 5px solid RGBA(221, 221, 221, .15);
        list-style: none;

        li {
          height: 40px;
          line-height: 40px;
          width: 266px;
          color: #666;
          padding-left: 130px;
          background: #fdf2ef;
          cursor: pointer;

          &:hover {
            background: #ffeae5;
          }
        }

        li:nth-child(1) {
          color: #ee2223;

          &:hover {
            background: #fdf2ef;
          }

          em {
            margin-right: 5px;
          }
        }

        li:nth-child(4) {
          border-bottom: 1px solid #f98;
        }
      }
    }

    #email-div {
      ul {
        width: 398px;
        height: auto;
        z-index: 10;
        margin-left: -1px;
        background: #fff;
        border: solid 1px #ccc;
        list-style: none;
        li {
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          padding-left: 130px;
          color: #333;
          text-align: left;
          width: 268px;
          &:hover {
            background: #f6f6f6;
          }
        }
      }
    }

    #email-code-div {
      input {
        width: 152px;
      }

      button {
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

      button[disabled] {
        opacity: unset;
        background-color: #f4f5f6;
        cursor: default;
      }
    }

    #next-step-button {
      border: 0;
      width: 398px;
      height: 54px;
      background-color: #e2231a;
      cursor: pointer;
      text-align: center;
      line-height: 54px;
      color: #fff;
      font-size: 16px;
      font-family: "Microsoft YaHei", "Hiragino Sans GB";

      &:hover {
        background-color: #c81623;
      }
    }
  }
</style>
