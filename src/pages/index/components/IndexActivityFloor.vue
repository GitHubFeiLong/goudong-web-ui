<!--秒杀栏下面的活动-->
<template>
  <div class="activity-floor-container">
    <div class="activity-floor-main">
      <a class="top-a" href="#"></a>
      <div class="body">
        <div class="left">
          <a href="#" v-for="item in leftArr" :key="item" class="item">
            <img :src="item.picture" class="img"/>
            <p class="title">{{item.title}}</p>
            <p class="type">{{item.type}}</p>
          </a>
        </div>
        <div class="right">
          <a class="item" href="#" v-for="item in rightArr" :key="item">
            <img :src="item"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ActivityFloorCommodity from '@/pojo/ActivityFloorCommodity';

export default defineComponent({
  setup() {
    const leftArr = [
      new ActivityFloorCommodity('', '专享不止5折', '企业超省月', require('@/assets/imgs/activity-floor1.jpg')),
      new ActivityFloorCommodity('', '全场至高省1500', '新潮手机榜', require('@/assets/imgs/activity-floor2.jpg')),
      new ActivityFloorCommodity('', '生鲜5折购', '京东生鲜', require('@/assets/imgs/activity-floor3.jpg')),
      new ActivityFloorCommodity('', '付定膨胀100倍', '京东健康', require('@/assets/imgs/activity-floor4.jpg')),
      new ActivityFloorCommodity('', '美满200减30', '冰箱洗衣机', require('@/assets/imgs/activity-floor5.jpg')),
      new ActivityFloorCommodity('', '低至5折', '奢品钟表', require('@/assets/imgs/activity-floor6.jpg')),
      new ActivityFloorCommodity('', '攒机配置折上折', '电脑配件', require('@/assets/imgs/activity-floor7.jpg')),
      new ActivityFloorCommodity('', '相机12期免息', '值能数码', require('@/assets/imgs/activity-floor8.jpg')),
      new ActivityFloorCommodity('', '美满200减30', '全民运动会', require('@/assets/imgs/activity-floor9.jpg')),
      new ActivityFloorCommodity('', '美满200减30', '潮流时尚', require('@/assets/imgs/activity-floor10.jpg')),
    ];
    const rightArr = [
      require('@/assets/imgs/activity-floor-little1.jpg'),
      require('@/assets/imgs/activity-floor-little2.jpg'),
      require('@/assets/imgs/activity-floor-little3.jpg'),
      require('@/assets/imgs/activity-floor-little4.jpg'),
    ];
    return {
      leftArr,
      rightArr,
    };
  },
});
</script>
<style lang="less" scoped>
  .activity-floor-container{
    width: 100%;
    height: 555px;
    display: flex;
    justify-content: center;
    .activity-floor-main{
      width: 1270px;
      height: 555px;
      background-image: url('~@/assets/imgs/activity-floor-bg1.jpg');
      background-repeat: no-repeat;
      background-position: top;
      position: relative;
      .top-a {
        width: 1190px;
        height: 100px;
        display: block;
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: 10px;
      }
      .body{
        height: 440px;
        display: flex;
        position: absolute;
        margin-left: 40px;
        bottom: 0;
        .left{
          width: 1000px;
          height: 440px;
          display: flex;
          flex-wrap: wrap;
          .item{
            width: 190px;
            height: 210px;
            background-color: #fff;
            position: relative;
            display: flex;
            flex-direction: column;
            margin-right: 10px;
            .img{
              width: 130px;
              height: 130px;
              margin: 5px auto;
            }
            .title{
              background-image: url('~@/assets/imgs/activity-floor-little-bg1.jpg');
              background-repeat: no-repeat;
              width: 174px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              color: #fff;
              font-weight: 700;
              position: relative;
              margin: 5px auto;
              z-index:10;
            }
            .type{
              width: 190px;
              height: 50px;
              font-size: 16px;
              color: #de452b;
              text-align: center;
              position: absolute;
              bottom: 0;
              background-color: #ffe8bc;
              line-height: 60px;
              font-weight: 700;
              z-index: 5;
            }
          }
        }
        .right{
          width: 190px;
          height: 440px;
          display: flex;
          flex-direction: column;
          .item{
            width: 190px;
            height: 100px;
            display: block;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>
