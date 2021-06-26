<!--div 左上角的title-->
<template>
  <a href="#" class="no-hover a-title">
    {{title}}
    <em class="img-em"></em>
  </a>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    export default defineComponent({
      props:{
        title: String,
      },
      setup(){
        return{

        }
      }
    })
</script>

<style scoped lang="less">
  .a-title{
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    line-height: 60px;
    font-weight: 700;
    font-size: 24px;
    color: #333;
    .img-em::after{
      content: "";
      width: 16px;
      height: 16px;
      display: inline-block;
      position: relative;
      left: 3px;
      background-position: -16px 0;
      background-image: url("~@/assets/imgs/sprite.png");
    }
    &:hover{
      .img-em::after{
        background-position: 0 0;
      }
    }
  }
</style>
