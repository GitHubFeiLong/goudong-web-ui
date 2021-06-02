<!--搜索-->
<template>
  <div class="header">
    <div class="main">
      <!--logo-->
      <a href="#" class="logo-a">
        <img class="logo" src="~@/assets/imgs/logo1.gif" alt="logo"/>
      </a>
      <!--小标签-->
      <div class="little-title">
        <ul>
          <li><a href="#">{{randomObj.littleTitle}}</a></li>
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
    <!--搜索框-->
    <div :class="searchClass">
      <div class="one-div">
        <div class="div-input">
          <input class="search-input" type="text" :placeholder="randomObj.searchInputPlaceHolder">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch, computed, toRaw } from 'vue';
import IndexStore from "@/store/IndexStore";

export default defineComponent({
  setup() {
    const searchInputPlaceHolderRandomArr = [
      '电脑数码预售尾款至高24期免息',
      '京东图书超级品类日,5折叠每满200减30',
      '格兰杜微波炉',
      '格力变频空调',
      '签字笔',
    ];
    const littleTitleRandomArr = [
      '生鲜五折购',
      '低至9块9',
      '抢健康好物',
      '图书品类日',
    ];
    const randomObj = reactive({
      searchInputPlaceHolder: searchInputPlaceHolderRandomArr[0],
      littleTitle: littleTitleRandomArr[0],
    });
    // 搜索栏class对象
    let searchClass =  IndexStore.getters.searchClass;

    // 计算属性
    const searchClassComputed = computed(() => {
      return IndexStore.getters.sidebarClass;
    })
    watch(searchClassComputed, (now, old) => {
      searchClass.value = toRaw(searchClassComputed.value)
    });

    onMounted(() => {
      // 定时器，随机修改randomObj
      setInterval(() => {
        randomObj.searchInputPlaceHolder = searchInputPlaceHolderRandomArr[Math.floor(Math.random() * searchInputPlaceHolderRandomArr.length)];
        randomObj.littleTitle = littleTitleRandomArr[Math.floor(Math.random() * littleTitleRandomArr.length)];
      }, 5000);
    });
    return {
      randomObj,
      searchClass,
    };
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

      .little-title{
        margin-left: 260px;
        color:#999;
        font: 12px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
        margin-top: 60px;
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
    .search{
      position: relative;
      width: 800px;
      margin: auto;
      z-index: 50;
      .one-div{
        height: 0px;
        transition: .2s height;
        position: relative;
        top: 60px;
        .div-input{
          width: 546px;
          height: 32px;
          bottom: 0px;
          border: 2px solid #e2231a;
          position: absolute;
          left: 50%;
          margin-left: -335px;
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
          left: 50%;
          margin-left: 233px;
          bottom: 0;
          .item{
            top: 5px;
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
    }
    // 搜索栏 跟随滚动条修改样式
    .search[class~='fixed']{
      width: 100%;
      position: fixed;
      top: 0;
      z-index:50;
      .one-div{
        top: 0;
        height: 52px;
        border-bottom: 2px solid #f10214;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, .3);
        background-color: #fff;
        .gwc,.div-input {
          bottom: 6px !important;
        }
      }

    }
  }
</style>
