<!--特色优选 之 第三行-->
<template>
  <div class="three-container">
    <div class="three-main">
      <div class="item">
        <IndexDivTitle :title="newProduct.title"/>
        <el-carousel :interval="4000" type="card" height="250px" class="three-new-product">
          <el-carousel-item v-for="item in newProduct.products" :key="item">
            <img class="item-img" :src="item.picture"/>
            <div class="item-div">
              <span class="span1">{{item.title}}</span>
              <!--              <span class="span2">来这里发现更多商品</span>-->
              <!--              <span class="span3"><em>￥</em>{{item.price}}起</span>-->
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onMounted, ref, reactive, watch} from 'vue';
  import IndexDivTitle from "@/components/IndexDivTitle.vue";

  import Commodity from "@/pojo/Commodity";
  export default defineComponent({
    components:{
      IndexDivTitle,
    },
    setup() {
      // 新品首发
      let newProduct = reactive<any>({
          title: '新品首发',
          products: [
            new Commodity("","松下（Panasonic）电动剃须刀刮胡刀进口机身ES-ST3Q-K 来这里发现更多新品 399.00元起",399.00,399.00, require("@/assets/imgs/newProduct1.jpg")),
            new Commodity("","戴森(Dyson) 吸尘器 V11 Fluffy Extra 手持吸尘器家用除螨无线宠物家庭适用 来这里发现更多新品 4990.00元起",4990.00,4990.00, require("@/assets/imgs/newProduct2.jpg")),
            new Commodity("","Y-3 KAIWA 新配色签名款y3男女同款休闲鞋橘色31EH1395 橘色 UK9   43  1/3 来这里发现更多新品 4490.00元起",4490.00,4490.00, require("@/assets/imgs/newProduct3.jpg")),
            new Commodity("","美的（Midea）16升双增压零冷水燃气热水器天然气 自动变升磁化净水智能家电APP控制节能JSQ30-JM9 以旧换新 来这里发现更多新品 2399.00元起",2399.00,2399.00, require("@/assets/imgs/newProduct4.jpg")),
          ],
      })
      return {
        newProduct,
      }
    }
  });
</script>

<style lang="less">
  .three-new-product{
    .el-carousel__container{
      .el-carousel__item{
        /*display: none;*/
        z-index:5;
        .item-img{
          width: 104px !important;
          height: 104px !important;
        }
        .item-div{

        }
      }
      .el-carousel__item[class*=is-in-stage]{
       display: unset;
      }
      .el-carousel__item[class*=is-active]{
        display: unset;
        z-index:10;
        .item-img{
          width: 130px !important;
          height: 130px !important;
        }
        .item-div{
        }
      }
    }
  }
</style>
<style lang="less" scoped>
  .three-container{
    width: 100%;
    height:340px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .three-main{
      width: @index-main-width;
      height: 100%;
      background-color: #f4f4f4;
      display: flex;
      border: 1px solid;
      .item{
        width: 290px;
        height: 100%;
        margin-right: 10px;
        background-color: #fff;
        z-index:20;

      }
      .item:nth-child(1){
        background-image: url("~@/assets/imgs/bd1.png");
        background-size: 100%;
        background-repeat: no-repeat;
        .item-img{
          width: 104px;
          height: 104px;
          display: block;
          position: absolute;
          left: 0;
          right: 0;
          top: 10px;
          margin: auto;
        }
        span{
          display: block;
        }
        .span1{
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 20px 0 4px;
          font-size: 14px;
          line-height: 19px;
          transition: color .2s ease;
          color: #333;
        }
        .span2{
          width: 200px;
          font-size: 12px;
          text-align: center;
        }
        .span3{

        }
      }
      .item:nth-child(2){
        background-color: red;
      }
      .item:nth-child(3){
        background-color: red;
      }
      .item:nth-child(4){
        margin-right: unset;
        background-color: red;
      }
    }
  }
</style>
