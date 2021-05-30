<!--秒杀栏-->
<template>
  <div class="sec-kill-container">
    <div class="sec-kill-main">
      <div class="left">
        <a class="left-a" href="#">
          <p class="title1">狗东秒杀</p>
          <p class="title2">
            <strong class="title-hour">16:00</strong> 点场 距结束
          </p>
          <p class="title3">
            <span class="hour">00</span>
            <span class="minute">11</span>
            <span class="second">09</span>
          </p>
        </a>
      </div>
      <div class="center">
        <el-carousel height="260px">
          <el-carousel-item class="item" v-for="item in arr" :key="item">
            <a class="item-a" href="#" v-for="a in item" :key="a">
              <img class="img" :src="a.picture" alt="商品"/>
              <p class="title" :title="a.title">{{a.title}}</p>
              <p class="price">
                <span class="price-left"><span class="symbol">¥ </span>{{a.price}}</span>
                <span class="price-right">¥{{a.price}}</span>
              </p>
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="right">
        <a class="right-a" href="#">
          <img class="img" src="~@/assets/imgs/sec-kill21.jpg" alt=""/>
          <p class="p1">空调换新秒杀</p>
          <p class="p2">低至999</p>
          <p class="p3">
            <button>品类秒杀</button>
          </p>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import SecKillCommodity from '@/pojo/SecKillCommodity';

export default defineComponent({
  setup() {
    const arr = [
      [
        new SecKillCommodity('', '【二手9成新】苹果8Plus手机 Apple iPhone 8Plus 苹果8P 二手手机 深空灰 64G 全网通', require('@/assets/imgs/sec-kill1.jpg'), 1618.00, 1909.00),
        new SecKillCommodity('', 'Move Free益节氨糖维骨力硫酸软骨素加钙片美国进口盐酸氨基葡萄糖骨维力安糖非胶囊保护关节红瓶170', require('@/assets/imgs/sec-kill2.jpg'), 199.00, 229.00),
        new SecKillCommodity('', '5100西藏冰川矿泉水 饮用天然矿泉水1.5升*12瓶整箱 大瓶装水 弱碱性小分子泡茶水', require('@/assets/imgs/sec-kill3.jpg'), 139.00, 199.00),
        new SecKillCommodity('', '乐高(LEGO)积木 悟空小侠齐天大圣黄金机甲10岁+80012 儿童节礼物 儿童玩具 男孩女孩', require('@/assets/imgs/sec-kill4.jpg'), 999.00, 1399.00),
      ],
      [
        new SecKillCommodity('', '宏碁(Acer)墨舞TMX40 14英寸轻薄金属笔记本(i5-1135G7 16G 512GSSD 全高清IPS屏 指纹 Wifi6 闪电快充)', require('@/assets/imgs/sec-kill5.jpg'), 4299.00, 5299.00),
        new SecKillCommodity('', '一加手机OnePlus 8T 5G旗舰 120Hz柔性直屏 65W闪充 高通骁龙865 超清四摄 12GB+256GB 银时 拍照游戏手机', require('@/assets/imgs/sec-kill6.jpg'), 199.00, 229.00),
        new SecKillCommodity('', '5100西藏冰川矿泉水 饮用天然矿泉水1.5升*12瓶整箱 大瓶装水 弱碱性小分子泡茶水', require('@/assets/imgs/sec-kill7.jpg'), 139.00, 199.00),
        new SecKillCommodity('', '乐高(LEGO)积木 悟空小侠齐天大圣黄金机甲10岁+80012 儿童节礼物 儿童玩具 男孩女孩', require('@/assets/imgs/sec-kill8.jpg'), 999.00, 1399.00),
      ],
      [
        new SecKillCommodity('', '【二手9成新】苹果8Plus手机 Apple iPhone 8Plus 苹果8P 二手手机 深空灰 64G 全网通', require('@/assets/imgs/sec-kill9.jpg'), 1618.00, 1909.00),
        new SecKillCommodity('', 'Move Free益节氨糖维骨力硫酸软骨素加钙片美国进口盐酸氨基葡萄糖骨维力安糖非胶囊保护关节红瓶170', require('@/assets/imgs/sec-kill10.jpg'), 199.00, 229.00),
        new SecKillCommodity('', '5100西藏冰川矿泉水 饮用天然矿泉水1.5升*12瓶整箱 大瓶装水 弱碱性小分子泡茶水', require('@/assets/imgs/sec-kill11.jpg'), 139.00, 199.00),
        new SecKillCommodity('', '乐高(LEGO)积木 悟空小侠齐天大圣黄金机甲10岁+80012 儿童节礼物 儿童玩具 男孩女孩', require('@/assets/imgs/sec-kill12.jpg'), 999.00, 1399.00),
      ],
      [
        new SecKillCommodity('', '【二手9成新】苹果8Plus手机 Apple iPhone 8Plus 苹果8P 二手手机 深空灰 64G 全网通', require('@/assets/imgs/sec-kill13.jpg'), 1618.00, 1909.00),
        new SecKillCommodity('', 'Move Free益节氨糖维骨力硫酸软骨素加钙片美国进口盐酸氨基葡萄糖骨维力安糖非胶囊保护关节红瓶170', require('@/assets/imgs/sec-kill14.jpg'), 199.00, 229.00),
        new SecKillCommodity('', '5100西藏冰川矿泉水 饮用天然矿泉水1.5升*12瓶整箱 大瓶装水 弱碱性小分子泡茶水', require('@/assets/imgs/sec-kill15.jpg'), 139.00, 199.00),
        new SecKillCommodity('', '乐高(LEGO)积木 悟空小侠齐天大圣黄金机甲10岁+80012 儿童节礼物 儿童玩具 男孩女孩', require('@/assets/imgs/sec-kill16.jpg'), 999.00, 1399.00),
      ],
      [
        new SecKillCommodity('', '【二手9成新】苹果8Plus手机 Apple iPhone 8Plus 苹果8P 二手手机 深空灰 64G 全网通', require('@/assets/imgs/sec-kill17.jpg'), 1618.00, 1909.00),
        new SecKillCommodity('', 'Move Free益节氨糖维骨力硫酸软骨素加钙片美国进口盐酸氨基葡萄糖骨维力安糖非胶囊保护关节红瓶170', require('@/assets/imgs/sec-kill18.jpg'), 199.00, 229.00),
        new SecKillCommodity('', '5100西藏冰川矿泉水 饮用天然矿泉水1.5升*12瓶整箱 大瓶装水 弱碱性小分子泡茶水', require('@/assets/imgs/sec-kill19.jpg'), 139.00, 199.00),
        new SecKillCommodity('', '乐高(LEGO)积木 悟空小侠齐天大圣黄金机甲10岁+80012 儿童节礼物 儿童玩具 男孩女孩', require('@/assets/imgs/sec-kill20.jpg'), 999.00, 1399.00),
      ],
    ];
    return {
      arr,
    };
  },
});
</script>
<style lang="less" scoped>
  .sec-kill-container{
    width: 100%;
    height: 260px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .sec-kill-main{
      width: @index-main-width;
      height: 260px;
      background-color: #fff;
      display: flex;
      .left{
        width: 190px;
        height: 260px;
        .left-a{
          width: 100%;
          height: 100%;
          display: block;
          background-image: url('~@/assets/imgs/sec-kill.png');
          color: #fff;
          &:hover{
            color: #fff !important;
          }
          .title1{
            font-size: 30px;
            font-weight: 700;
            padding-top: 31px;
            text-align: center;
          }
          .title2{
            width: 100%;
            padding-top: 92px;
            text-align: center;
            font-size: 14px;
            position: relative;
            .title-hour{
              font-size: 18px;
              position: relative;
              top: 2px;
            }
          }
          .title3{
            height: 30px;
            padding: 0 30px;
            margin-top: 14px;
            .hour,.minute, .second{
              dposition: relative;
              float: left;
              width: 30px;
              height: 30px;
              text-align: center;
              background-color: #2f3430;
              margin-right: 20px;
              color: white;
              font-size: 20px;
              line-height: 30px;
            }
            .second{
              margin-right: 0px;
            }
            .hour::after, .minute::after{
              content: ":";
              position: absolute;
              margin-left: 10px;
              font-weight: 600;
            }
          }
        }
      }
      .center{
        width: 800px;
        height: 260px;
        .item{
          width: 800px;
          height: 260px;
          display: flex;
          .item-a{
            width: 200px;
            height: 260px;
            display: inline-block;
            position: relative;
            .img{
              width: 140px;
              height: 140px;
              display: block;
              margin: auto;
              margin-top: 30px;
            }
            .title{
              width: 160px;
              height: 18px;
              margin: 10px auto 0;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 12px;
            }
            .price{
              width: 160px;
              height: 24px;
              box-sizing: border-box;
              line-height: 24px;
              margin: 10px auto;
              border: 1px solid #e1251b;
              position: relative;
              .price-left{
                display: inline-block;
                width: 92px;
                height: 100%;
                background-color: #e1251b;
                text-align: center;
                color: #fff;
                font-size: 16px;
                font-weight: 700;
                .symbol{
                  font-size: 12px;
                  font-weight: 500;
                }
                &::after{
                  content: " ";
                  width: 0;
                  height: 0;
                  border-color: transparent white transparent transparent;
                  border-style: solid;
                  border-width: 22px 8px 0 0;
                  position: absolute;
                  top: 0;
                  left: 84px;
                }
              }
              .price-right{
                width: 66px;
                height: 100%;
                display: inline-block;
                background-color: #fff;
                text-align: center;
                color: #999;
                font-size: 12px;
                text-decoration: line-through;
                vertical-align: top;
              }
            }
            &::after{
              content: "";
              display: block;
              position: absolute;
              top: 50%;
              right: 0;
              width: 1px;
              height: 200px;
              -webkit-transform: translateY(-50%);
              -ms-transform: translateY(-50%);
              transform: translateY(-50%);
              background: -webkit-gradient(linear,left top,left bottom,from(white),color-stop(#eeeeee),to(white));
              background: linear-gradient(
                180deg
                ,white,#eeeeee,white);

            }
          }
        }
      }
      .right{
        width: 190px;
        height: 260px;
        .right-a{
          height: 230px;
          padding: 10px;
          display: block;
          position: relative;
          background: linear-gradient(
            180deg
            ,rgba(255,255,255,.5),rgba(220,224,236,.5));
          .img{
            width: 120px;
            height: 120px;
            display: block;
            margin: auto;
            margin-top: 18px;
          }
          p{
            text-align: center;
            font-size: 14px;
          }
          .p1{
            height: 21px;
            color:#666;
            margin-top: 10px;
          }
          .p2{
            height: 21px;
            color: #333;
            font-weight: 700;
          }
          .p3{
            margin-top: 5px;
            button{
              color: #e1251b;
              width: 82px;
              height: 24px;
              border: 1px solid #e1251b;
              border-radius: 14px;
              background-color: rgba(0,0,0,0);
              font-size: 12px;
              font-weight: 700;
            }
          }

        }
      }
    }
  }
</style>
