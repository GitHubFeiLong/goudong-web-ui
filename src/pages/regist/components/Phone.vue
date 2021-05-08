<!--手机号验证-->
<template>
  <div id="phone">
    <div id="phone-number">
      <label for="phone-num-input">中国 0086</label>
      <input @blur="phoneBlur" @focus="phoneFocus" autocomplete="off" id="phone-num-input" maxlength="11"
             placeholder="建议使用常用手机号" ref="phoneRef" type="text" v-model="phone">
      <span @click="cleanPhone" class='clean-icon normal-icon'
            v-show="phone.length>0 && !phoneSure"></span>
      <span class='clean-icon succes-icon' v-show="phone.length>0 && phoneSure"></span>
      <Hint :hint="hint" v-show="showHint"/>
    </div>
    <!--滑块验证-->
    <PuzzleVerify @closePuzzle="closePuzzle" @successPuzzle="successPuzzle" v-if="showPuzzle"/>

    <div @click="clickGetAuth" id="phone-button" v-if="showPhoneButton">点击按钮进行验证
      <Hint :hint="authHint" v-show="showHint2"/>
    </div>
    <div id="phone-auth-code" v-else>
      <div class="border">
        <label for="auth-code-input">手机验证码</label>
        <input autocomplete="off" id="auth-code-input" maxlength="6" placeholder="输入验证码"
               type="text" v-model="authCode">
      </div>
      <button :class="btnClass" @click="repeatGetAuth">{{timer}}{{btnVal}}</button>
      <Hint :hint="authHint"/>
    </div>
    <div @click="clickNextStep" id="phone-next-step">下一步</div>
  </div>

  <!--弹框-->
  <el-dialog class="phone-dialog" v-model="dialogVisible" width="420px">
    <div class="content">
      <div class="header">
        <div class="img"></div>
        <div class="txt">
          <em></em>
          已被以下账号占用<br>
          请确认是否为您所有
        </div>
      </div>
      <div class="body">

      </div>
      <div class="fotter">

      </div>
    </div>
  </el-dialog>
</template>

<script lang='ts'>
  import {defineComponent, ref, watch, onMounted} from 'vue';
  import axios from "@/utils/Axios";

  import Hint from './Hint.vue';
  import PuzzleVerify from '@/components/PuzzleVerify.vue';
  // 提示对象
  import * as HintEntity from '@/pojo/HintEntity';
  // 验证
  import * as Validate from '@/utils/validate';

  // 接口地址
  import * as MessageUrl from '@/pojo/MessageUrl';
  import * as Oauth2Url from '@/pojo/Oauth2Url';
  import {Url} from "@/pojo/Url";
  import Result from "@/pojo/Result";

  export default defineComponent({
    props: {},
    emits: {
      'hindenPhone': null,
    },
    components: {
      Hint,
      PuzzleVerify
    },
    setup: function (props, context) {
      // 提示信息
      let hint = ref(HintEntity.PHONE_HINT_00);
      let getAuthCodeNum = ref(2);
      let authHint = ref(new HintEntity.HintEntity(`该手机还可以获取${getAuthCodeNum.value}次验证码，请尽快验证`, '#c5c5c5', '0px -100px'));
      // 显示下一步（true）
      let showPhoneButton = ref(true)
      let phone = ref('');
      // 手机输入框的提示是否显示
      let showHint = ref(false);
      // 是否显示 完成验证
      let showHint2 = ref(false);
      // 手机是否正确
      let phoneSure = ref(false);
      // 倒计时
      let timer: any = ref(5);
      let btnVal = ref('s后重新获取');
      // 定时器id
      let intervalId: any = null;
      // 按钮class
      let btnClass = ref('btn-no-hover');
      // 是否显示滑块验证
      let showPuzzle = ref(false);
      // 用户输入的验证码
      let authCode = ref("");
      // phone输入框
      let phoneRef = ref<HTMLElement | null>(null);
      // 滑块验证是否正确
      let puzzleSure = ref(false);
      // 弹框是否显示
      let dialogVisible =  ref(false);

      // 清除phone值
      const cleanPhone = () => {
        showHint.value = false;
        phone.value = '';
        phoneSure.value = false;
      }
      // 绑定事件监听，父子组件通信
      const successPuzzle = () => {
        console.log("successPuzzle 调用了");
        puzzleSure.value = true;
        // 延迟关闭滑块验证码
        setTimeout(() => {
          showPuzzle.value = false;
          // 验证码验证
          showPhoneButton.value = false;
        }, 1000);
        // 检查手机号是否被使用
        let getUserByPhone = Oauth2Url.getUserByPhone(phone.value);
        console.log(getUserByPhone);
        axios.get(getUserByPhone.url).then(response=>{
          let result:Result = response.data;
          if (result) {
            dialogVisible.value = true;
          }
          console.log(response)
        })
      }

      // 关闭滑块验证事件监听
      const closePuzzle = () => {
        showPuzzle.value = false;
      }

      // 点击获取验证码
      const clickGetAuth = () => {
        if (phone.value.length == 0) {
          showHint.value = true;
          hint.value = HintEntity.PHONE_HINT_02
        }
        // 手机格式正确才显示
        if (phoneSure.value) {
          // 1. 滑块验证
          showPuzzle.value = true;
          puzzleSure.value = false;
        }

      }
      // 手机输入框获取焦点
      const phoneFocus = () => {
        showHint.value = !phoneSure.value;
        if (HintEntity.PHONE_HINT_02.equals(hint.value)) {
          hint.value = HintEntity.PHONE_HINT_02;
        }

      }
      // 手机输入框失去焦点
      const phoneBlur = () => {
        // 判断是否显示下面的提示信息
        if (phone.value.length > 0) {
          // 正则验证手机是否正确的格式
          Validate.validatePhone(String(phone.value)).then((value) => {
            phoneSure.value = true;
            showHint.value = false;
            hint.value = HintEntity.PHONE_HINT_00;
          }, (reason) => {
            phoneSure.value = false;
            showHint.value = true;
            hint.value = HintEntity.PHONE_HINT_01;
          });
        } else {
          showHint.value = false;
        }
      }
      // 定时器
      const authCodeTimer = () => {
        timer.value = 120;
        btnVal.value = 's后重新获取';
        btnClass.value = 'btn-no-hover';
        authHint.value = new HintEntity.HintEntity(`验证码已发送,${timer.value}秒内输入有效`, '#c5c5c5', '0px -100px');
        // 请求接口，发送手机验证码
        let phoneCode:Url = MessageUrl.phoneCode(phone.value);
        axios.get(phoneCode.url).then(response=>{
          console.log(response)
        })
        intervalId = setInterval(() => {
          timer.value--;
          // authHint.value = new HintEntity.HintEntity(`验证码已发送,${timer.value}秒内输入有效`, '#c5c5c5', '0px -100px');
          if (timer.value == 0) {
            // 清除定时器
            clearInterval(intervalId);
            // 恢复按钮功能
            btnClass.value = '';
            timer.value = '';
            btnVal.value = '重新获取';
            getAuthCodeNum.value--;
            authHint.value = new HintEntity.HintEntity(`该手机还可以获取${getAuthCodeNum.value}次验证码，请尽快验证`, '#c5c5c5', '0px -100px');
          }
        }, 1000)
      }

      // 重新获取验证码
      const repeatGetAuth = () => {
        authCodeTimer();
      }
      //  点击下一步
      const clickNextStep = () => {
        // 手机为空时
        if (phone.value == "") {
          showHint.value = true;
          hint.value = HintEntity.PHONE_HINT_02;
          // 得到焦点
          phoneRef.value && phoneRef.value.focus();
          return;
        }
        // 手机正确
        if (phoneSure.value) {
          if (!puzzleSure.value) { // 滑块验证未验证通过时
            showHint2.value = true;
            authHint.value = HintEntity.PHONE_HINT_03;
            // 得到焦点
            phoneRef.value && phoneRef.value.focus();
          } else {
            // 将手机号和验证码 拿去请求查看是否正确
            let checkCode = MessageUrl.checkCode(phone.value, authCode.value);
            axios.get(checkCode.url).then(response => {
              console.log(response);
              if (response.data.data) {
                // 匹配成功,修改样式
                  context.emit('hindenPhone')
              } else {
                // 匹配错误
                authHint.value = HintEntity.EMAIL_CODE_HINT_2;
              }
            })
          }
        }
      }
      // 监视手机值
      watch(phone, (cur, pre) => {
        if (phone.value.length == 0) {
          hint.value = HintEntity.PHONE_HINT_00;
          phoneSure.value = false;
        } else {
          Validate.validatePhone(String(phone.value)).then((value) => {
            phoneSure.value = true;
            showHint.value = false;
            hint.value = HintEntity.PHONE_HINT_00;
          }, (reason) => {
            phoneSure.value = false;
            showHint.value = true;
            hint.value = HintEntity.PHONE_HINT_01;
          });
        }
      })
      // 监视手机格式是否正确
      watch(phoneSure, () => {
        if (!phoneSure.value) {
          // 不正确,显示按钮
          showPhoneButton.value = true;
          console.log('showPhoneButton', showPhoneButton);
        }
      })

      // 监视显示验证码输入框
      watch(showPhoneButton, () => {
        if (!showPhoneButton.value) {
          authCodeTimer()
        }
      })

      // 监视次数
      watch(getAuthCodeNum, () => {
        if (getAuthCodeNum.value <= 0) {
          btnClass.value = 'btn-no-hover';
        }
      })

      return {
        btnClass,
        timer,
        btnVal,
        hint,
        authHint,
        showHint,
        showHint2,
        showPuzzle,
        showPhoneButton,
        phone,
        phoneSure,
        phoneFocus,
        phoneBlur,
        phoneRef,
        cleanPhone,
        clickGetAuth,
        repeatGetAuth,
        clickNextStep,
        successPuzzle,
        closePuzzle,
        authCode,
        dialogVisible,
      }
    }
  })
</script>

<style>
  #puzzle-warp {
    margin-top: -170px;
  }
  .el-dialog__body{
    padding-top: 0px !important;
  }
</style>
<style lang='less' scoped>
  @import url('~@/assets/less/globalVariable.less');

  #phone {
    width: @regist-inner-main-width;
    height: 246px;
    background: #fff;
    position: relative;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    input::-webkit-input-placeholder {
      color: rgb(204, 204, 204);
    }

    #phone-number {
      position: relative;
      border: solid 1px #ddd;
      width: 398px;
      height: 52px;

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

      #phone-num-input {
        width: 230px;
        height: 50px;
        border: 0;
        padding-left: 20px;
        font-size: 14px;
        line-height: 48px;
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
      }
    }

    #phone-button {
      border: solid 1px #ddd;
      width: 398px;
      height: 54px;
      cursor: pointer;
      text-align: center;
      line-height: 54px;
      font-size: 14px;
      color: #333;
      margin-top: -15px;
      position: relative;

      &:hover {
        border: 1px solid #666;
      }
    }

    #phone-auth-code {
      width: 398px;
      height: 52px;
      line-height: 54px;
      font-size: 14px;
      color: #333;
      position: relative;
      margin-top: -15px;

      .border {
        width: 281px;
        height: 100%;
        display: inline-block;
        border: solid 1px rgb(221, 221, 221);

        label {
          position: relative;
          width: 87px;
          height: 52px;
          padding-left: 20px;
          cursor: pointer;
          color: #666;
          line-height: 52px;
          float: left;
        }

        input {
          height: 52px;
          width: 154PX;
          border: 0px;
          padding: 0px;
          padding-left: 20px;
          font-size: 14px;
          line-height: 52px;
          float: left;
          position: absolute;
        }

        &:hover {
          border: 1px solid #666;
        }
      }

      button {
        float: right;
        width: 115px;
        height: 54px;
        border: 1px solid #ddd;
        border-left: none;
        background: #fff;
        color: #333;
        padding: 0;
        float: right;
        position: absolute;
        border-radius: 0;
        cursor: pointer;

        &:hover {
          border: 1px solid #666;
        }
      }

    }

    #phone-next-step {
      border: 0;
      width: 400px;
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
  .el-dialog{
    border: 4px solid rgba(0,0,0,.1) !important;
  }
  .el-dialog__body{

    .content {
      width: 100%;
      height: 290px;
      .header{
        margin-top: 15px;
        height: 123px;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        .img{
          width: 50px;
          height: 50px;
          background-image: url("~@/assets/imgs/icon.png");
          background-position: 190px 0px;
        }
        .txt{
          margin-top: 10px;
          text-align: center;
          font-size: 16px;
          color: #666;
          line-height: 21px;
        }
      }
      .body{
        height: 80px;
        padding: 14px 27px;
        border-bottom: 1px solid #ddd;
      }
    }
  }

</style>
