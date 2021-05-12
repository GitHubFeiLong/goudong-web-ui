<!--开始-->
<template>
  <div id="body-info">
    <div class="head">
      <div class="step step1" :style="step1Style">
        <div class="circle" :style="circle1">1</div>
        <div class="outer" :style="outer1"></div>
        <div class="txt">身份认证</div>
      </div>
      <div class="line"></div>
      <div class="step step2" :style="step2Style">
        <div class="circle" :style="circle2">2</div>
        <div class="outer" :style="outer2"></div>
        <div class="txt">设置操作</div>
      </div>
      <div class="line"></div>
      <div class="step step3" :style="step3Style">
        <div class="circle" :style="circle3">3</div>
        <div class="outer" :style="outer3"></div>
        <div class="txt">完成</div>
      </div>
    </div>
    <!--验证用户-->
    <div class="step-1-body" v-if="stepStatus == 1">
      <img src="~@/assets/imgs/auth-ico.png">
      <p>为确认是您本人操作，请选择以下任一方式完成身份认证</p>
      <button @click="dialogVisible = true">使用 邮箱验证码</button>
    </div>
    <!--设置新密码-->
    <div class="step-2-body" v-else-if="stepStatus == 2">
      <p>设置新密码</p>
      <div class="password-div" >
        <input ref="pwdRef" v-model="newPassword" type="password" placeholder="请输入新密码">
        <em @click="newPassword = ''; " v-show="newPassword.length > 0" class="iconfont icon-fork"></em>
        <em ref="eyeRef" class="iconfont icon-icon-test icon-eye" @click="switchShowPwd()"></em>
      </div>
      <div class="hint"><Hint :hint="pwdHint"/></div>
      <div class="submit-div">
        <button :disabled="!pwdSure" @click="clickSubmitBtn()">提 交</button>
      </div>
    </div>
    <!--修改密码成功-->
    <div class="step-3-body" v-else>
      <div class="header"><em class="iconfont icon-Success-Small"></em></div>
      <p>登陆密码更新成功</p>
      <div class="submit-div">
        <button @click="clickGoLogin()">重新登录</button>
      </div>
    </div>
    <BodyFoot v-if="stepStatus == 1"/>
  </div>
  <!--弹框-->
  <el-dialog class="email-dialog" v-model="dialogVisible" width="500px" height="600px">
    <div class="content">
      <div class="header">
        <div class="icon">
          <em class="iconfont icon-phone_icon"></em>
        </div>
        <p>手机短信验证码</p>
      </div>
      <div class="body">
        <p class="phone-p">当前手机号152xxxx716</p>
        <div class="verify-div">
          <div :class="verifyLeftDivClass">
            <input v-model="phoneVerifyCode" @focus="phoneVerifyCodeFocus($event)" @blur="phoneVerifyCodeBlur($event)" type="text"  placeholder="请输入手机验证码"  autocomplete="off" maxlength="6">
            <em v-show="phoneVerifyCode.length > 0" @click="phoneVerifyCode=''; showHint=false" class="iconfont icon-fork"></em>
          </div>
          <!--按钮-->
          <div class="verify-right-div">
            <div class="message-div">
              <button class="message-button"><span class="iconfont icon-duanxin"></span>获取短信验证码</button>
            </div>
            <div class="voice-div">
              <button class="voice-button"><span class="iconfont icon-dianhua"></span>获取语音验证码</button>
            </div>
          </div>
        </div>
        <!--提示信息-->
        <div class="hint"><Hint :hint="hint" v-show="showHint"/></div>
        <!--下一步按钮-->
        <div class="next-step-div">
          <button :disabled="phoneVerifyCode.length == 0" @click="clickDialogNextStep">下一步</button>
        </div>
      </div>
      <div class="fotter">
        <QA :qa="dialogQA"/>
      </div>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
  declare var $: (selector: string) => any;
  import { defineComponent, ref, onMounted, watch, inject } from 'vue'

  // 提示信息
  import BodyFoot from "@/pages/forgotPwd/components/BodyFoot.vue";
  // 输入框提示信息
  import Hint from "@/components/Hint.vue";
  import QA from "@/components/QA.vue";
  import * as HintEntity from "@/pojo/HintEntity";
  import * as QAEntity from "@/pojo/QAEntity";
  import * as Validate from "@/utils/ValidateUtil";
  export default defineComponent ({
    components:{
      BodyFoot,
      Hint,
      QA,
    },
    setup (props, content) {
      // 当前的步骤状态
      let stepStatus = ref(1);
      // 步骤1相关
      let step1Style = ref({color:'#0c8'});
      let circle1 = ref({"background-color": '#0c8', color:'#fff'});
      let outer1 = ref({"background-color":'#0c8'});

      // 步骤2相关
      let step2Style = ref({});
      let circle2 = ref({});
      let outer2 = ref({});
      // 步骤3相关
      let step3Style = ref({});
      let circle3 = ref({});
      let outer3 = ref({});

      // 弹框是否显示
      let dialogVisible =  ref(false);
      // 弹框验证码输入左边的divclass
      let verifyLeftDivClass = ref({'verify-left-div':true, 'verify-left-div-focus':false});
      // 弹框验证码输入
      let phoneVerifyCode = ref("");
      // 弹框提示信息
      let showHint = ref(false);
      let hint = ref(HintEntity.EMAIL_CODE_HINT_2);

      // 弹框问题
      let dialogQA = new QAEntity.QAEntity("收不到短信验证码？", "请检查手机网络并且核实手机是否屏蔽系统短信，如均正常请重新获取或稍后再试。");
      // 邮箱验证按钮点击
      const emailFunc = () => {

      }
      // 弹框验证码得到焦点
      const phoneVerifyCodeFocus = () => {
        verifyLeftDivClass.value['verify-left-div-focus'] = true;
      }
      // 弹框验证码失去焦点
      const phoneVerifyCodeBlur = () => {
        verifyLeftDivClass.value['verify-left-div-focus'] = false;
      }
      // 弹框中点击下一步
      const clickDialogNextStep = () => {
        showHint.value = true;

        // 验证码正确，关闭弹框，跳转到第二部
        showHint.value = false;
        dialogVisible.value = false;
        stepStatus.value = 2;
      }

      // 步骤2
      let newPassword = ref('');
      // 密码框
      let pwdRef = ref(null);
      // 眼睛icon
      let eyeRef = ref(null);
      // 设置密码的提示信息
      let pwdHint = ref(HintEntity.PASSWORD_HINT_4);
      // 密码是否符合正则
      let pwdSure = ref(false);
      // 点击切换显示隐藏面膜
      const switchShowPwd = () => {
        let type = (pwdRef.value as any).getAttribute("type");
        if (type === 'text') {
          (pwdRef.value as any).setAttribute("type", "password");
          // 修改眼睛为睁眼
          (eyeRef.value as any).className="iconfont icon-icon-test icon-eye";
        } else {
          (pwdRef.value as any).setAttribute("type", "text");
          // 修改眼睛为闭眼
          (eyeRef.value as any).className="iconfont icon-biyan icon-eye";
        }
      }
      // 监视密码
      watch(newPassword, (cur, old) => {
        Validate.validatePassword(cur, passwordCallback)
      })
      const passwordCallback = (e:Error) => {
        if (e) {
          let msg = e.message;
          // 数量不够
          if (msg === HintEntity.PASSWORD_HINT_0.info) {
            pwdHint.value = HintEntity.PASSWORD_HINT_01;
            pwdSure.value = false;
          } else if (msg === HintEntity.PASSWORD_HINT_1.info) {
            pwdHint.value = HintEntity.PASSWORD_HINT_1;
            pwdSure.value = true;
          } else if (msg === HintEntity.PASSWORD_HINT_3.info) {
            pwdHint.value = HintEntity.PASSWORD_HINT_3;
            pwdSure.value = true;
          } else if (msg === HintEntity.PASSWORD_HINT_2.info) {
            pwdHint.value = HintEntity.PASSWORD_HINT_2;
            pwdSure.value = true;
          }
        }
      }

      // 提交密码
      const clickSubmitBtn = () => {
        stepStatus.value = 3;
      }
      // 第三步
      // 去登录
      const clickGoLogin = () => {
        window.location.href = "/login.html";
      }

      // 监视当前的状态
      watch(stepStatus, (cur, pre) => {
        console.log(cur, pre)
        switch (cur) {
          case 1:
            break;
          case 2:
            step2Style.value = {color:'#0c8'};
            circle2.value = {"background-color": '#0c8', color:'#fff'};
            outer2.value = {"background-color":'#0c8'};
            break;
          case 3:
            step3Style.value = {color:'#0c8'};
            circle3.value = {"background-color": '#0c8', color:'#fff'};
            outer3.value = {"background-color":'#0c8'};
            break;
          default:

            break
        }
      })



      return {
        stepStatus,
        step1Style,
        circle1,
        outer1,
        step2Style,
        circle2,
        outer2,
        step3Style,
        circle3,
        outer3,
        emailFunc,
        verifyLeftDivClass,
        phoneVerifyCodeFocus,
        phoneVerifyCodeBlur,
        phoneVerifyCode,
        showHint,
        hint,
        dialogQA,
        dialogVisible,
        clickDialogNextStep,
        pwdRef,
        eyeRef,
        newPassword,
        switchShowPwd,
        pwdHint,
        pwdSure,
        clickSubmitBtn,
        clickGoLogin,
      }
    }
  })
</script>
<style>
  #body{
    height: 670px !important;
  }
</style>
<style lang='less' scoped>
  /*@import url('~@/assets/less/globalVariable.less');*/
  #body-info{
    width: 100%;
    height: 100%;
    position: relative;
    .head{
      width: 427px;
      height: 56px;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 45px;
      display: flex;
      justify-content:space-between;
      .step{
        width: 56px;
        height: 66px;
        z-index: 1;
        position: relative;
        color: #666;
        .circle{
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: #d8dcdd;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          text-align: center;
          line-height: 34px;
          font-size: 12px;
        }
        .outer{
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 42px;
          height: 42px;
          background-color: #d8dcdd;
          border-radius: 50%;
          opacity: .1;
        }
        .txt{
          position: absolute;
          font-size: 14px;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          top: 45px;
          text-align: center;
        }
      }
      .line{
        position: absolute;
        width: 162px;
        height: 7px;
        background-color: #D8DCDD;
        margin-top: 14px;
      }
      div:nth-child(2){
        left: 40px;
      }
      div:nth-child(4){
        left: 230px;
      }
    }
    .step-1-body{
      width: 402px;
      height: 218px;
      top: 160px;
      position: relative;
      margin: auto;
      display: flex;
      flex-direction: column;
      img{
        margin: 0 auto;
        margin-bottom: 30px;
      }
      p{
        margin: 0 auto 20px;
        font: 14px/22px Microsoft YaHei;
        color: #666;
      }
      button{
        height: 50px;
        padding: 1px 6px;
        border: 1px solid #ccc;
        background-color:#fff;
        margin-bottom: 20px;
        color: #333;
        font-size: 18px;
        &:hover{
          cursor: pointer;
          border-color: #666;
        }
      }
    }
    .step-2-body{
      width: 400px;
      height: 218px;
      top: 160px;
      position: relative;
      margin: auto;
      display: flex;
      flex-direction: column;
      p{
        font: 700 16px/30px Microsoft YaHei;
        color: #666;
        margin-bottom: 15px;
      }
      .password-div{
        width: 100%;
        height: 50px;
        border: 1px solid #ddd;
        position: relative;
        input{
          position: relative;
          border: 0;
          font-size: 14px;
          width: 306px;
          height: 20px;
          line-height: 20px;
          padding: 15px 0 15px 15px;
          text-align: left;
          background: transparent;
          font-family: Microsoft YaHei;
        }
        em{
          width: 20px;
          height: 20px;
          font-weight: 600;
          font-size: 20px;
          color: #b0b0b0;
          position: absolute;
          margin: auto;
          top: 0;
          bottom: 0;
          cursor: pointer;
          &[class*=icon-fork]{
            right: 45px;
          }
          &[class*=icon-eye]{
            right: 12px;
          }
        }
      }
      .hint{
        width: 100%;
        height: 19px;
        margin-top: 5px;
        margin-bottom: 15px;
      }
      .submit-div{
        width: 100%;
        height: 50px;
        margin-top: 10px;
        button{
          width: 100%;
          height: 100%;
          border: none;
          background-color: #e2231a;
          color: #fff;
          cursor: pointer;
        }
        button[disabled] {
          cursor: not-allowed;
          opacity: .5;
        }
      }
    }
    .step-3-body{
      width: 400px;
      height: 178px;
      top: 160px;
      position: relative;
      margin: auto;
      display: flex;
      flex-direction: column;
      .header{
        width: 80px;
        height: 80px;
        margin: auto;
        margin-bottom: 5px;
        em{
          font-size: 80px;
          line-height: 80px;
          color: #3b4;
        }
      }
      p{
        margin: 0 auto 20px;
        font: 14px/22px Microsoft YaHei;
        color: #666;
      }
      .submit-div{
        width: 100%;
        height: 52px;
        position: relative;
        button{
          width: 334px;
          height: 100%;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          border: none;
          background-color: #e2231a;
          color: #fff;
          cursor: pointer;
          line-height: 52px;
          font-size: 14px;
          text-align: center;
          &:hover{
            background-color: #c81623;
          }
        }
      }
    }
  }
  /*弹框样式*/
  .el-dialog__body{
     .content{
       width: 402px;
       box-sizing: border-box;
       position: relative;
       margin: auto;
       /*height: 600px;*/
       .header{
         width: 100%;
         height: 90px;
         text-align: center;
         margin: 45px 0 15px 0;
         font: 700 16px/30px Microsoft YaHei;
         .icon{
           width: 50px;
           height: 50px;
           border-radius: 50%;
           background-color: #ccc;
           color: #fff;
           margin: auto;
           line-height: 50px;
           margin-bottom: 10px;
           em{
             font-size: 30px;
           }
         }
       }
       .body{
         .phone-p{
           font: 12px/18px Microsoft YaHei;
           margin-bottom: 20px;
         }
         .verify-div{
           width: 100%;
           height: 52px;
           display: flex;
           .verify-left-div{
             width: 193px;
             height: 50px;
             position: relative;
             border: 1px solid #ddd;
             input{
               position: relative;
               border: 0;
               font-size: 14px;
               z-index: 2;
               width: 144px;
               height: 20px;
               line-height: 20px;
               padding: 15px 0 15px 15px;
               text-align: left;
               background: transparent;
               font-family: Microsoft YaHei;
             }
             em {
               position: absolute;
               margin: auto;
               top: 0;
               bottom: 0;
               right: 12px;
               width: 20px;
               height: 20px;
               line-height: 20px;
               font-size: 20px;
               cursor: pointer;
             }
           }
           /*左侧输入框得到焦点，div更改样式*/
           .verify-left-div-focus {
             border: 1px solid #666;
           }
           .verify-right-div{
             margin-left: 10px;
             width: 192px;
             height: 52px;
             display: flex;
             font-size: 12px;
             box-sizing: border-box;
             div{
               border: unset;
               top: 0;
               height: 52px;
               line-height: 52px;
               overflow: hidden;
               transition: width .1s linear;
               text-align: center;
             }
             button{
               background-color: #fff;
               border: none;
               overflow: hidden;
               white-space: nowrap;
               cursor: pointer;
               span{
                 margin: 0 10px;
               }
             }
             .message-div {
               width: 150px;
               border: 1px solid #ddd;
               .message-button{
                  width: 100%;
                  height: 100%;
               }
               &:hover{
                 border: 1px solid #666;
               }
             }
             .voice-div {
               width: 46px;
               border-top: 1px solid #ddd;
               border-right: 1px solid #ddd;
               border-bottom: 1px solid #ddd;
               .voice-button{
                 width: 100%;
                 height: 100%;
                 font-size: 12px;
                 span{
                   font-size: 12px;
                   margin: 0 10px;
                 }
               }
               &:hover{
                 border: 1px solid #666;
               }
             }
           }
         }
         .hint{
           width: 100%;
           height: 16px;
           margin: 5px 0 18px 0;
         }
         .next-step-div{
           width: 100%;
           height: 50px;
           margin-bottom: 27px;
           button{
             width: 100%;
             height: 100%;
             background-color: #e2231a;
             color: #fff;
             border: unset;
             cursor: pointer;
             &:hover{
               background-color: #c81623;
             }
           }
           button[disabled]{
             opacity: .5;
             cursor: not-allowed;
             &:hover{
               background-color: #e2231a;
             }
           }
         }
       }
       .fotter{
         margin-bottom: 90px;
       }
     }
  }
</style>
