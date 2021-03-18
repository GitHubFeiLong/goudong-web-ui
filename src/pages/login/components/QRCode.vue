/* 扫码登录模板 */
<template>
    <div id="qr-code">
        <!-- 鼠标移入@mouseenter 移出@mouseleave -->
        <div class="qr-top" @mouseenter="qrTopMouseover" @mouseleave="qrTopMouseleave">
            <div :class="qr_outer" class='const-out'>
                <div id="qr-timeout" v-show="showQRMasking">
                    <p>二维码已失效</p>
                    <a @click.prevent="flushQr">刷新</a>
                </div>
                <img src="@/assets/imgs/qr-code.png" alt="扫码登录二维码" class="qr-inner">
            </div>
            <img src="@/assets/imgs/phone-orange.png" alt="手机图片" :class="qr_phone" >
        </div>
        <div class="qr-bottom">
            <p class="text-info">打开<a href="">手机京东</a>&nbsp;&nbsp;&nbsp;&nbsp;扫描二维码</p>
            <div class="ewm-features">
                <div>
                    <b class="icon-1"></b>
                    &nbsp;
                    <span>免输入</span>
                </div>
                <div>
                    <b class="icon-2"></b>
                    &nbsp;
                    <span>更快</span>
                </div>
                <div>
                    <b class="icon-3"></b>
                    &nbsp;
                    <span>更安全</span>
                </div>
            </div>
        </div>
        <QuickLogin/>
    </div>
    
</template>

<script lang="ts">
    import {defineComponent, ref, onMounted, watch} from 'vue'
    import QuickLogin from './QuickLogin.vue';
    export default defineComponent({
        name:'QRCode',
        components:{
             QuickLogin 
        },
        setup(){
            // class 值
            let qr_phone = ref('qr-phone');
            let qr_outer = ref('qr-outer');
            // 显示超时二维码蒙版，默认不显示
            let showQRMasking = ref(false);

            // 鼠标移入事件触发回调函数
            const qrTopMouseover = () =>{
                if (showQRMasking.value) {
                    return;
                }
                qrMoveFunc()
            }
            // 鼠标移出事件触发回调函数
            const qrTopMouseleave = () =>{
                if (showQRMasking.value) {
                    return;
                }
                qrHomingFunc();
            }

            // 二维码居中，手机img消失(样式class值改变)            
            const qrHomingFunc = () => {
                qr_phone.value = 'qr-phone-leave';
                qr_outer.value = 'qr-outer qr-outer-leave';
            }
            // 二维码居左，手机img显示（class值修改）
            const qrMoveFunc = () => {
                qr_phone.value = 'qr-phone';
                qr_outer.value = 'qr-outer';
            }

            // 二维码时间过期，样式回归初始值
            const qrTimeout = () => {
                setTimeout(()=>{
                    showQRMasking.value = true;
                }, 10000)
            }

            // 刷新二维码
            const flushQr = () => {
                showQRMasking.value = false;
            }
            // 生命周期函数
            onMounted(()=>{
                qrTimeout();
                
            })
            watch(showQRMasking, (showQRMasking, prevShowQRMasking) => {
                // 二维码过期，显示蒙版，图标归位
                if (showQRMasking) {
                    qrHomingFunc()       
                    return;
                }
                qrMoveFunc();
                qrTimeout();
            })
            return {
                qr_phone,
                qr_outer,
                showQRMasking,
                qrTopMouseover,
                qrTopMouseleave,
                qrTimeout,
                flushQr
            }
        },
    });
</script>

<style lang="less" scoped>
    // 二维码鼠标移入移出动画过度时长
    @qr-top-time:0.4s;
    #qr-code{
        width:100%;
        height: 293px;
        position:relative;
        font-family: "microsoft yahei";
        color: #999;
        border-bottom: 1px solid #f4f4f4;
        .qr-top{
            width:100%;
            height:190px;
            background-color: #fff;
            position: relative;
            padding-top: 20px;
            #qr-timeout{
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.6);
                z-index: 21;
                position: absolute;
                display: flex;
                flex-direction: column;
                text-align: center;
                p{
                    color:#fbfbfb;
                    font-size: 14px;
                    margin-top:50px;
                    font-weight: 700;
                }
                a{
                    background-color: #e4393c;
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    color: #fbfbfb !important;
                    margin: 10px auto;
                    &:hover{
                        cursor: pointer;
                        text-decoration: none;
                    }
                }
            }

            .qr-outer{
                width:171px;
                height:163px;
                position: relative;
                margin-left: 20px;
                border: 1px solid #f4f4f4;
                display: inline-block;
                transition: margin-left 0.4s;
                .qr-inner{
                    width: 147px;
                    height:147px;
                    display: block;
                    position: absolute;
                    margin: auto;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }
            }
            .qr-outer-leave{
                margin-left: 87px;
                transition: margin-left @qr-top-time;
            }
            .qr-phone{
                width:141px;
                height:168px;
                display: inline-block;
                position: absolute;
                right: -4px;
                transition: opacity @qr-top-time,display @qr-top-time;
                opacity: 1;
            }
            .qr-phone-leave{
                width:0px;
                transition: opacity @qr-top-time,display @qr-top-time;
                opacity: 0;
            }
        }
        .qr-bottom{
            height: 93px;
            width:100%;
            position: relative;
            background-color: #fff;
            .text-info{
                display: inline-block;
                width: 100%;
                text-align: center;
                margin-top: 15px;
                color: #666;
                font:12px/150% Arial,Verdana,"\5b8b\4f53";
                a{
                    color:#e4393c !important;
                    &:hover{
                        text-decoration: none;
                    }
                }
            }
            .ewm-features{
                height:25px;
                display: flex;
                justify-content:center;
                margin-top: 5px;
                div:first-child{
                    left: 1px;
                }
                div{
                    display: inline-block;
                    height: 25px;
                    width: 76px;
                    line-height: 25px;
                    position: relative;
                    right: -13px;
                    font-size: 12px;
                    b{
                        width:26px;
                        height:25px;
                        display: inline-block;
                        position: relative;
                    }
                    .icon-1{
                        background-image: url("~@/assets/imgs/qr-coagent_01.png")
                    }
                    .icon-2{
                        background-image: url("~@/assets/imgs/qr-coagent_02.png")
                    }
                    .icon-3{
                        background-image: url("~@/assets/imgs/qr-coagent_03.png")
                    }
                    span{
                        display: inline-block;
                        position: absolute;
                    }
                }
            }
            
        }
    }

</style>    