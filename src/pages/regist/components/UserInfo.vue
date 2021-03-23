<template>
    <div id="userinfo">
        <div id="username-div">
            <label for="username">用　户　名</label>
            <input v-model="username" @blur="usernameBlur" @focus="usernameFocus" type="text" id="username" placeholder="您的账户名和登录名"  autocomplete="off" maxlength="20">
            <span class='clean-icon normal-icon' v-show="username.length>0 && !usernameSure" @click="cleanUsername"></span>
            <span class='clean-icon succes-icon' v-show="username.length > 0 && usernameSure"></span>
            <Hint :hint="hintUsername" v-show="showHintUsername"/>
        </div>

        <div id="password-div">
            <label for="password">设 置 密 码</label>
            <input v-model="password" type="password" id="password" placeholder="建议使用两种或两种以上字符组合"  autocomplete="off" maxlength="20">
            <Hint :hint="hintPassword" v-show="showHintPassword"/>
        </div>

        <div id="confirm-password-div">
            <label for="confirm-password">确 认 密 码</label>
            <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="请再次输入密码"  autocomplete="off" maxlength="20">
            <Hint :hint="hintconfirmPassword" v-show="showHintConfirmPassword"/>
        </div>

        <div id="next-step-button" @click="clickNextStep">下一步</div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, ref, watch } from 'vue';
    import Hint from './Hint.vue';
    import HintEntity from '../entity/HintEntity';
    import * as Validate from '@/utils/validate';

    export default defineComponent ({
        components:{
            Hint
        },
        setup () {
            // 用户名
            let username = ref('');
            // 密码
            let password = ref('');
            // 二次输入密码
            let confirmPassword = ref('');
            // 用户名格式是否正确
            let usernameSure = ref(false);
            // 用户名输入框验证提示
            let hintUsername = ref(new HintEntity('支持中文、英文、数字、“-”、“_”的组合，4-20个字符', '#c5c5c5', '0px -100px'));
            // 密码输入框验证提示
            let hintPassword = ref(new HintEntity('建议使用字母.数字和符号两种及以上的组合, 8-20个字符', '#c5c5c5', '0px -100px'));
            // 确认密码输入框验证提示
            let hintconfirmPassword = ref(new HintEntity('请再次输入密码', '#c5c5c5', '0px -100px'));
            // 显示用户的验证提示组件
            let showHintUsername = ref(false);
            // 显示密码的验证提示组件
            let showHintPassword = ref(false);
            // 显示确认密码的验证提示组件
            let showHintConfirmPassword = ref(false);

            // 清空用户名
            const cleanUsername = () => {
                username.value = '';
                showHintUsername.value = false;
                hintUsername.value = new HintEntity('支持中文、英文、数字、“-”、“_”的组合，4-20个字符', '#c5c5c5', '0px -100px');
            }

            // 验证用户名的回调函数
            const callback = (e:Error) => {
                if (e) {
                    // 显示
                    showHintUsername.value = true;
                    hintUsername.value = new HintEntity(e.message, '#f91', '-17px -100px');
                } else {
                    // 隐藏
                    showHintUsername.value = false;
                }
            }
            // 点击下一步
            const clickNextStep = () => {
                console.log('clickNextStep');
            }
            // 用户名输入框失去雕件
            const usernameBlur = () => {
                if (username.value.length > 0) {
                    usernameSure.value = Validate.validateUsername(username.value, callback);
                } else {
                    // 默认显示
                    showHintUsername.value = false;
                }
            }
            const usernameFocus = () => {
                if (username.value.length == 0) {
                    showHintUsername.value = true;
                    hintUsername.value = new HintEntity('支持中文、英文、数字、“-”、“_”的组合，4-20个字符', '#c5c5c5', '0px -100px');
                }
            }
            
            // 密码监视
            watch (password, ()=>{
                
            })
            return {
                username,
                password,
                confirmPassword,
                cleanUsername,
                usernameSure,
                hintUsername,
                hintconfirmPassword,
                hintPassword,
                showHintUsername,
                showHintPassword,
                showHintConfirmPassword,
                clickNextStep,
                usernameBlur,
                usernameFocus,
            }
        }
    })
</script>

<style lang='less' scoped>
    @import url('~@/assets/less/registVariable.less');
    #userinfo{
        width: @inner-main-width;
        height: 344px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        #username-div,#password-div,#confirm-password-div {
            position: relative;
            border: solid 1px #ddd;
            width: 398px;
            height: 52px;
            label{
                position: relative;
                width:87px;
                height:52px;
                padding-left: 20px;
                border-right: 1px solid rgb(221, 221, 221);
                cursor: pointer;
                color: #666;
                line-height: 50px;
                float: left;
            }
            input{
                width: 230px;
                height: 50px;
                border: 0;
                padding-left: 20px;
                font-size: 14px;
                line-height: 48px;
                font-family: Arial;
            }
            
            .clean-icon{
                width:16px;
                height:16px;
                margin: auto;
                right: 15px;
                top: 0;
                bottom: 0;  
                position: absolute;
                background-image:url('~@/assets/imgs/icon.png');
            }
            .normal-icon{
                background-position: -50px -117px;
                &:hover{
                    cursor: pointer;
                    background-position: -33px -100px;
                }
            }
            .succes-icon{
                background-position: -0 -117px;
                &:hover{
                    background-position: -0 -117px;
                }
            }
            &:hover{
                border: 1px solid #666;
                label{
                    border-right: 1px solid #666;
                }
            }
        }

        #next-step-button{
            border: 0;
            width: 398px;
            height: 54px;
            background-color: #e2231a;
            cursor: pointer;
            text-align: center;
            line-height: 54px;
            color: #fff;
            font-size: 16px;
            font-family: "Microsoft YaHei","Hiragino Sans GB";
            &:hover{
                background-color:#c81623;
            }
        }
    }
</style>