<template>
    <div id="header">
        <div id="header-main">
            <div class="big-logo" @click="notDone"></div>
            <div class="header-info">欢迎注册</div>
            <div class="go-login">
                已有账号？
                <a href="">请登录></a>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent } from 'vue'
    export default defineComponent ({
        setup () {
            function notDone () {
                (window as any).notDone()
            }
            return {
                notDone,
            }
        }
    })
</script>

<style lang='less'>
    @import url('~@/assets/less/registVariable.less');
    #header {
        height:110px;
        background-color:#fff;
        display: flex;
        justify-content: center;
        background: url('~@/assets/imgs/headbg.jpg') repeat-x left bottom;
        #header-main{
            width: @main-width;
            height: 100%;
            .big-logo{
                width: 160px;
                height: 50px;
                float: left;
                margin-top: 24px;
                cursor: pointer;
                background-image: url('~@/assets/imgs/icon.png');
            }
            .header-info {
                height: 34px;
                width:96px;
                line-height: 34px;
                font-size: 24px;
                color: #333;
                margin-top: 34px;
                float: left;
            }
            .go-login{
                height:21px;
                font-size: 16px;
                float: right;
                margin-top: 55px;
                color: #999;
                a{
                    color:#e22;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }

        }
    }
</style>