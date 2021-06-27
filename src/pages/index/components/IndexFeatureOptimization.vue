<!--特色优选-->
<template>
  <div class="day-special-price-container">
    <div class="one-container">
      <div class="day-special-price one-son-div">
        <div class="box-hd">
          <IndexDivTitle :title="daySpecialPrice.daySpecialPriceTitle"/>
          <ul class="title-ul">
            <li v-for="(item, index) in daySpecialPrice.daySpecialPriceTitleArrays"
                :key="item.title"
                :class="{'title-li':true, 'title-active-li': item.active}"
            >
              <a href="#" class="title-a"
                 @mouseover="daySpecialPrice.daySpecialPriceTitleMouseOver(index)"
              >{{item.title}}
                <div class="title-bottom-div"></div>
              </a>
            </li>
          </ul>
        </div>
        <div class="box-bd">
          <div
            v-for="(item, index) in daySpecialPrice.daySpecialPriceCommodities"
            :key="item"
            :class="{'item-div':true}"
          >
            <a class="item-a" href="#">
              <span class="item-span" v-show="item.minimumPriceDays != ''">{{item.minimumPriceDays}}最低价</span>
              <img :src="item.picture" class="item-img" alt="商品"/>
              <div class="info-div">
                <span class="span1">{{item.title}}</span>
                <p>
                  <span class="span2"><span class="unit-span">￥</span>{{item.price}}</span>
                  <span class="span3">￥{{item.originalPrice}}</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="brand-buy one-son-div">
        <div class="box-hd">
          <IndexDivTitle :title="brandBuy.brandBuyTitle"/>
        </div>
        <div class="box-bd">
          <div v-for="(item, index) in brandBuy.brandBuyArrays" :key="item" :class="{'first-item':index==0, 'item':true,'item-other': index > 0}">
            <a href="#" class="item-a">
              <span class="span1" v-if="index==0">{{item.title}}</span>
              <span class="span2">{{item.brandSpecial}}</span>
              <span class="span3" v-if="index==0">{{item.discountInfo}}</span>
              <img :src="item.picture"/>
            </a>
          </div>
        </div>
      </div>
    </div>
    <IndexFeatureOptimizationDiscoverGoods/>
    <div class="three-container">

    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onMounted, reactive} from 'vue';
  import IndexDivTitle from "@/components/IndexDivTitle.vue";
  import IndexFeatureOptimizationDiscoverGoods from "@/pages/index/components/IndexFeatureOptimizationDiscoverGoods.vue";

  import DaySpecialPrice from "@/pojo/DaySpecialPrice";
  import DiscountCommodity from "@/pojo/DiscountCommodity";

  export default defineComponent({
    components:{
      IndexDivTitle,
      IndexFeatureOptimizationDiscoverGoods,
    },
    setup(){
      // 每日特价对象
      let daySpecialPrice = reactive<any>({
        // 标题
        daySpecialPriceTitle : "每日特价",
        // 标题类型数组
        daySpecialPriceTitleArrays :[
          {title : '精选', active : true, commodities : [
            new DaySpecialPrice("","香之渝香菇卤肉味煲仔饭250g*1", require('@/assets/imgs/day-choiceness-1.jpg'),9.9,19.9,"151天"),
            new DaySpecialPrice("","迷你电脑机箱上置电源台式", require('@/assets/imgs/day-choiceness-2.jpg'),42.9,69.5,"277天"),
            new DaySpecialPrice("","雅百达 无线蓝牙耳机跑步运动双耳迷你入耳式适用小米华为vivo苹果oppo安卓苹果通用 旗舰版【配套充电线+保护袋】", require('@/assets/imgs/day-choiceness-3.jpg'),29.9,49.9,"312天"),
            new DaySpecialPrice("","夏季新款短袖套装男", require('@/assets/imgs/day-choiceness-4.jpg'),49,128,"45天"),
            new DaySpecialPrice("","短袖+长裤两件套套装男", require('@/assets/imgs/day-choiceness-5.jpg'),69.9,128,"39天"),
            ]
          },
          {title:'美食', active:false, commodities : [
              new DaySpecialPrice("","乱劈才冲泡米饭速食食", require('@/assets/imgs/day-fine-food-1.jpg'),6.8,19.9,"339天"),
              new DaySpecialPrice("","珠韵苕茶福鼎白茶100克", require('@/assets/imgs/day-fine-food-2.jpg'),67.8,121,"1年"),
              new DaySpecialPrice("","麻辣兔腿开袋即食*2只（120g）", require('@/assets/imgs/day-fine-food-3.jpg'),19.9,29.9,""),
              new DaySpecialPrice("","三明治面包整箱肉松夹心蒸蛋糕", require('@/assets/imgs/day-fine-food-4.jpg'),23,36.5,"222天"),
              new DaySpecialPrice("","抢！！【89元3份】香辣小龙虾", require('@/assets/imgs/day-fine-food-5.jpg'),58,88,"40天"),
            ]
          },
          {title:'百货', active:false, commodities : [
              new DaySpecialPrice("","欢适舒弹抱枕高精密提花靠垫", require('@/assets/imgs/day-sears-1.jpg'),49,75,"1年"),
              new DaySpecialPrice("","美珑美利 德国钢材和羽冻肉刀", require('@/assets/imgs/day-sears-2.jpg'),78.9,149,"225天"),
              new DaySpecialPrice("","大号1.5cm*14盘中国结", require('@/assets/imgs/day-sears-3.jpg'),46.8,78,"1年"),
              new DaySpecialPrice("","不粘锅炒锅麦饭石少油烟炒菜锅", require('@/assets/imgs/day-sears-4.jpg'),59,139.9,"1年"),
              new DaySpecialPrice("","拜格厨房不锈钢菜刀女士刀", require('@/assets/imgs/day-sears-5.jpg'),12.9,39,"56天"),
            ]
          },
          {title:'个护', active:false, commodities : [
              new DaySpecialPrice("","口腔溃疡喷雾喷剂", require('@/assets/imgs/day-personal-care-1.jpg'), 25.8, 39.9, "1年"),
              new DaySpecialPrice("","美乳霜产后修复女性下垂乳房", require('@/assets/imgs/day-personal-care-2.jpg'),61,88,"61天"),
              new DaySpecialPrice("","蜕皮款「5袋」莹润牛奶护足膜", require('@/assets/imgs/day-personal-care-3.jpg'),34,49,"273天"),
              new DaySpecialPrice("","老北京足贴50片装 祛湿助眠", require('@/assets/imgs/day-personal-care-4.jpg'),19.9,29.9,"185天"),
              new DaySpecialPrice("","小苍兰护发精油两瓶装", require('@/assets/imgs/day-personal-care-5.jpg'),29,69,"1年"),
            ]
          },
          {title:'预告', active:false, commodities : [
              new DaySpecialPrice("","南极人童装女童外套2021新款", require('@/assets/imgs/day-foreshow-1.jpg'), 59, 138, ""),
              new DaySpecialPrice("","南京桂花风味盐水鸭1kg整只装", require('@/assets/imgs/day-foreshow-2.jpg'),39.8,69,""),
              new DaySpecialPrice("","抢！！【89元3份】香辣小龙虾", require('@/assets/imgs/day-foreshow-3.jpg'),58,88,""),
              new DaySpecialPrice("","智能运动手环血压心率监测防水", require('@/assets/imgs/day-foreshow-4.jpg'),99,258,""),
              new DaySpecialPrice("","LUPHIE 车载出风口旋转香氛", require('@/assets/imgs/day-foreshow-5.jpg'),33.6,48,""),
            ]
          },
        ],
        // 当前类型商品数组
        daySpecialPriceCommodities : [],
        // 标题类型鼠标移入事件
        daySpecialPriceTitleMouseOver:(index:number)=>{
          daySpecialPrice.daySpecialPriceTitleArrays.forEach((item:any, idx:number)=>{
            item.active = false;
            if (index === idx) {
              item.active = true;
            }
          });

          daySpecialPrice.daySpecialPriceCommodities = daySpecialPrice.daySpecialPriceTitleArrays[index].commodities;
        },
      });

      // 品牌闪购
      let brandBuy = reactive<any>({
        brandBuyTitle : "品牌闪购",
        brandBuyArrays : [
          new DiscountCommodity('', '梦花园',  require('@/assets/imgs/brand-buy-1.jpg'), '全场九折起 | 仅剩 2 天', 2, '梦花园户外专场'),
          new DiscountCommodity('', '',  require('@/assets/imgs/brand-buy-2.jpg'), '全场低至9折', -1, 'keep瑜伽闪购专场'),
          new DiscountCommodity('', '',  require('@/assets/imgs/brand-buy-3.jpg'), '爆品直降1000元', -1, '苏泊尔品牌特惠'),
          new DiscountCommodity('', '',  require('@/assets/imgs/brand-buy-4.jpg'), '夏爆款39元起', -1, '迪士尼童装'),
          new DiscountCommodity('', '',  require('@/assets/imgs/brand-buy-5.jpg'), '24小时限时底价', -1, '金帅品牌闪购专场'),
          new DiscountCommodity('', '',  require('@/assets/imgs/brand-buy-6.jpg'), '最高直降500元', -1, '海康威视闪购专场'),
          new DiscountCommodity('', '',  require('@/assets/imgs/brand-buy-7.jpg'), '低至5折', -1, '小米闪购专场'),
        ],
      });

      onMounted(()=>{
        daySpecialPrice.daySpecialPriceCommodities = daySpecialPrice.daySpecialPriceTitleArrays[0].commodities;
      })
      return {
        daySpecialPrice,
        brandBuy,
      }
    }
  })
</script>
<style scoped lang="less">
  .day-special-price-container{
    width:100%;
    height: 980px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .one-container{
      width: @index-main-width;
      height: 340px;
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      .one-son-div{
        width: 590px;
        height: 340px;
        background-color: #fff;
      }
      .day-special-price{
        margin-right: 10px;
        .box-hd{
          height: 60px;
          box-sizing: border-box;
          position: relative;
          .title-ul{
            position: absolute;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            top: 0;
            bottom: 0;
            right: 20px;
            margin: auto;
            .title-li{
              line-height: 19px;
              padding: 0 13.5px;
              .title-a{
                color:#999 !important;
              }
              .title-bottom-div{
                height: 2px;
                background-color: #e1251b;
                display: none;
              }
            }
            .title-active-li{
              .title-a{
                color: #e1251b !important;
              }
              .title-bottom-div{
                display: block;
              }
            }
          }
        }
        .box-bd{
          height: 270px;
          padding: 0 15px 15px 15px;
          .item-div:first-of-type{
            width: 170px;
            height: 265px;
            margin: 0 6px 0 0;
            background-color: #f8f8f9;
            .item-a{
              .item-span{
                top: 0;
                position: unset;
                width: 90px;
                height: 24px;
                font-weight: 700;
                font-size: 12px;
                line-height: 24px;
                font-weight: 700;
                font-family: MicrosoftYaHei-Bold,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                background-image: linear-gradient(170deg, #f6b73d 50%, #f7a400 50%);
              }
              .item-img{
                width: 120px;
                height: 120px;
                margin: 18px auto 0 auto;
                display: block;

              }
              .info-div{
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                width: 100%;
                .span1{
                  text-align: center;
                  width: 150px;
                  height: 19px;
                  line-height: 19px;
                  font-size: 14px;
                  display: inline-block;
                  margin: 9px 0 4px;
                  overflow: hidden;
                }
                p{
                  .span2{
                    line-height: 16px;
                    font-family: Arial-BoldMT,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                    color: #e1251b;
                    letter-spacing: 0;
                    margin-top: 5px;
                    font-weight: 700;
                    font-size: 18px;
                    display: inline-block;
                    .unit-span{
                      font-size: 12px;
                    }
                  }
                  .span3{
                    text-decoration: line-through;
                    font-family: sans-serif,serif;
                    color: #999;
                    font-size: 12px;
                    line-height: 14px;
                    margin: 0 2px;
                  }
                }
              }
            }
          }
          .item-div{
            width: 170px;
            height: 89px;
            display: inline-block;
            float: left;
            margin: 18px 0px 30px 19px;
            .item-a{
              width: 100%;
              display: block;
              height: 84px;
              position: relative;
              .item-span{
                display: inline-block;
                text-align: center;
                color: #fff;
                background-color: rgba(0,0,0,.6);
                height: 16px;
                width: 84px;
                font-size: 11px;
                color: #fff;
                overflow: hidden;
                text-align: center;
                position: absolute;
                top: 68px;
                z-index: 10;
              }
              .item-img{
                width: 84px;
                height: 84px;
                display: inline-block;
              }
              .info-div{
                position: relative;
                float: right;
                width: 75px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                margin-left: 6px;
                .span1{
                  text-align: left;
                  display: inline-block;
                  width: 100%;
                  color: #333;
                  height: 32px;
                  font-size: 12px;
                  line-height: 16px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  word-break: break-all;
                  font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                }
                p{
                  .span2{
                    display: block;
                    font-size: 14px;
                    line-height: 16px;
                    font-family: Arial-BoldMT,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
                    color: #e1251b;
                    letter-spacing: 0;
                    margin-top: 5px;
                    font-weight: 700;
                  }
                  .span3{
                    display: inline-block;
                    text-decoration: line-through;
                    font-family: sans-serif,serif;
                    color: #999;
                    font-size: 12px;
                    line-height: 14px;
                    -webkit-transform: scale(.8);
                    -ms-transform: scale(.8);
                    transform: scale(.8);
                    margin-top: 2px;
                    -webkit-transform-origin: top left;
                    -ms-transform-origin: top left;
                    transform-origin: top left;
                  }
                }
              }
              &:hover{
                .item-img{
                  opacity: .7;
                }
                .info-div{
                  .span1{
                    color: #c81623;
                  }
                }
              }
            }

          }
        }
      }
      .brand-buy{
        .box-hd{
          height: 60px;
        }
        .box-bd{
          position: relative;
          margin-left: 15px;
          margin-top: -38px;
          .item{
            width: 135px;
            height: 72px;
            padding: 14px 0;
            float: left;
            .item-a{
              display: block;
              width: 100%;
              height: 100%;
              position: relative;
              span{
                display: block;
                text-align: center;
                font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
              }
              &:hover{
                opacity: .7;
              }
            }
          }
          .first-item {
            margin-top: 38px;
            width: 270px;
            height: 265px;
            background-color: #fbf7f7;
            padding: unset;
            margin-right: 15px;
            .item-a{
              .span1{
                color: #000;
                font-size: 20px;
                font-weight: 600;
                letter-spacing: 1px;
                margin-top:17px;
              }
              .span2{
                color: #333;
                font-weight: 700;
                font-size: 16px;
                margin-top: 13px;
              }
              .span3{
                text-align: center;
                font-size: 12px;
                color: #666;
                margin-bottom: 13px;
                margin-top: 4px;
              }
              img{
                width: 130px;
                height: 130px;
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
              }
            }
          }
          .item-other{
            .item-a{
              .span2{
                color: #666;
                font-size: 12px;
                text-align: center;
                font-weight: 400;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
              }
              img{
                width: 100px;
                height: 50px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                margin: auto;
              }
            }
          }
        }
      }
    }
  }
</style>
