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
  import {defineComponent, onMounted} from 'vue'

  export default defineComponent({
    props: {
      username: String,
    },
    setup() {
      const goShopping = () => {
        window.location.href = '/index'
      }
      onMounted(() => {
        setTimeout(goShopping, 5000)
      });
      return {
        goShopping
      }
    }
  })
</script>

<style lang='less' scoped>
  @import url('~@/assets/less/globalVariable.less');
  @import url('~@/assets/fonts/iconfont.css');

  #regist-success {
    width: @regist-inner-main-width;
    height: 230px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

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
