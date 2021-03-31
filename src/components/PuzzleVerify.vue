<template>
    <div id="puzzle-warp">
        <i class='puzzle-close'></i>
        <div class='puzzle-header'>
            <span>完成拼图验证</span>
            <a href="#"><span class='iconfont icon-refresh'></span>&nbsp;换一张</a>
        </div>
        <div class='puzzle-body'></div>
        <div class='puzzle-footer'>
            <div draggable="true" ref="CIRCLE" id="puzzle-circle" class="puzzle-circle" @mousedown="onmousedown($event)" @mousemove="onmousemove" @mouseup="onmouseup">
                <span class="iconfont icon-arrow-right"></span>
            </div>
            向右滑动完成拼图
        </div>
        <i class='puzzle-arrows'></i>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, onMounted, ref} from 'vue'    
    declare var $: (selector: string) => any;
    var aa ;
    export default defineComponent ({
        setup(props, context){
            const CIRCLE = ref(null);
            // document.getElementById('puzzle-circle').getBoundingClientRect().x
            // let circleX = $('.puzzle-circle').getBoundingClientRect().x
            // let circleY = $('.puzzle-circle').getBoundingClientRect().y
            // console.log('circleX, circleY', circleX, circleY);
            // document.querySelector('.puzzle-circle').getBoundingClientRect().y
            // 按下事件
            function onmousedown(e:any){
                console.log('onmousedown', e);
                // 1.获取点坐标
                let x = e.clientX;
                let y = e.clientY;

                console.log('x',x);
            }
            // 鼠标移动事件
            function onmousemove(){
                // console.log('onmousemove');
            }
            // 鼠标松手
            const onmouseup = () => {
                console.log('onmouseup');
            }
            onMounted(()=>{
                // let circleX = $('.puzzle-circle').getBoundingClientRect().x
                // let circleY = $('.puzzle-circle').getBoundingClientRect().y
                // console.log('circleX, circleY', circleX, circleY);
                // let dom:any = document.getElementById('puzzle-circle')
                let dom:any = CIRCLE.value
                console.log(dom.getBoundingClientRect());
                // console.log((CIRCLE.value as window).getBoundingClientRect());
            })
            return{
                CIRCLE,
                onmousedown,
                onmousemove,
                onmouseup,
            }
        }
    })
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
            border-radius: 3px;
            background-image:url('~@/assets/imgs/login-bg1.png');
            background-size:100%;
            margin-bottom: 10px;
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
</style>