<!--搜索-->
<template>
  <div class="header">
    <div class="main">
      <!--logo-->
      <a class="logo-a">
        <img class="logo" src="~@/assets/imgs/logo1.gif" alt="logo"/>
      </a>
      <!--搜索框-->
      <div class="search-div">
        <div class="div-input">
          <input class="search-input" type="text" placeholder="笔记本电脑">
          <span class="iconfont icon-camera"></span>
          <div class="btn">
            <span class="iconfont icon-sousuo"></span>
          </div>
        </div>
        <div class="gwc">
          <el-badge :value="12" class="item">
            <span class="iconfont icon-gouwuche"></span>
          </el-badge>
          <a href="#" class="txt">我的购物车</a>
        </div>
      </div>
      <!--小标签-->
      <div class="little-title">
        <ul>
          <li><a href="#">生鲜五折购</a></li>
          <li><a href="#">尾款免息</a></li>
          <li><a href="#">路由器</a></li>
          <li><a href="#">智能数码</a></li>
          <li><a href="#">智能数码</a></li>
          <li><a href="#">京造618</a></li>
          <li><a href="#">好物1元</a></li>
          <li><a href="#">家装建材</a></li>
          <li><a href="#">低至9.9</a></li>
          <li><a href="#">生鲜5折</a></li>
        </ul>
      </div>
      <!--大标签-->
      <div class="big-title">
        <ul>
          <li><a href="#">秒杀</a></li>
          <li><a href="#">优惠卷</a></li>
          <li><a href="#">PLUS会员</a></li>
          <li><a href="#">品牌闪购</a></li>
          <li><a href="#">拍卖</a></li>
          <li><a href="#">京东家电</a></li>
          <li><a href="#">京东超市</a></li>
          <li><a href="#">京东生鲜</a></li>
          <li><a href="#">京东国际</a></li>
          <li><a href="#">京东云</a></li>
        </ul>
      </div>
      <!---->
      <a class="right">
        <img class="right-img" src="~@/assets/imgs/search-right1.png" alt="活动"/>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="less">
  .gwc{
    .item{
      .el-badge__content--primary{
        background-color:#e1251b;
      }
    }
  }
</style>

<style lang="less" scoped>
  a{
    color: @a-link-color-01;
  }
  .header{
    background-color: #fff;
    width: 100%;
    height: 140px;
    position: relative;
    border-bottom: 1px solid #ddd;
    /*z-index: 10;*/
    .main{
      width: @index-main-width;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      z-index: 10;
      .logo-a{
        display: block;
        width: 190px;
        height: 120px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        background: rgb(255, 255, 255);
        z-index: 5;
        .logo{
          display: block;
          height: 120px;
          margin: 0px auto;
          width: 100%;
        }
      }
      .search-div{
        width: @index-main-width;
        height: 61px;
        position: relative;
        z-index: 0;
        .div-input{
          width: 546px;
          height: 32px;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0px;
          margin-left: 260px;
          border: 2px solid #e2231a;
          position: absolute;
          .search-input{
            left: 0;
            padding: 2px 44px 2px 17px;
            width: 425px;
            height: 26px;
            border: 1px solid transparent;
            line-height: 26px;
            font-size: 12px;
          }
          .icon-camera{
            position: absolute;
            line-height: 33px;
            font-size: 20px;
            margin-left: -35px;
            cursor: pointer;
            font-weight: bolder;
            color: #999;
            &:hover{
              color: @a-hover-color-01;
            }
          }
          .btn{
            width: 58px;
            height: 32px;
            background-color: #e1251b;
            position: absolute;
            cursor: pointer;
            display: inline-block;
            .icon-sousuo{
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              margin: auto;
              width: 21px;
              height: 21px;
              font-weight: 700;
              font-size: 17px;
              line-height: 21px;
              text-align: center;
              color: #fff;
            }
            &:hover{
              background-color: #c81623;
            }
          }
        }
        .gwc{
          width: 130px;
          height: 34px;
          display: inline-block;
          position: absolute;
          border-color: #eee;
          border: 1px solid #e3e4e5;
          bottom: 0;
          right: 230px;
          .item{
            top: 0;
            bottom: 0;
            margin: auto 0;
            left: 16px;
            height: 16px;
            .icon-gouwuche{
              font-size: 16px;
              font-weight: bold;
              color: #e1251b;
            }
          }
          .txt{
            position: absolute;
            color: @a-hover-color-01;
            line-height: 34px;
            right: 20px;
            top: 0;
            bottom: 0;
            margin: auto 0;
            height: 20px;
            font: 12px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;;
          }
          &:hover{
            border: 1px solid #c81623;
          }
        }

      }
      .little-title{
        margin-left: 260px;
        color:#999;
        font: 12px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
        ul{
          li{
            padding: 0;
            margin-left: 10px;
          }
          li:first-child{
            margin-left: 0 !important;
            a{
              color: @a-hover-color-01 !important;
            }
          }

        }
      }
      .big-title{
        width: 746px;
        height: 40px;
        line-height: 40px;
        position: absolute;
        bottom: 0px;
        margin-left: 210px;
        font-size: 15px;
        margin-left: 210px;
        ul{
          li{
            padding: 0;
            margin: 0 11px;
            a{
              color: #333;
              transition: color .2s ease;
            }
            &:nth-child(1),&:nth-child(2){
              a{
                color:@a-hover-color-01;
              }
              font-weight: bold;
            }
          }
        }
      }
      .right{
        position: absolute;
        width: 190px;
        height: 120px;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        .right-img{
          width: 100%;
        }
      }
    }
  }
</style>
