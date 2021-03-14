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
            <div class="qq">
                <b></b><sapn>QQ</sapn>
            </div>
            <i class="cutting-line"></i>
           <div class="wechat">
               <b></b><sapn>微信</sapn>
           </div>
        </div>
        <div class="regist">
            <a href=""><b></b><span>立即注册</span></a>
        </div>
    </div>
</template>

<script>
    import {defineComponent} from 'vue'
    export default defineComponent({

    });
</script>

<style lang="less" scoped>
    .QQWechat(@url,@span-width, @left){
        width:50%;
        height:18px;
        position: relative;
        margin:auto;
        &:hover{
            cursor: pointer;
            color:#E4393C;
            text-decoration:underline;
        }
        b{
            width:19px;
            height:18px;
            display: inline-block;
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            background-image:@url
        }
        sapn{
            display: inline-block;
            position: absolute;
            width: @span-width;
            height: 14px;
            margin: auto;
            left: @left;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }

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
    .qr-quick-login{
        height:51px;
        display: flex;
        justify-content:space-between;
        .qq-wechat{
            width: 155px;
            height: 51px;
            padding-left: 20px;
            padding-right: 20px;
            display: flex;
            justify-content: space-between;
            color:#666;
            font-size: 12px;
            position: relative;
            .qq{
                width:50%;
                position: relative;
                .QQWechat(url('~@/assets/imgs/QQ-weixin_01.png'), 18px, 15px);
            }
            .wechat{
                padding-left: 10px;
                .QQWechat(url('~@/assets/imgs/QQ-weixin_02.png'), 25px, 35px);
            }
            .cutting-line{
                display: inline-block;
                width: 1px;
                height: 12px;
                background-color: #d4d4d4;
                position: absolute;
                margin: auto;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
        .regist{
            width:118px;
            height: 51px;
            position: relative;
            padding: 17px 20px 20px 20px;
            b{
                width: 18px;
                height: 18px;
                background-image: url('~@/assets/imgs/regist.png');
                display: inline-block;
            }
            span{
                display: inline-block;
                position: absolute;
                left: 41px;
                color: #b61d1d !important;
            }
        }
    }
</style>    