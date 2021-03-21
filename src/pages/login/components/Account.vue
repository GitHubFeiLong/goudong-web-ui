/* 用户名密码登录 */
<template>
    <div id="account">
        <div id="username-div">
            <label for="username" class="label-username"></label>
            <input @focus="usernameFocus($event)" @blur="usernameBlur" v-model='username' type="text" id="username" name="username" placeholder="邮箱/用户名/登录手机">
            <span v-show='username.length>0' @click='cleanUsername'></span>
        </div>
        <div id="password-div">
            <label for="password"></label>
            <input @focus="passwordFocus($event)" @blur="passwordBlur($event)" v-model='password' type="password" id="password" name="password" placeholder="密码">
            <span v-show='password.length>0' @click='cleanPassword'></span>
        </div>
        <a href="" class="forget-password" @click.prevent="forgetPassword">忘记密码</a>
        <div id="login-btn">
            <a href="" @click.prevent="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
        </div>
    </div>
    <QuickLogin/>
</template>

<script lang='ts'>
    import { defineComponent, ref, watch } from 'vue';
    // 申明jquery
    declare var $: (selector: string) => any;
    import QuickLogin from './QuickLogin.vue'
    export default defineComponent ({
        components:{
            QuickLogin
        },
        setup(){
            let username = ref('');
            let password = ref('');

            // 清除用户名
            function cleanUsername () {
                username.value='';
            }
            // 清除密码
            function cleanPassword () {
                password.value='';
            }
            // 用户名输入框得到焦点
            function usernameFocus (e:any) {
                // e.target 是你当前点击的元素
                // e.currentTarget 是你绑定事件的元素
        
                // 获得点击元素的前一个元素
                // e.currentTarget.previousElementSibling.innerHTML
        
                // 获得点击元素的第一个子元素
                // e.currentTarget.firstElementChild
        
                // 获得点击元素的下一个元素
                // e.currentTarget.nextElementSibling
        
                // 获得点击元素中id为string的元素
                // e.currentTarget.getElementById("string")
        
                // 获得点击元素的string属性
                // e.currentTarget.getAttributeNode('string')
        
                // 获得点击元素的父级元素
                // e.currentTarget.parentElement
        
                // 获得点击元素的前一个元素的第一个子元素的HTML值
                // e.currentTarget.previousElementSibling.firstElementChild.innerHTML
                $(e.currentTarget.previousElementSibling).css('background-position', '0px -48px');
                console.log();
            }
            // 用户名输入框失去焦点事件
            function usernameBlur (e:any) {
                $(e.currentTarget.previousElementSibling).css('background-position', '0px 0px');
            }
            // 密码框得到焦点
            function passwordFocus (e:any) {
                $(e.currentTarget.previousElementSibling).css('background-position', '-48px -48px');
            }
            // 密码框失去焦点
            function passwordBlur (e:any) {
                $(e.currentTarget.previousElementSibling).css('background-position', '-48px 0px');
            }
            // 登录
            function login () {
                (window as any).notDone()
            }
            // 忘记密码
            function forgetPassword () {
                (window as any).notDone()
            }
            return {
                username,
                password,
                cleanUsername,
                cleanPassword,
                usernameFocus,
                usernameBlur,
                passwordFocus,
                passwordBlur,
                login,
                forgetPassword
            }
        },
        
    })
</script>

<style lang='less' scoped>
    /* 密码框去掉可见样式（眼睛） */
    input[type="password"]::-ms-reveal{
        display:none;
    }
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
                background-position: -51px 30px;
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
            .username-password(33px);
        }
        #password-div{
            // background-color: red;
            label{
                background-image:url('~@/assets/imgs/pwd-icons-new.png');
                background-position: -48px 0px;
            }
            .username-password(93px);
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
        
        #login-btn {
            position: absolute;
            width:306px;
            height: 33px;
            background-color: #e4393c;
            border: 1px solid #e85356;
            margin: auto;
            left: 0;
            bottom:33px;
            right: 0;
            a{
                display: block;
                width:100%;
                height:31px;
                text-align: center;
                line-height: 31px;
                color: #fff !important;
                font-size: 20px;
                font-family: 'Microsoft YaHei';
                text-decoration: none;
            }
        }
    }
</style>