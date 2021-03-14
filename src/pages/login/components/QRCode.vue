<template>
    <div id="qr-code">
        <div class="qr-top">
            <div class="qr-outer">
                <img src="../../../assets/imgs/qr-code.png" alt="扫码登录二维码" class="qr-inner">
            </div>
            <img src="../../../assets/imgs/phone-orange.png" alt="手机图片" class="qr-phone">
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
    </div>
    <div class="qr-quick-login">
        <div class="qq-wechat">

        </div>
        <div class="regist">

        </div>
    </div>
</template>

<script>
    import {defineComponent} from 'vue'
    export default defineComponent({

    });
</script>

<style lang="less" scoped>
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
            padding-top: 28px;
            .qr-outer{
                width:171px;
                height:163px;
                position: relative;
                margin-left: 20px;
                border: 1px solid #f4f4f4;
                display: inline-block;
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
            .qr-phone{
                width:141px;
                height:168px;
                display: inline-block;
                position: absolute;
                right: -4px;
            }
        }
        .qr-bottom{
            height: 100px;
            width:100%;
            position: relative;
            background-color: #fff;
            padding-top:13px;
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
                        width:25px;
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
    .qr-quick-login{
            height:51px;
            background-color:red;
        }
</style>    