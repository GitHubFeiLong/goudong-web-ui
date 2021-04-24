<!--提示信息-->
<template>
  <div id="body-foot">
    <div class="item">
      <p class="q">如何修改手机号？</p>
      <p class="a">如您手机号已不再使用，可点击“<a href="#" class="alink">修改关联手机号</a>”，身份认证通过后，您可按照页面提示更换账号关联手机；</p>
    </div>
    <div class="item">
      <p class="q">为什么要进行身份认证？</p>
      <p class="a">如账号信息被不法分子恶意窃取进行非法操作时，通过身份认证工具可有效阻止不法行为，最大力度保障您的账号安全；</p>
    </div>
    <div class="item">
      <p class="q">以上未解决您的问题？</p>
      <p class="a">您可通过点击<a href="#" class="alink">联系客服</a>解决您的问题</p>
    </div>
  </div>
</template>
<script lang='ts'>
  import { defineComponent, ref, onMounted, watch } from 'vue'
  export default defineComponent ({
    components:{
    },
    setup (props, content) {
      return {
      }
    }
  })
</script>

<style lang='less' scoped>
  #body-foot{
    width: 700px;
    height: 210px;
    margin: auto;
    font-size: 13px;
    font-family: "Microsoft YaHei", "Hiragino Sans GB";
    color: #666;
    position: relative;
    margin-top: 200px;
    .item{
      margin-bottom: 30px;
      .q:before{
        content: "";
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
        background-image: url("~@/assets/imgs/qa-q.png");
      }
      .q{
        padding-left: 23px;
        margin-bottom: 8px;
      }
      .a:before{
        content: "";
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
        background-image: url("~@/assets/imgs/qa-a.png");
      }
      .a{
        padding-left: 23px;
      }
      .alink {
        color: #007edf;
        text-decoration: none;
        cursor: pointer;
        &:hover{
          color:#f30213;
        }
      }
    }

  }
</style>
