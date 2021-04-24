<!--提示信息-->
<template>
  <div id="body-foot">
    <div class="item">
      <p class="q">{{qa.q}}</p>
      <p class="a">{{qa.a}}</p>
    </div>
  </div>
</template>
<script lang='ts'>
  import { defineComponent, ref, onMounted, watch } from 'vue'
  import * as QAEntity from '@/pojo/QAEntity';
  export default defineComponent ({
    props:{
      qa:QAEntity.QAEntity,
    },
    components:{
    },
    setup (props, content) {

      return {

      }
    }
  })
</script>

<style lang='less' scoped>
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
</style>
