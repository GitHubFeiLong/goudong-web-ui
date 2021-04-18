<!--邮箱弹窗-->
<template>
  <div class="email-pop-up"></div>
</template>
<script lang='ts'>
  import { defineComponent, ref, onMounted, watch } from 'vue'
  // 提示信息
  export default defineComponent ({
    components:{
    },
    setup (props, content) {

      onMounted(()=>{
        // 遮罩组件显示

      });
      return {

      }
    }
  })
</script>
<style lang='less' scoped>
  .email-pop-up{
    width: 500px;
    height: 600px;
    background-color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border: 1px solid;
    margin: auto;
    z-index: 11;
  }
</style>
