<!--秒杀栏-->
<template>
  <div class="sec-kill-container">

    <div class="sec-kill-main">
      <div class="left">
        <a class="left-a" href="#">
          <p class="title1">狗东秒杀</p>
          <p class="title2">
            <strong class="title-hour">{{secKillTime.stage}}:00</strong> 点场 距结束
          </p>
          <p class="title3">
            <span class="hour">{{secKillTime.hour}}</span>
            <span class="minute">{{secKillTime.minute}}</span>
            <span class="second">{{secKillTime.second}}</span>
          </p>
        </a>
      </div>
      <div class="center index-sec-kill-center">
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
      <div :class="sidebarClass">
        <a href="#" class="item">京东秒杀</a>
        <a href="#" class="item img">
          <img class="one" src="@/assets/imgs/sidebar1.gif"/>
          <img class="two" src="@/assets/imgs/sidebar2.jpg"/>
        </a>
        <a href="#" class="item">特色优选</a>
        <a href="#" class="item">频道广场</a>
        <a href="#" class="item">为你推荐</a>
        <a href="#" class="item"><span class="iconfont icon-jingdongkefu"></span><br/>客服</a>
        <a href="#" class="item"><span class="iconfont icon-bianji1"></span><br/>反馈</a>
        <a href="javascript:void(0)" @click.prevent="goToTop" class="item top">
          <span class="iconfont icon-arrow-up"></span><br/>顶部
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, computed, toRaw } from 'vue';
import IndexStore from '@/store/IndexStore';

import moment from 'moment';
import SecKillCommodity from '@/pojo/SecKillCommodity';


export default defineComponent({
  setup() {
    /* 走马灯 */
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
    const secKillTime = reactive({
      stage: '00',
      hour: '00',
      minute: '00',
      second: '00',
    });
    // 右侧的侧边栏的class
    let sidebarClass =  IndexStore.getters.sidebarClass;
    /**
     * 初始化时间
     */
    const init = () => {
      // 当前时
      const nowHour = Number(moment().format('H'));
      let killHour = 0;
      if (nowHour % 2 === 0) {
        killHour = nowHour;
      } else {
        killHour = nowHour === 23 ? 22 : nowHour - 1;
      }

      // 当前时间
      const killTime = moment().hour(killHour + 2).minute(0).second(0);
      const killHours = killTime.diff(moment(), 'hours');
      const killMinutes = killTime.diff(moment(), 'minutes') % 60;
      const killSeconds = killTime.diff(moment(), 'seconds') % 60;
      secKillTime.hour = killHours < 10 ? `0${killHours}` : String(killHours);
      secKillTime.minute = killMinutes < 10 ? `0${killMinutes}` : String(killMinutes);
      secKillTime.second = killSeconds < 10 ? `0${killSeconds}` : String(killSeconds);


      secKillTime.stage = killHour < 10 ? `0${killHour}` : String(killHour);
    };

    /**
     * 定时器修改活动倒计时
     */
    const secKillInterval = () => {
      setInterval(() => {
        const second = Number(secKillTime.second);
        secKillTime.second = (second - 1) < 10 ? `0${second - 1}` : String(second - 1);
        if (second < 1) {
          init();
        }
      }, 1000);
    };

    const ScrollTop = (number = 0, time?: number) => {
      if (!time) {
        document.body.scrollTop = document.documentElement.scrollTop = number;
        return number;
      }
      const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
      let spacingInex = time / spacingTime; // 计算循环的次数
      let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
      let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
      let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
          spacingInex--;
          ScrollTop(nowTop += everTop);
        } else {
          clearInterval(scrollTimer); // 清除计时器
        }
      }, spacingTime);
    };

    const goToTop = () => {
      ScrollTop(0, 500);
    }

    onMounted(() => {
      init();
      secKillInterval();
    });
    // 计算属性
    const sidebarClassComputed = computed(() => {
      return IndexStore.getters.sidebarClass;
    })
    watch(sidebarClassComputed, (now, old) => {
      sidebarClass.value = toRaw(sidebarClassComputed.value)
    });
    return {
      arr,
      secKillTime,
      sidebarClass,
      goToTop,
    };
  },
});
</script>
<style lang="less">
  .index-sec-kill-center{
    .el-carousel__indicators{
      .el-carousel__indicator--horizontal{
        display: none;
      }
    }
  }
</style>
<style lang="less" scoped>
  .sec-kill-container{
    width: 100%;
    height: 260px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: -230px;
    .sec-kill-main{
      width: @index-main-width;
      height: 260px;
      background-color: #fff;
      display: flex;
      position: relative;
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
      .sidebar{
        width: 58px;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: 615px;
        z-index: 100;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        box-sizing: content-box;
        .item{
          width: 38px;
          height: 40px;
          display: block;
          padding: 10px;
          font-size: 14px;
          text-align: center;
          transition: background .2s ease;
          position: relative;
          &:hover{
            background-color: #c81623;
            color: #fff !important;
            z-index: 2;
            &::after{
              content: "";
              background: rgba(0,0,0,0)
            }
          }
          &::after{
            position: absolute;
            display: inline-block;
            width: 40px;
            height: 1px;
            left: 50%;
            bottom: 0;
            margin-left: -20px;
            transition: background .2s ease;
            background: #ece9e9;
            /*background: linear-gradient(*/
            /*  270deg*/
            /*  ,white,#ece9e9,#ece9e9,white);*/
            content: "";
          }
        }

        .top{
          color: #e1251b;
          display: none;
          &:hover{
            color: #fff;
          }
          &::after{
            content: "";
            height: 0;
          }
        }
        .item:nth-child(7)::after{
          height: 0px;
          content: "";
        }
        .img{
          width: 58px;
          height: 58px;
          padding: 0;
          img{
            width: 58px;
            height: 58px;
          }
          &:hover{
            .one{
              display: none;
            }
            .two{
              display: block;
            }
          }
          .two{
            display: none;
          }

        }
      }
      .fixed {
        position: fixed;
        top: 80px;
        .top{
          display: unset;
        }
        .item:nth-child(7)::after{
          height: 1px;
          content: "";
        }
      }
    }
  }
</style>
