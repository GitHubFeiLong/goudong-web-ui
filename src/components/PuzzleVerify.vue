<template>
    <div id="puzzle-warp">
        <i class='puzzle-close'></i>
        <div class='puzzle-header'>
            <span>完成拼图验证</span>
            <a href="#"><span class='iconfont icon-refresh'></span>&nbsp;换一张</a>
        </div>
        <div class='puzzle-body'>
            <img ref="IMAGE" src="~@/assets/imgs/login-bg1.png" width="100%" height="100%">
        </div>
        <div class='puzzle-footer' ref="FOOTER">
            <div ref="CIRCLE" id="puzzle-circle" class="puzzle-circle"  @mousedown="onmousedown($event)">
                <span class="iconfont icon-arrow-right"></span>
            </div>
            向右滑动完成拼图
        </div>
        <i class='puzzle-arrows'></i>
    </div>
    <canvas ref="CONVAS">

    </canvas>

    <canvas id="canvas"></canvas>
        <img id="source" src="https://mdn.mozillademos.org/files/5397/rhino.jpg"
       width="300" height="227">
</template>

<script lang='ts'>
    import { defineComponent, onMounted, ref, watch, reactive} from 'vue'    
    declare var $: (selector: string) => any;
    var aa ;
    export default defineComponent ({
        setup(props, context){
            // 图片image
            const IMAGE = ref(null);
            // 滑块的圆
            const CIRCLE = ref(null);
            // 长条
            const FOOTER = ref(null);
            // convas
            const CONVAS = ref(null);

            // 滑块圆的总宽
            const CIRCLE_WIDTH = 52;
             // 长条的总宽
            const FOOTER_WIDTH = 364;
            
            let isMouseUp = ref(true);
            let isMouseDown = ref(false);
            let moveX = 0;
            // 按下事件
            function onmousedown(e:any){
                isMouseUp.value = false;
                isMouseDown.value = true;
                document.onmousemove = function(e1){
                    if (isMouseDown.value) {
                        // 1.获取点坐标
                        let x = e1.clientX;
                        let y = e1.clientY;
                        // 大于长条的最大值
                        if (x >= totalX) {
                            (CIRCLE.value as any).style.left = FOOTER_WIDTH - CIRCLE_WIDTH + "px"; 
                            moveX = FOOTER_WIDTH - CIRCLE_WIDTH;
                        } else if (x <= footerX) { // 小于长条的最小值
                            (CIRCLE.value as any).style.left = "0px";  
                            moveX = 0;
                        } else { // 中间值
                            (CIRCLE.value as any).style.left = x - circleX  + "px";
                            moveX = x - circleX;
                        }

                        
                        
                    }
                }
                document.onmouseup = function(e2){
                    isMouseUp.value = true;
                    isMouseDown.value = false;
                    // 1.获取点坐标
                    let x = e2.clientX;
                    let y = e2.clientY;
                    if (x >= totalX) {
                        // (CIRCLE.value as any).style.transition = "1s"
                    }

                }
            }
           
            // 滑块元素的X
            let circleX = 0;
            // 滑块元素的Y
            let circleY = 0;
            // 滚动的长条
            let footerX = 0
            // let 滑块
            let totalX = 0;
            onMounted(()=>{
                circleX = (CIRCLE.value as any).getBoundingClientRect().x;
                circleY = (CIRCLE.value as any).getBoundingClientRect().y;
                footerX = (FOOTER.value as any).getBoundingClientRect().x;
                totalX = footerX + FOOTER_WIDTH - CIRCLE_WIDTH;

                // 测试
                var canvas = (CONVAS.value as any);
                var ctx = canvas.getContext("2d");
                var image = (IMAGE.value as any);
                console.log("ctx",ctx);
                ctx.drawImage(image, 120.5, 20, 10, 10, 10, 10, 10, 10);
            });

            watch(isMouseUp, (now, old)=>{
                // 鼠标松开
                if (now) {
                    console.log(moveX,FOOTER_WIDTH - CIRCLE_WIDTH);
                    // 最右边
                    if (moveX == FOOTER_WIDTH - CIRCLE_WIDTH) {
                        (CIRCLE.value as any).style.transition = ".5s left ease .5s";
                        (CIRCLE.value as any).style.left = "0px";
                        (FOOTER.value as any).style.backgroundColor = '#ff5b57';
                    } else {
                        (CIRCLE.value as any).style.transition = "1s";
                        (CIRCLE.value as any).style.left = "0px";
                    }
                    
                } else {
                     (CIRCLE.value as any).style.transition = "";
                }
            })
            return{
                IMAGE,
                CIRCLE,
                FOOTER,
                CONVAS,
                onmousedown,
            }
        }
    })
    var canvas = document.getElementById("canvas");
var ctx = (canvas as any).getContext("2d");
var image = document.getElementById('source');

(ctx as any).drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
</script>

<style lang='less' scoped>
    @import url('~@/assets/fonts/font01/iconfont.css');
    #puzzle-warp{
        width:364px;
        height:216.5px;
        padding:12px 12px 12px 20px;
        border: 1px solid #eee;
        position:absolute;
        box-shadow:0 0 2px 2px #eee;
        background-color:#fff;
        font: 14px/14px '微软雅黑';
        color:#333;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        .puzzle-close{
            display:inline-block;
            width:12px;
            height:12px;
            background-image:url('~@/assets/imgs/icon.png');
            position:absolute;
            right:10px;
            top:10px;
            background-position: -53px -119px;
            transform: scale(.9);
        }
        .puzzle-header{
            height:25px;
            font: 14px/25px '微软雅黑';
            & > a{
                display:inline-block;
                position:absolute;
                right: 35px;
                color:#06c;
                .iconfont{
                    font-weight: bold;
                }
            }
        }
        .puzzle-body{
            height:141.55px;
            background-size:100%;
            margin-bottom: 10px;
            img{
                width:100%;
                height:100%;
                border-radius: 3px;

            }
        }
        .puzzle-footer{
            height:40px;
            background-color: #f5faff;
            box-shadow: inset 0 0 10px 5px #e6f5ff;
            border-radius:40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            opacity: 1;
            color: #10b2fa;
            position:relative;
            .puzzle-circle{
                width:50px;
                height:50px;
                border-radius:50%;
                border:1px solid #e6f5ff;
                box-shadow:0 0 10px 5px #e6f5ff;
                background-color:#fff;
                position:absolute;
                top:0;
                right:0;
                bottom:0;
                left:0;
                margin:auto 0;
                cursor:pointer;
                // transition:1s left linear;
                .icon-arrow-right{
                    text-align:center;
                    line-height:50px;
                    font-size:30px;
                    font-weight: bold;
                }
            }
        }
        .puzzle-arrows{
            display:block;
            width:16px;
            height:16px;
            position: absolute;
            background: red;
            left: 0;
            right: 0;
            bottom: -12px;
            margin: 0 auto;
            transform: rotate(45deg);
            background-color:#fff;
            border-right:1px solid #eee;
            border-bottom:1px solid #eee;
        }
    }
    canvas{
        width:50.55px;
        height:50.55px;
    }
</style>