<template>
  <div id="body-info">
    <div id="username-div">
      <input v-model="username" type="text"  placeholder="请输入用户名/邮箱/已验证手机号"  autocomplete="off" maxlength="20">
      <span class='clean-icon normal-icon' v-show="username.length>0" @click="username=''"></span>
      <Hint :hint="hintUsername" v-show="hintUsernameShow"/>
    </div>
    <!--滑块验证-->
    <PuzzleVerify v-if="showPuzzle" @successPuzzle="successPuzzle" @closePuzzle="closePuzzle"/>
    <div id="puzzle-btn" @click="puzzleFunc" :style="puzzleBtnStyle"><span :class="fontClass"></span>{{puzzleBtnVal}}</div>
    <div id="next-step" @mouseenter="stepMouseEnter" @mouseleave="stepMouseLeave" @click="clickNextStep" :style="stepStyle">下一步</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue';
import PuzzleVerify from '@/components/PuzzleVerify.vue';

import * as HintEntity from '@/pojo/HintEntity';
import ForgotPwdStore from '@/store/ForgotPwdStore';
import { getUserByLoginNameApi } from '@/api/Oauth2Api';
import Hint from './Hint.vue';

export default defineComponent({
  components: {
    Hint,
    PuzzleVerify,
  },
  setup(props, context) {
    // 用户名
    const username = ref('');
    // 用户名输入框的提示信息
    const hintUsername = ref(HintEntity.USERNAME_HINT_2);
    // 是否显示用户名输入框的提示信息
    const hintUsernameShow = ref(false);
    // 按钮的文字
    const puzzleBtnVal = ref('点击进行验证');
    // 按钮的字体
    const fontClass = ref(['iconfont', 'icon-dianji']);
    // 文字的颜色
    const puzzleBtnStyle = ref({ color: '#999' });
    // 滑块验证是否正确
    const puzzleSure = ref(false);
    // 是否显示滑块验证
    const showPuzzle = ref(false);
    // 下一步的样式
    const stepStyle = ref({ 'background-color': '#e48b91', cursor: 'no-drop' });
    // 绑定事件监听，父子组件通信
    const successPuzzle = () => {
      if (username.value.length > 0) {
        puzzleSure.value = true;
        // 延迟关闭滑块验证码
        setTimeout(() => {
          showPuzzle.value = false;
        }, 1000);
        hintUsernameShow.value = false;
        puzzleBtnVal.value = '认证成功';
        fontClass.value = ['iconfont', 'icon-Success-Small'];
        puzzleBtnStyle.value = { color: '#0c8' };
        stepStyle.value = { 'background-color': '#e2231a', cursor: 'pointer' };
      } else {
        // 修改提示
        hintUsernameShow.value = true;
        hintUsername.value = HintEntity.USERNAME_HINT_2;
      }
    };

    // 关闭滑块验证事件监听
    const closePuzzle = () => {
      showPuzzle.value = false;
    };
    // 滑块验证码
    const puzzleFunc = () => {
      console.log('点击按钮');
      if (username.value === '') {
        hintUsernameShow.value = true;
        hintUsername.value = HintEntity.USERNAME_HINT_2;
      } else {
        showPuzzle.value = true;
      }
    };
    // 鼠标移入按钮
    const stepMouseEnter = () => {
      if (puzzleSure.value) {
        stepStyle.value = { 'background-color': '#c81623', cursor: 'pointer' };
      }
    };
    // 鼠标移出按钮
    const stepMouseLeave = () => {
      if (puzzleSure.value) {
        stepStyle.value = { 'background-color': '#e2231a', cursor: 'pointer' };
      }
    };
    // 下一步
    const clickNextStep = () => {
      // 前端检查（用户名和验证）
      if (puzzleSure.value) {
        // 后端检查（用户名是否有效）
        getUserByLoginNameApi(username.value).then((response) => {
          // 触发父组件定义的事件
          ForgotPwdStore.commit('changeAuthorityUser', response.data.data);
          context.emit('step1Complete');
        }).catch((reason) => {
          hintUsernameShow.value = true;
          hintUsername.value = HintEntity.USERNAME_HINT_3;
        });
      }
    };
    // 监视用户名的修改
    watch(username, (cur, pre) => {
      puzzleSure.value = false;
      // 按钮的字体
      puzzleBtnVal.value = '点击进行验证';
      fontClass.value = ['iconfont', 'icon-dianji'];
      puzzleBtnStyle.value = { color: '#999' };
      stepStyle.value = { 'background-color': '#e48b91', cursor: 'no-drop' };
    });
    return {
      username,
      hintUsername,
      hintUsernameShow,
      puzzleBtnVal,
      puzzleBtnStyle,
      fontClass,
      successPuzzle,
      closePuzzle,
      stepMouseEnter,
      stepMouseLeave,
      clickNextStep,
      puzzleFunc,
      showPuzzle,
      stepStyle,
    };
  },
});
</script>

<style>
  #puzzle-warp{
    margin-top:-170px;
  }
</style>
<style lang='less' scoped>
  #body-info{
    width: 400px;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    margin-top: 65px;
    #username-div,#puzzle-div {
      position: relative;
      border: solid 1px #ddd;
      width: 398px;
      height: 50px;
      input{
        width: 280px;
        height: 50px;
        border: 0;
        padding-left: 20px;
        font-size: 14px;
        line-height: 48px;
        font-family: Microsoft YaHei;
        &::-webkit-input-placeholder{
          color: #999;
        }
      }
      &:hover{
        border: 1px solid #666;
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
    }
    #puzzle-btn{
      border: solid 1px #ccc;
      width: 398px;
      height: 48px;
      cursor: pointer;
      text-align: center;
      line-height: 48px;
      font-size: 14px;
      color: #999;
      position: relative;
      background-color: #f3f3f3;
      .iconfont{
        vertical-align: middle;
      }
      .icon-dianji{
        font-size: 22px;
      }
      .icon-Success-Small {
        font-size: 14px;
        margin-right: 7px;
        color:#0c8;
      }
    }
    #next-step{
      border: 0;
      width: 400px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      font-size: 14px;
      font-family: "Microsoft YaHei","Hiragino Sans GB";
    }
  }
</style>
