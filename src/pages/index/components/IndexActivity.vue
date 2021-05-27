<!--顶部活动信息-->
<template>
  <div class="outer" v-if="show">
    <div class="inner">
      <span class="iconfont icon-fork" @click="show=false"></span>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(true);
    return {
      show,
    };
  },
});
</script>

<style lang="less" scoped>
  .outer {
    width: 100%;
    height: 80px;
    background-color: #03cfcc;

    .inner {
      width: @index-main-width;
      height: 100%;
      margin: 0 auto;
      background-image: url('~@/assets/imgs/activity1.jpg');
      position: relative;
      .icon-fork {
        position: absolute;
        right: 0;
        top: 5px;
        background-color: rgba(0,0,0,.2);
        color: rgba(255,255,255,.6);
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }

</style>
