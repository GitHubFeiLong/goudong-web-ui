<template>
  <div class="main-container">
    <div class="left">
      <el-carousel height="470px" class="left-carousel">
        <el-carousel-item v-for="item in mainArr" :key="item.uuid">
          <a href="#">
            <img :src="item.name" />
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="right">
      <el-carousel height="470px" class="right-carousel">
        <el-carousel-item v-for="item in assistantArr" :key="item.uuid">
          <a href="#" v-for="s in item" :key="s.uuid">
            <img class="img" :src="s.name" />
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Type from "@/pojo/Type";

export default defineComponent({
  setup() {
    const mainArr = [
      new Type('', require('@/assets/imgs/carousel-main1.jpg')),
      new Type('', require('@/assets/imgs/carousel-main2.jpg')),
      new Type('', require('@/assets/imgs/carousel-main3.jpg')),
      new Type('', require('@/assets/imgs/carousel-main4.jpg')),
      new Type('', require('@/assets/imgs/carousel-main5.jpg')),
      new Type('', require('@/assets/imgs/carousel-main6.jpg')),
      new Type('', require('@/assets/imgs/carousel-main7.jpg')),
      new Type('', require('@/assets/imgs/carousel-main8.jpg')),
    ];

    const assistantArr = [
      [
        new Type('', require('@/assets/imgs/f-carousel1.png')),
        new Type('', require('@/assets/imgs/f-carousel2.png')),
        new Type('', require('@/assets/imgs/f-carousel3.png')),
      ],
      [
        new Type('', require('@/assets/imgs/f-carousel4.png')),
        new Type('', require('@/assets/imgs/f-carousel5.png')),
        new Type('', require('@/assets/imgs/f-carousel6.png')),
      ],
      [
        new Type('', require('@/assets/imgs/f-carousel7.png')),
        new Type('', require('@/assets/imgs/f-carousel8.png')),
        new Type('', require('@/assets/imgs/f-carousel9.png')),
      ],
    ];
    return {
      mainArr,
      assistantArr,
    };
  },
});
</script>

<style lang="less">
  .left-carousel{
    .el-carousel__indicator--horizontal{
      padding: 0 3px;
    }
  }
  .right-carousel{
    .el-carousel__indicator--horizontal{
      display: none;
    }
    .el-carousel__container{

    }
  }
</style>

<style lang="less" scoped>
  .main-container{
    width: 790px;
    height: 470px;
    margin-left: 10px;
    position: relative;
    z-index:5;
    .left{
      width: 590px;
      height: 470px;
      position: absolute;
    }
    .right{
      width: 190px;
      height: 470px;
      margin-left: 10px;
      position: absolute;
      right: 0;
      .el-carousel__item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      a{
        width: auto;
        height: 150px;
        img{
          width: 190px;
          height: 150px;
        }
      }
    }
  }
</style>
