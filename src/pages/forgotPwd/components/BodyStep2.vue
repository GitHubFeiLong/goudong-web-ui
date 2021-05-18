<!--检查环境-->
<template>
  <div id="body-info">
    <img src="~@/assets/imgs/auth-scan01.png" alt="图片">
    <div class="outer">
        <div class="inner">
          <div :style="style"></div>
          <div :style="style">正在进行账号安全检测...</div>
          <div :style="style">正在进行操作环境检测...</div>
        </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  components: {
  },
  setup(props, content) {
    const style = ref();
    onMounted(() => {
      setTimeout(() => {
        style.value = { transition: '3s linear', transform: 'translateY(-100px)' };
      }, 0);

      setTimeout(() => {
        content.emit('step2Complete');
      }, 4000);
    });
    return {
      style,
    };
  },
});
</script>

<style lang='less' scoped>
  #body-info{
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
    }
    .outer{
      position: absolute;
      text-align: center;
      bottom: 70px;
      left: 0;
      right: 0;
      font-size: 24px;
      color: #999;
      height: 30px;
      overflow: hidden;
      .inner{
        div{
          height: 50px;
        }
      }

    }
  }
</style>
