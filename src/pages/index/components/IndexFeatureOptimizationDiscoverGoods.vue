<!--特色优选 之 第二行 发现好物-->
<template>
  <div class="discover-goods-container">
    <div class="discover-goods-main">
      <div class="left-div">
        <a href="#" class="left-a">
          <img class="img" src="@/assets/imgs/discover-goods-2.png"/>
         <span class="title">探索新生活
          <em class="img-em"></em>
         </span>
        </a>
      </div>
      <div class="right-div" @mouseover="stop" @mouseleave="move">
        <div class="box-div" :style="boxDivStyle">
          <div
            v-for="(item, index) in discoverGoods"
            :key="item"
            :class="{'item-div':true,'item-top-div': index%2==0, 'item-bottom-div':index%2==1}"
            :style="index<5 ? top5ItemStyle : otherItemStyle"
            :ref="index==0 ? itemRef0:itemRef1"
          >
            <a href="#" :class="{'item-a':true, 'item-top-a': index%2==0, 'item-bottom-a':index%2==1}">
              <img class="item-title-img" :src="item.picture"/>
              <span class="item-title-span">{{item.title}}</span>
            </a>
          </div>
        </div>
        <div class="scroll-bar">
          <div class="sliding-block"
               :style="slidingBlockStyle"
               @mousedown="slidingBlock.onmousedown($event)"
               ref="slidingBlockRef"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, onMounted, ref, reactive, watch} from 'vue';

  import Commodity from "@/pojo/Commodity";
  export default defineComponent({
    setup() {

      let itemRef0 = ref(null);
      let itemRef1 = ref(null);


      let discoverGoods:Array<Commodity> = [
        new Commodity("", "索尼 主动降噪 真无线蓝牙耳机", -1, -1, require('@/assets/imgs/discover-goods-3.jpg')),
        new Commodity("", "索尼 新一代PS5 游戏主机套装", -1, -1, require('@/assets/imgs/discover-goods-4.jpg')),
        new Commodity("", "耐克 气垫缓震 跑步鞋", -1, -1, require('@/assets/imgs/discover-goods-5.jpg')),
        new Commodity("", "诗毅 家用 茶杯", -1, -1, require('@/assets/imgs/discover-goods-6.jpg')),
        new Commodity("", "茅台 生肖 纪念酒", -1, -1, require('@/assets/imgs/discover-goods-7.jpg')),
        new Commodity("", "华硕 吃鸡电竞游戏 独立显卡", -1, -1, require('@/assets/imgs/discover-goods-8.jpg')),
        new Commodity("", "耐克 樱花粉 运动篮球鞋", -1, -1, require('@/assets/imgs/discover-goods-9.jpg')),
        new Commodity("", "华为 Mate40Pro 5G手机", -1, -1, require('@/assets/imgs/discover-goods-10.jpg')),
        new Commodity("", "孩之宝 航行家级 变形金刚", -1, -1, require('@/assets/imgs/discover-goods-11.jpg')),
        new Commodity("", "雅培 全面营养 婴幼儿奶粉", -1, -1, require('@/assets/imgs/discover-goods-12.jpg')),

        new Commodity("", "索尼 主动降噪 真无线蓝牙耳机", -1, -1, require('@/assets/imgs/discover-goods-3.jpg')),
        new Commodity("", "索尼 新一代PS5 游戏主机套装", -1, -1, require('@/assets/imgs/discover-goods-4.jpg')),
        new Commodity("", "耐克 气垫缓震 跑步鞋", -1, -1, require('@/assets/imgs/discover-goods-5.jpg')),
        new Commodity("", "诗毅 家用 茶杯", -1, -1, require('@/assets/imgs/discover-goods-6.jpg')),
        new Commodity("", "茅台 生肖 纪念酒", -1, -1, require('@/assets/imgs/discover-goods-7.jpg')),
        new Commodity("", "华硕 吃鸡电竞游戏 独立显卡", -1, -1, require('@/assets/imgs/discover-goods-8.jpg')),
        new Commodity("", "耐克 樱花粉 运动篮球鞋", -1, -1, require('@/assets/imgs/discover-goods-9.jpg')),
        new Commodity("", "华为 Mate40Pro 5G手机", -1, -1, require('@/assets/imgs/discover-goods-10.jpg')),
        new Commodity("", "孩之宝 航行家级 变形金刚", -1, -1, require('@/assets/imgs/discover-goods-11.jpg')),
        new Commodity("", "雅培 全面营养 婴幼儿奶粉", -1, -1, require('@/assets/imgs/discover-goods-12.jpg')),
      ];
      let top5ItemStyle = ref<string>("transform:translateX(0px)");
      let otherItemStyle = ref<string>("transform:translateX(0px)");
      let boxDivStyle = ref<string>("transform:translateX(0px)");
      let slidingBlockStyle = ref<string>("transform:translateX(0px)");
      let val = ref(0);
      let val2 = ref(0);
      let intervalId:any = '';
      const move = () => {
        if(slidingBlock.isMouseUp){
          intervalId = setInterval(()=>{
            val.value = val.value - 1;
            val2.value = val2.value + 0.861;
          }, 10);
        }
      };

      watch(val, (v1,v2)=>{
        boxDivStyle.value = `transform:translateX(${val.value}px)`;
        // 前5个已经隐藏了
        // if (val.value <= -1000 && val.value >= -1001) {
        //   // 移动+2000
        //   console.log("移动位置")
        //   top5ItemStyle.value = `transform:translateX(2000px)`;
        // }
        // if (val.value <= -2000) {
        //   otherItemStyle.value = `transform:translateX(2000px)`;
        //   // 完成一次完整的
        //   val.value = 0;
        //   boxDivStyle.value = `transform:translateX(${val.value}px)`;
        //   top5ItemStyle.value = `transform:translateX(0px)`;
        //   otherItemStyle.value = `transform:translateX(0px)`;
        // }

        if (val.value <= -2000 && val.value >= -2002) {
          // 移动+2000
          console.log("移动位置")
          top5ItemStyle.value = `transform:translateX(2000px)`;
        }
        if (val.value <= -2000) {
          otherItemStyle.value = `transform:translateX(2000px)`;
          // 完成一次完整的
          val.value = 0;
          boxDivStyle.value = `transform:translateX(${val.value}px)`;
          top5ItemStyle.value = `transform:translateX(0px)`;
          otherItemStyle.value = `transform:translateX(0px)`;
        }
      });
      // 控制开关
      let bool : boolean = false;
      watch(val2, (v1, v2)=>{
        if (val2.value < 0) {
          val2.value = 0;
        } else if (val2.value > 861) {
          val2.value = 0;
          bool=!bool;
          val.value = bool ? -1000 : -2000;
        }
        slidingBlockStyle.value = `transform:translateX(${val2.value}px)`;
      })
      const stop = () => {
        clearInterval(intervalId);
      }

      onMounted(()=>{
        move();
        // setInterval(()=>{
        //   (itemRef0.value as any).style.transform = "translateX(-50px)";
        // }, 1000)

      });

      let slidingBlockRef = ref(null);
      let slidingBlock = reactive<any>({
        isMouseUp: true,

        // 鼠标按下事件
        onmousedown : (e: any) => {
          console.log("按下");
          slidingBlock.isMouseUp = false;

          let rawX : number = e.clientX;
          let nowX : number = 0;
          let moveX : number = 0;
          let transformStr:string = (slidingBlockRef.value as any).style.transform
          if (transformStr.indexOf("translateX") == -1) {
            console.error("获取滑块的属性style中不存在translateX属性");
            return false;
          }
          let translateX : number = Number(transformStr.substring(11, transformStr.indexOf("px")));
          console.log(translateX);
          stop();
          // 移动
          document.onmousemove = (e1) => {
            if (!slidingBlock.isMouseUp) {
            // if (false) {
              nowX = e1.clientX;
              moveX = nowX - rawX;
              val2.value = translateX + moveX;
              val.value = val2.value*0.861*-1;
              if (val2.value < 0) {
                val2.value = 0;
                val.value = val.value + translateX;
                translateX = 0;
              } else if (val2.value > 861) {
                val2.value = 0;
                val.value = val.value + 861 - translateX;
                translateX = 0;
              }
            }
          };
          // 松手
          document.onmouseup = (e2) => {
            if (!slidingBlock.isMouseUp) {
              slidingBlock.isMouseUp = true;
              console.log("松手" + val2.value);
            }
            // move();
          };
        },
      })


      return {
        discoverGoods,
        boxDivStyle,
        top5ItemStyle,
        otherItemStyle,
        slidingBlockStyle,
        move,
        stop,
        slidingBlock,
        slidingBlockRef,
        itemRef0,
        itemRef1,
      }
    }
  });
</script>

<style lang="less" scoped>
  .discover-goods-container {
    width: 100%;
    height: 260px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .discover-goods-main {
      width: @index-main-width;
      background-color: #f4f4f4;
      display: flex;
      .left-div {
        width: 190px;
        height: 260px;
        margin-right: 10px;
        .left-a {
          display: block;
          width: 100%;
          height: 100%;
          background-image: url("~@/assets/imgs/discover-goods-1.png");
          position: relative;
          .img{
            width: 160px;
            height: 90px;
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            margin: 15px auto 0;
          }
          .title{
            font-size: 16px;
            color: rgba(255,255,255,.8);
            display: block;
            position: absolute;
            width: 100%;
            margin: 70px 0px 0px 35px;
            .img-em::after{
              content: "";
              width: 16px;
              height: 16px;
              display: inline-block;
              position: relative;
              left: 3px;
              top: 2px;
              background-position: 0 -16px;
              background-image: url("~@/assets/imgs/sprite.png");
            }
          }
          &:hover{
            .title{
              .img-em::after{
                background-position: 0 0;
              }
            }
          }
        }
      }
      .right-div{
        width: 990px;
        height: 100%;
        background-color: #fff;
        overflow: hidden;
        position: relative;
        .box-div{
          display: flex;
          .item-div{
            width: 150px;
            height: 181px;
            position: relative;
            margin-right: 50px;
            .item-a{
              display: block;
              .item-title-img{
                width: 150px;
                height: 150px;
                display: block;
              }
              .item-title-span{
                display: block;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                color: #333;
                text-align: center;
                font-size: 14px;
                height: 21px;
                line-height: 21px;
              }
              &:hover{
                .item-title-span{
                  color: #e1251b;
                }
                .item-title-img{
                  opacity: .7;
                }
              }
            }
          }
          .item-top-div{
            margin-top: 20px;
            position: relative;
            display: block;
            .item-a{
              .item-title-span{
                margin-top: 10px;
              }
            }
          }
          .item-bottom-div{
            margin-top: 50px;
            position: relative;
            display: block;
            .item-a{
              .item-title-img{
                margin-top: 31px;
              }
              .item-title-span{
                margin-top: -181px;
              }
            }
          }
        }
        .scroll-bar{
          width: calc(100% - 30px);
          position: absolute;
          left: 15px;
          bottom: 10px;
          height: 3px;
          border-radius: 3px;
          background-color: #f3f3f3;
          opacity: 0;
          transition: opacity .3s ease;
          .sliding-block{
            height: 9px;
            width: 99px;
            background: #d8d8d8;
            position: absolute;
            top: 50%;
            margin-top: -4.5px;
            border-radius: 4px;
            transform: translateX(0px);
          }
        }
        &:hover{
          .scroll-bar{
            opacity: 1;
          }
        }
      }
    }
  }
</style>
