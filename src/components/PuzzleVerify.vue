<template>
  <div id="puzzle-warp">
    <i @click="closeImage" class='puzzle-close'></i>
    <div class='puzzle-header'>
      <span>完成拼图验证</span>
      <a @click.prevent="changeImage" href="javascript::"><span
        class='iconfont icon-refresh'></span>&nbsp;换一张</a>
    </div>
    <div class='puzzle-body'>
      <div id="shade" ref="SHADE"></div>
      <canvas height="50" ref="CONVAS" width="50"></canvas>
      <img :src="bodyImage" height="100%" ref="IMAGE" width="100%">
    </div>
    <div class='puzzle-footer' ref="FOOTER">
      <div id='after-status' ref="STATUS"></div>
      <!--圆按钮-->
      <div @mousedown="onmousedown($event)" class="puzzle-circle" id="puzzle-circle" ref="CIRCLE">
        <span class="iconfont icon-arrow-right"></span>
      </div>
      <div id="statusTxt" ref="STATUSTXT">{{statusTxt}}</div>
    </div>
    <i class='puzzle-arrows'></i>
  </div>

</template>

<script lang='ts'>
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';

declare let $: (selector: string) => any;
export default defineComponent({
  setup(props, context) {
    // 图片image
    const IMAGE = ref(null);
    // 滑块的圆
    const CIRCLE = ref(null);
    // 长条
    const FOOTER = ref(null);
    // convas
    const CONVAS = ref(null);
    // 阴影
    const SHADE = ref(null);
    // 状态栏
    const STATUS = ref(null);
    // 文字div
    const STATUSTXT = ref(null);

    // bi
    const statusTxt = ref('向右滑动完成拼图');

    // 滑块圆的总宽
    const CIRCLE_WIDTH = 52;
    // 长条的总宽
    const FOOTER_WIDTH = 364;

    const bodyImage = ref(require('@/assets/imgs/puzzle-verify.png')); // 成功 不报错 require('~');
    const puzzImgs = [
      require('@/assets/imgs/puzzle-verify.png'),
      require('@/assets/imgs/puzzle-verify2.png'),

    ];

    const isMouseUp = ref(true);
    const isMouseDown = ref(false);
    // 鼠标移动距离
    let moveX = 0;
    // 需要移动的距离
    let needX = 0;

    // 滑块元素的X
    let circleX = 0;
    // 滑块元素的Y
    let circleY = 0;
    // 滚动的长条
    let footerX = 0;
    // let 滑块
    let totalX = 0;

    // 按下事件
    function onmousedown(e: any) {
      isMouseUp.value = false;
      isMouseDown.value = true;
      circleX = (CIRCLE.value as any).getBoundingClientRect().x;
      circleY = (CIRCLE.value as any).getBoundingClientRect().y;
      footerX = (FOOTER.value as any).getBoundingClientRect().x;
      totalX = footerX + FOOTER_WIDTH - CIRCLE_WIDTH;
      // 鼠标移动
      document.onmousemove = function (e1) {
        if (isMouseDown.value) {
          // 1.获取点坐标
          const x = e1.clientX;
          const y = e1.clientY;
          // 大于长条的最大值
          if (x >= totalX) {
            (CIRCLE.value as any).style.left = `${FOOTER_WIDTH - CIRCLE_WIDTH}px`;
            (CONVAS.value as any).style.left = `${FOOTER_WIDTH - CIRCLE_WIDTH}px`;
            moveX = FOOTER_WIDTH - CIRCLE_WIDTH;
          } else if (x <= footerX) { // 小于长条的最小值
            (CIRCLE.value as any).style.left = '0px';
            (CONVAS.value as any).style.left = '0px';
            moveX = 0;
          } else { // 中间值
            (CIRCLE.value as any).style.left = `${x - circleX}px`;
            (CONVAS.value as any).style.left = `${x - circleX}px`;
            moveX = x - circleX;
          }

          (STATUS.value as any).style.width = `${moveX + 26}px`;
          (STATUS.value as any).style.backgroundImage = 'linear-gradient(to top, #4fcffd, #30b2fb)';
        }
      };
      document.onmouseup = function (e2) {
        isMouseUp.value = true;
        isMouseDown.value = false;
        // // 1.获取点坐标
        // let x = e2.clientX;
        // let y = e2.clientY;
        // console.log(x, y);
      };
    }

    // 裁剪滑块验证上图片距左上角x轴距离
    let sx = 0;
    // 裁剪滑块验证图片距左上角y轴距离
    let sy = 0;
    onMounted(() => {
      randomSXY();
      console.log(context);
    });

    // 上次的索引
    let oldIndex = 0;
    // 随机生成 canvas 的裁剪位置
    const randomSXY = () => {
      // 测试
      const canvas = (CONVAS.value as any);
      const ctx = canvas.getContext('2d');
      const image = (IMAGE.value as any);
      // 本次索引
      let newIndex = 0;
      do {
        newIndex = Math.floor(Math.random() * puzzImgs.length);
      } while (oldIndex == newIndex);

      oldIndex = newIndex;
      // 修改路径
      image.src = puzzImgs[newIndex];

      image.onload = function () {
        // 执行drawImage语句
        ctx.drawImage(image, sx, sy, 46, 46, 0, 0, 50, 50);
      };

      // 验证码图片的宽高
      // 滑块需要再减去convas的宽高。
      const imageWidth = 363 - 100;
      const imageHeight = 141 - 100;

      sx = Math.round(Math.random() * imageWidth) + 50;
      sy = Math.round(Math.random() * imageHeight) + 50;

      (CONVAS.value as any).style.top = `${sy}px`;

      (SHADE.value as any).style.top = `${sy}px`;
      (SHADE.value as any).style.left = `${sx}px`;

      // shade的left值
      needX = sx;
    };

    // 监视鼠标是由抬起
    watch(isMouseUp, (now, old) => {
      // 鼠标松开
      if (now) {
        // 判断是否成功（重叠,这里设置的误差是1像素）
        if (Math.abs(moveX - needX) <= 1) {
          console.log('成功');
          statusTxt.value = '拼接成功';
          (STATUS.value as any).style.backgroundImage = 'linear-gradient(to top, #4fcffd, #30b2fb)';
          (STATUSTXT.value as any).style.color = '#fff';
          (STATUSTXT.value as any).style.zIndex = 10;
          (STATUS.value as any).style.width = '100%';
          (CIRCLE.value as any).style.display = 'none';
          // 调用父组件的事件
          context.emit('successPuzzle');
        } else {
          // 修改图片的地址
          setTimeout(() => {
            (CONVAS.value as any).style.left = '0px';
            randomSXY();
          }, 500);

          // 滑块都重新放在左侧
          statusTxt.value = '向右滑动完成拼图';
          (CIRCLE.value as any).style.left = '0px';
          (STATUS.value as any).style.width = '0px';
          (CIRCLE.value as any).style.transition = '.5s .5s';
          (STATUS.value as any).style.transition = '.5s .5s';
          (STATUS.value as any).style.backgroundImage = 'linear-gradient(to top, #ff5b57, #ff5b57)';
          (STATUSTXT.value as any).style.color = '#10b2fa';
        }
      } else {
        (STATUS.value as any).style.borderRadius = '40px';
        (CIRCLE.value as any).style.transition = '';
        (STATUS.value as any).style.transition = '';
      }
    });

    // 关闭验证码
    const closeImage = () => {
      context.emit('closePuzzle');
      console.log('关闭验证码123');
    };

    // 更换图片
    const changeImage = () => {
      console.log('更换图片');
      randomSXY();
    };

    return {
      IMAGE,
      CIRCLE,
      FOOTER,
      CONVAS,
      SHADE,
      STATUS,
      STATUSTXT,
      bodyImage,
      statusTxt,
      onmousedown,
      closeImage,
      changeImage,
    };
  },
});
</script>
<style lang='less' scoped>
  @import url('~@/assets/fonts/iconfont.css');

  #puzzle-warp {
    width: 364px;
    height: 216.5px;
    padding: 12px 12px 12px 20px;
    border: 1px solid #eee;
    position: absolute;
    box-shadow: 0 0 2px 2px #eee;
    background-color: #fff;
    font: 14px/14px '微软雅黑';
    color: #333;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    z-index: 10;
    box-sizing: unset;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .puzzle-close {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-image: url('~@/assets/imgs/icon.png');
      position: absolute;
      right: 10px;
      top: 10px;
      background-position: -53px -119px;
      cursor: pointer;
      transform: scale(.9);
    }

    .puzzle-header {
      height: 25px;
      font: 14px/25px '微软雅黑';

      & > a {
        display: inline-block;
        position: absolute;
        right: 35px;
        color: #06c;

        .iconfont {
          font-weight: bold;
        }
      }
    }

    .puzzle-body {
      height: 141.55px;
      background-size: 100%;
      margin-bottom: 10px;
      position: relative;

      canvas, #shade {
        width: 50px;
        height: 50px;
        border: 2px solid #a4a4a4;
        z-index: 10;
        position: absolute;
        box-sizing: border-box;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }

      #shade {
        background-color: rgba(1, 1, 1, .5);
      }
    }

    .puzzle-footer {
      height: 40px;
      background-color: #f5faff;
      box-shadow: inset 0 0 10px 5px #e6f5ff;
      border-radius: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      opacity: 1;
      position: relative;

      #after-status {
        width: 0px;
        height: 100%;
        border-radius: 40px;
        position: absolute;
        z-index: 1;
      }

      #statusTxt {
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        color: #10b2fa;
        z-index: 0;
      }

      .puzzle-circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #e6f5ff;
        box-shadow: 0 0 10px 2px #e6f5ff;
        background-color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto 0;
        cursor: pointer;
        z-index: 2;

        .icon-arrow-right {
          text-align: center;
          line-height: 50px;
          font-size: 30px;
          font-weight: bold;
        }
      }
    }

    .puzzle-arrows {
      display: block;
      width: 10px;
      height: 10px;
      position: absolute;
      background: red;
      left: 0;
      right: 0;
      bottom: -5px;
      margin: 0 auto;
      transform: rotate(45deg);
      background-color: #fff;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
  }

</style>
