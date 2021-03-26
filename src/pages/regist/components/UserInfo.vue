<template>
    <div id="userinfo">
        <div id="username-div">
            <label for="username">用　户　名</label>
            <input v-model="username" @blur="usernameBlur" @focus="usernameFocus" ref="usernamrRef" type="text" id="username" placeholder="您的账户名和登录名"  autocomplete="off" maxlength="20">
            <span class='clean-icon normal-icon' v-show="username.length>0 && !usernameSure" @click="cleanUsername"></span>
            <span class='clean-icon succes-icon' v-show="username.length > 0 && usernameSure"></span>
            <Hint :hint="hintUsername" v-show="showHintUsername"/>
        </div>

        <div id="password-div">
            <label for="password">设 置 密 码</label>
            <input v-model="password" @blur="passwordBlur" @focus="passwordFocus" ref="passwordRef" type="password" id="password" placeholder="建议使用两种或两种以上字符组合"  autocomplete="off" maxlength="20">
            <Hint :hint="hintPassword" v-show="showHintPassword"/>
        </div>

        <div id="confirm-password-div">
            <label for="confirm-password">确 认 密 码</label>
            <input v-model="confirmPassword" @blur="cpBlur" @focus="cpFocus" ref="cpasswordRef" type="password" id="confirm-password" placeholder="请再次输入密码"  autocomplete="off" maxlength="20">
            <Hint :hint="hintconfirmPassword" v-show="showHintConfirmPassword"/>
            <span class='clean-icon succes-icon' v-show="confirmPassword.length > 0 && confirmPasswordSure"></span>
        </div>
        <div id="next-step-button" @click="regist">立即注册</div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, ref, watch } from 'vue';
    import Hint from './Hint.vue';
    import * as HintEntity from '@/pojo/HintEntity';
    import * as Validate from '@/utils/validate';

    export default defineComponent ({
        components:{
            Hint
        },
        emits:{
            'hindenUserInfo':null,
        },
        setup (props, context) {
            // 用户名
            let username = ref('');
            // 密码
            let password = ref('');
            // 二次输入密码
            let confirmPassword = ref('');
            // 用户名格式是否正确
            let usernameSure = ref(false);
            let passwordSure = ref(false);
            // 确认密码是否正确
            let confirmPasswordSure = ref(false)
            // 用户名输入框验证提示
            let hintUsername = ref(HintEntity.USERNAME_HINT_0);
            // 密码输入框验证提示
            let hintPassword = ref(HintEntity.PASSWORD_HINT_0);
            // 确认密码输入框验证提示
            let hintconfirmPassword = ref(HintEntity.USERNAME_HINT_0);
            // 显示用户的验证提示组件
            let showHintUsername = ref(false);
            // 显示密码的验证提示组件
            let showHintPassword = ref(false);
            // 显示确认密码的验证提示组件
            let showHintConfirmPassword = ref(false);

            // 默认是空的,页面加载完毕,说明组件已经存在了,获取文本框元素
            let usernamrRef = ref<HTMLElement | null>(null)
            let passwordRef = ref<HTMLElement | null>(null)
            let cpasswordRef = ref<HTMLElement | null>(null)

            let isClickBtn = ref(false);

            // 清空用户名
            const cleanUsername = () => {
                username.value = '';
                showHintUsername.value = false;
                usernameSure.value = false;
                hintUsername.value = HintEntity.USERNAME_HINT_0;
            }

            // 验证用户名的回调函数
            const usernameCallback = (e:Error) => {
                if (e) {
                    let msg = e.message;
                    // 显示
                    showHintUsername.value = true;
                    if (msg === HintEntity.USERNAME_HINT_0.info) {
                        hintUsername.value = HintEntity.USERNAME_HINT_0;
                    } else if (msg === HintEntity.USERNAME_HINT_1.info) {
                        hintUsername.value = HintEntity.USERNAME_HINT_1;
                    }
                } else {
                    // 隐藏
                    showHintUsername.value = false;
                }
            }
            
            // 用户名输入框失去雕件
            const usernameBlur = () => {
                isClickBtn.value = false;
                if (username.value.length > 0) {
                    usernameSure.value = Validate.validateUsername(username.value, usernameCallback);
                } else {
                    // 默认显示
                    usernameSure.value = false;
                    showHintUsername.value = false;
                }
            }
            // 用户名输入框得到焦点
            const usernameFocus = () => {
                if (username.value.length == 0 && !isClickBtn.value) {
                    showHintUsername.value = true;
                    hintUsername.value = HintEntity.USERNAME_HINT_0;
                }
            }
            
            // 密码框失去焦点
            const passwordBlur = () => {
                cpBlur();
                if (password.value.length === 0) {
                    passwordSure.value = false
                    showHintPassword.value = false;
                }
            }

            // 密码框得到焦点
            const passwordFocus = () => {
                if (password.value.length == 0 && !isClickBtn.value) {
                    showHintPassword.value = true;
                }
            }
            const passwordCallback = (e:Error) => {
                if (e) {
                    let msg = e.message;
                    // 数量不够
                    if (msg === HintEntity.PASSWORD_HINT_0.info) {
                        hintPassword.value = HintEntity.PASSWORD_HINT_01;
                        passwordSure.value = false;
                    } else if (msg === HintEntity.PASSWORD_HINT_1.info) {
                        hintPassword.value = HintEntity.PASSWORD_HINT_1;
                        passwordSure.value = true;
                    } else if (msg === HintEntity.PASSWORD_HINT_3.info) {
                        hintPassword.value = HintEntity.PASSWORD_HINT_3;
                        passwordSure.value = true;
                    } else if (msg === HintEntity.PASSWORD_HINT_2.info) {
                        hintPassword.value = HintEntity.PASSWORD_HINT_2;
                        passwordSure.value = true;
                    }
                }
            }
            // 密码监视
            watch (password, ()=>{
                if (password.value.length > 0) {
                    Validate.validatePassword(password.value, passwordCallback);
                } else {
                    hintPassword.value = HintEntity.PASSWORD_HINT_0;
                }
            })

            // 确认密码失去焦点
            const cpBlur = () => {
                if (confirmPassword.value.length == 0) {
                    showHintConfirmPassword.value = false;
                    confirmPasswordSure.value = false;
                } else {
                    // 比较两次密码是否匹配
                    if (confirmPassword.value === password.value) {
                        showHintConfirmPassword.value = false;
                        confirmPasswordSure.value = true;
                    } else {
                        showHintConfirmPassword.value = true;
                        hintconfirmPassword.value = HintEntity.CONFIRM_PASSWORD_HINT_1;
                        confirmPasswordSure.value = false;
                    }
                }
                
            }
            // 确认密码得到焦点
            const cpFocus = () => {
                if (confirmPassword.value.length === 0) {
                    showHintConfirmPassword.value = true;
                    confirmPasswordSure.value = false;
                    hintconfirmPassword.value = HintEntity.CONFIRM_PASSWORD_HINT_0;
                }
            }

            // 注册
            const regist = () => {
                let result = usernameSure.value && passwordSure.value && confirmPasswordSure.value;
                isClickBtn.value = true;
                if (result) {
                    // 触发父组件的方法
                    context.emit('hindenUserInfo');
                } else if (!result && !usernameSure.value) {
                    // 用户名不正确
                    if (username.value.length == 0) {
                        showHintUsername.value = true;
                        hintUsername.value = HintEntity.USERNAME_HINT_01;
                    }
                    // 得到焦点
                    usernamrRef.value && usernamrRef.value.focus()
                } else if (!result && !passwordSure.value) {
                    // 密码不正确
                    if (password.value.length === 0) {
                        showHintPassword.value = true;
                        hintPassword.value = HintEntity.PASSWORD_HINT_02;
                    }
                    // 得到焦点
                    passwordRef.value && passwordRef.value.focus() 
                } else if (!result && !confirmPasswordSure.value) {
                    // 
                }
                  
            }
            
            return {
                username,
                password,
                confirmPassword,
                cleanUsername,
                usernameSure,
                confirmPasswordSure,
                hintUsername,
                hintconfirmPassword,
                hintPassword,
                showHintUsername,
                showHintPassword,
                showHintConfirmPassword,
                usernameBlur,
                usernameFocus,
                passwordBlur,
                passwordFocus,
                cpBlur,
                cpFocus,
                regist,
                usernamrRef,
                passwordRef,
                cpasswordRef
            }
        }
    })
</script>

<style lang='less' scoped>
    @import url('~@/assets/less/globalVariable.less');
    #userinfo{
        width: @regist-inner-main-width;
        height: 344px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-top: 30px;
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