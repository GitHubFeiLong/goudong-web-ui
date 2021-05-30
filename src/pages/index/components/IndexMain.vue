<!--首页主要分类和走马灯-->
<template>
  <div class="container">
    <div class="main">
      <IndexMainLeft/>
      <IndexMainCenter/>
      <IndexMainRight/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IndexMainLeft from './IndexMainLeft.vue';
import IndexMainCenter from './IndexMainCenter.vue';
import IndexMainRight from './IndexMainRight.vue';

export default defineComponent({
  components: {
    IndexMainLeft,
    IndexMainCenter,
    IndexMainRight,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="less" scoped>
  .container{
    width: 100%;
    height: 480px;
    padding-top: 10px;
    background-color: #f4f4f4;
    background-image: url('~@/assets/imgs/index-main1.png');
    background-repeat: no-repeat;
    background-position: top;
    background-position-y: 10px;
    margin-bottom: 20px;
    .main{
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: @index-main-width;
      display: flex;
      z-index: 10;
    }
  }
</style>
