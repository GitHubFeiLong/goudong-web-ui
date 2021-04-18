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
    <div class="step-1-body">
      <img src="~@/assets/imgs/auth-ico.png">
      <p>为确认是您本人操作，请选择以下任一方式完成身份认证</p>
      <button @click="emailFunc">使用 邮箱验证码</button>
    </div>
    <EmailPopUp/>
    <BodyFoot/>
  </div>
</template>
<script lang='ts'>
  import { defineComponent, ref, onMounted, watch, inject } from 'vue'

  // 按钮点击邮箱验证弹框
  import EmailPopUp from "@/pages/forgotPwd/components/EmailPopUp.vue";
  // 提示信息
  import BodyFoot from "@/pages/forgotPwd/components/BodyFoot.vue";
  export default defineComponent ({
    components:{
      BodyFoot,
      EmailPopUp,
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

      // 邮箱验证按钮点击
      const emailFunc = () => {

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
  }
</style>
