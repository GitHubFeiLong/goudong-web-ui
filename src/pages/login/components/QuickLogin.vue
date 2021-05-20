/* 表单的底部，QQ微信，注册模板 */
<template>
    <div class="qr-quick-login">
        <div class="qq-wechat">
            <div class="qq" @click='qq'>
                <b></b>
                <sapn class="span">QQ</sapn>
            </div>
            <i class="cutting-line"></i>
            <div class="wechat" @click='wechat'>
                <b></b>
                <sapn class="span">微信</sapn>
            </div>
        </div>
        <div class="register">
            <div class="register-inner" @click="register">
                <b></b><span class="span">立即注册</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 引入工具ts
import NotDone from '@/utils/NotDone';

export default defineComponent({
  name: 'QuickLogin',
  setup() {
    function qq() {
      window.location.href = 'http://www.goudong.shop/api/oauth2/qq/login';
    }
    function wechat() {
      NotDone();
    }
    function register() {
      window.location.href = '/register.html';
    }
    return {
      qq,
      wechat,
      register,
    };
  },
});
</script>

<style lang="less" scoped>
    /*
        QQ，微信 快捷登录公共样式
        @url:图标地址
        @span-width：文字宽度
        @left：文字居左多少像素
     */
    .QQWechat(@url,@span-width, @left){
        width:50%;
        height:18px;
        position: relative;
        margin:auto;
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
            position: absolute;
            width: @span-width;
            height: 14px;
            margin: auto;
            left: @left;
            right: 0;
            top: 0;
            bottom: 0;
            line-height: 14px;
        }
        &:hover{
            cursor: pointer;
            color:#E4393C;
            .span{
                text-decoration: underline;
            }
        }

    }
    .qr-quick-login{
        height:51px;
        display: flex;
        justify-content:space-between;
        background-color: #fcfcfc;
        border-top: 1px solid #f4f4f4;
        .qq-wechat{
            width: 110px;
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
                .QQWechat(url('~@/assets/imgs/QQ-weixin_01.png'), 25px, 25px);
            }
            .wechat{
                padding-left: 25px;
                .QQWechat(url('~@/assets/imgs/QQ-weixin_02.png'), 25px, 50px);
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
        .register{
            width:80px;
            height: 51px;
            position: relative;
            padding: 17px 20px 20px 20px;
            .register-inner{
                width: 80px;
                height: 20px;

                b{
                    width: 18px;
                    height: 18px;
                    background-image: url('~@/assets/imgs/register.png');
                    display: inline-block;
                }
                span{
                    display: inline-block;
                    position: absolute;
                    left: 41px;
                    color: #b61d1d !important;
                    font-size: 14px;
                }
                &:hover{
                    cursor:pointer;
                    .span{
                        text-decoration: underline;
                    }
                }
            }

        }
    }
</style>
