<!--每日特价组件-->
<template>
  <div class="day-special-price-container">
    <div class="one-container">

    </div>
    <div class="two-container">

    </div>
    <div class="three-container">

    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    setup(){
      return {

      }
    }
  })
</script>

<style scoped lang="less">
  .day-special-price-container{
    width:100%;
    height: 980px;
    display: flex;
    justify-content: center;
    .one-container{
      width: 1190px;
      height: 340px;
      margin-top: 20px;
    }
  }
</style>
