/* 用户名密码登录 */
<template>
    <div id="account">
        <div id="username-div">
            <label for="username" class="label-username"></label>
            <input type="text" id="username" name="username" placeholder="邮箱/用户名/登录手机">
            <span></span>
        </div>
        <div id="password-div">
            <label for="password"></label>
            <input type="text" id="password" name="password" placeholder="密码">
            <span></span>
        </div>
        <a href="" class="forget-password">忘记密码</a>
    </div>
    <QuickLogin/>
</template>

<script lang='ts'>
    import { defineComponent } from 'vue'
    import QuickLogin from './QuickLogin.vue'
    export default defineComponent ({
        components:{
            QuickLogin
        }
    })
</script>

<style lang='less' scoped>
    /* 
        输入框：用户名和密码的公共样式
        @margin-top 向上偏移量
    */
    .username-password(@margin-top){
        position: absolute;
        width:306px;
        height: 39px;
        margin: @margin-top auto;
        left: 0;
        right: 0;
        border: 1px solid #bdbdbd;
        label{
            width:39px;
            height:100%;
            position: absolute;
            z-index: 10;
            border-right: 1px solid #bdbdbd;
            background-image:url('~@/assets/imgs/pwd-icons-new.png');
        }
        input{
            width:100%;
            padding:10px 0 7px 50px;
            border:0;
            position: absolute;
            &:focus{
                outline:none;
            }
        }
        span{
            display: none;
            width:14px;
            height:14px;
            margin: auto;
            right: 5px;
            top: 0;
            bottom: 0;
            position: absolute;
            background-image:url('~@/assets/imgs/pwd-icons-new.png');
            background-position: -26px 30px;
            &:hover{
                cursor: pointer;
                background-position: -50px 30px;
            }
        }
    }
    #account{
        width:346px;
        height:255px;
        background-color:#fff;
        border-bottom: 1px solid #f4f4f4;
        position: relative;
        font-size: 14px;
        font-family: '\5b8b\4f53';
        #username-div{
            label{
                background-image:url('~@/assets/imgs/pwd-icons-new.png');
            }
            .username-password(30px);
        }
        #password-div{
            // background-color: red;
            label{
                background-image:url('~@/assets/imgs/pwd-icons-new.png');
                background-position: -47px 0px;
                &:checked{
                    background-position: -50px 30px;
                }
            }
            .username-password(90px);
        }
        .forget-password{
            position: absolute;
            display: inline-block;
            height: 18px;
            margin: 153px 20px;
            font-size: 7px;
            top: 0;
            bottom: 0;
            right: 0;
            color:#666 !important;
            &:hover{
                color:#E4393C !important;  
                cursor: pointer;
                text-decoration: underline;
            }
        }
        
    }
</style>