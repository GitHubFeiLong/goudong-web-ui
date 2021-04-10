<template>
    <div id="email">
        <div id="email-number">
            <label for="email-num-input">中国 0086</label>
            <input v-model="email" @focus="emailFocus" @blur="emailBlur" type="text" id="email-num-input" placeholder="建议使用常用邮箱"  autocomplete="off">
            <span class='clean-icon normal-icon' v-show="email.length>0 && !emailSure" @click="cleanEmail"></span>
            <span class='clean-icon succes-icon' v-show="email.length>0 && emailSure"></span>
            <Hint :hint="hint" v-show="showHint"/>
        </div>
        <!--滑块验证-->
        <PuzzleVerify v-show="showPuzzle"/>
        <div id="email-button" v-if="showEmailButton" @click="clickGetAuth">点击按钮进行验证</div>
        <div id="email-auth-code" v-else>
            <div class="border">
                <label for="auth-code-input">邮箱验证码</label>
                <input type="text" id="auth-code-input" placeholder="输入验证码"  autocomplete="off" maxlength="6">
            </div>
            <button :class="btnClass" @click="repeatGetAuth">{{timer}}{{btnVal}}</button>
            <Hint :hint="authHint"/>
        </div>
        <div id="email-next-step" @click="clickNextStep">下一步</div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, ref, watch,toRefs } from 'vue';
    import Hint from './Hint.vue';
    import PuzzleVerify from '@/components/PuzzleVerify.vue';

    import * as HintEntity from '@/pojo/HintEntity';

    // 验证
    import * as Validate from '@/utils/validate';
    
    export default defineComponent ({
        props:{
        },
        emits:{
            'hindenEmail':null,
        },
        components:{
            Hint,
            PuzzleVerify
        },
        setup (props, context) {
            // 提示信息
            let info = '验证完成后，你可以使用该邮箱登录或找回密码';
            let color = '#c5c5c5';
            let backgroundPosition = '0px -100px';
            let hint = ref(HintEntity.EMAIL_HINT_0);
            let getAuthCodeNum = ref(2);
            let authHint = ref(new HintEntity.HintEntity(`该邮箱还可以获取${getAuthCodeNum.value}次验证码，请尽快验证`, '#c5c5c5', '0px -100px'));
            // 显示下一步（true）
            let showEmailButton = ref(true)
            let email= ref('');
            let showHint = ref(false);
            // 邮箱是否正确
            let emailSure = ref(false);
            // 倒计时
            let timer:any = ref(5);
            let btnVal = ref('s后重新获取');
            // 定时器id
            let intervalId = ref(0);
            // 按钮class
            let btnClass = ref('btn-no-hover');
            //
            let showPuzzle = ref(false);
            // 清除email值
            const cleanEmail = () => {
                showHint.value = false;
                email.value = '';
                emailSure.value = false;
            }
            // 点击获取验证码
            const clickGetAuth = () => {
                if (email.value.length == 0) {
                    showHint.value = true;
                    hint.value = HintEntity.EMAIL_HINT_2
                }
                // 邮箱格式正确才显示
                if (emailSure.value) {
                    // 1. 滑块验证
                    showPuzzle.value = true;
                    // 2. 验证码验证
                    // showEmailButton.value = false;
                }
                
            }
            // 邮箱输入框获取焦点
            const emailFocus = () => {
                showHint.value = !emailSure.value;
                if (HintEntity.EMAIL_HINT_2.equals(hint.value)) {
                    hint.value = HintEntity.EMAIL_HINT_2;
                }
                
            }
            // 邮箱输入框失去焦点
            const emailBlur = () => {
                // 判断是否显示下面的提示信息
                if (email.value.length > 0) {
                    // 正则验证邮箱是否正确的格式
                    Validate.validateEmail(String(email.value)).then((value) => {
                        emailSure.value = true;
                        showHint.value = false;
                        hint.value = HintEntity.EMAIL_HINT_0;
                    }, (reason) => {
                        emailSure.value = false;
                        showHint.value = true;
                        hint.value = HintEntity.EMAIL_HINT_1;
                    });
                } else {
                    showHint.value = false;
                }
            }
            // 邮箱验证的回调函数
            const emailCallback = (e:Error) => {
                // 不通过
                if (e) {
                    hint.value = HintEntity.EMAIL_HINT_1;
                    console.log(hint)
                } else {
                    // 通过了验证,修改样式
                    hint.value.info = info;
                    hint.value.color = color;
                    hint.value.backgroundPosition = backgroundPosition;
                    console.log(hint)
                }
            }
            // 定时器
            const authCodeTimer = () => {
                timer.value = 5;
                btnVal.value = 's后重新获取';
                btnClass.value = 'btn-no-hover';

                authHint.value.info = `验证码已发送,${timer.value}秒内输入有效`;
                authHint.value.color = '#c5c5c5';
                authHint.value.backgroundPosition = '0px -100px';

                intervalId.value = setInterval(() => {
                    console.log(timer.value)
                    timer.value--;
                    if (timer.value == 0) {
                        // 清除定时器
                        clearInterval(intervalId.value);  
                        // 恢复按钮功能
                        btnClass.value = '';
                        timer.value = '';
                        btnVal.value = '重新获取';
                        getAuthCodeNum.value --;
                        authHint.value = new HintEntity.HintEntity(`该邮箱还可以获取${getAuthCodeNum.value}次验证码，请尽快验证`,'#c5c5c5','0px -100px');
                    }
                }, 1000)
            }

            // 重新获取验证码
            const repeatGetAuth = () => {
                authCodeTimer();
            }

            //  点击下一步
            const clickNextStep = () => {
                // 匹配错误
                if (false) {
                    authHint.value = HintEntity.EMAIL_CODE_HINT_0;
                } else {
                    // 匹配成功,修改样式
                    context.emit('hindenEmail')
                }
            }
            // 监视邮箱值
            watch(email, (cur, pre) => {
                if (email.value.length == 0) {
                    hint.value = HintEntity.EMAIL_HINT_0;
                    emailSure.value = false;
                } else {
                    Validate.validateEmail(String(email.value)).then((value) => {
                        emailSure.value = true;
                        showHint.value = false;
                        hint.value = HintEntity.EMAIL_HINT_0;
                    }, (reason) => {
                        emailSure.value = false;
                        showHint.value = true;
                        hint.value = HintEntity.EMAIL_HINT_1;
                    });
                }
            })
            // 监视邮箱格式是否正确
            watch (emailSure, () => {
                if (!emailSure.value) {
                    // 不正确,显示按钮
                    showEmailButton.value = true;
                    console.log('showEmailButton', showEmailButton);
                }
            })

            // 监视显示验证码输入框
            watch(showEmailButton, ()=>{
                if (!showEmailButton.value) {
                    authCodeTimer()
                }
            })

            // 监视次数
            watch(getAuthCodeNum, () => {
                if (getAuthCodeNum.value <= 0) {
                    btnClass.value = 'btn-no-hover';
                }
            })
             
            return {
                btnClass,
                timer,
                btnVal,
                hint,
                authHint,
                showHint,
                showPuzzle,
                showEmailButton,
                email,
                emailSure,
                emailFocus,
                emailBlur,
                cleanEmail,
                clickGetAuth,
                repeatGetAuth,
                clickNextStep,
            }
        }
    })
</script>

<style>
    #puzzle-warp{
        margin-top:-170px;
    }
</style>
<style lang='less' scoped>
    @import url('~@/assets/less/globalVariable.less');
    #email{
        width: @regist-inner-main-width;
        height: 246px;
        background: #fff;
        position: relative;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
       
        input::-webkit-input-placeholder{
            color:rgb(204, 204, 204);
        }
        #email-number {
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
            #email-num-input{
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
        #email-button{
            border: solid 1px #ddd;
            border-color: #666;
            width: 398px;
            height: 54px;
            cursor: pointer;
            text-align: center;
            line-height: 54px;
            font-size: 14px;
            color: #333;
            margin-top: -15px;
        }
        // #puzzleVerify{
        //     margin-top:-170px;
        // }
        #email-auth-code{
            width: 398px;
            height: 52px;
            line-height: 54px;
            font-size: 14px;
            color: #333; 
            position: relative;
            margin-top: -15px;
            .border{
                width: 281px;
                height: 100%;
                display: inline-block;
                border: solid 1px rgb(221, 221, 221);
                label{
                    position: relative;
                    width:87px;
                    height:52px;
                    padding-left: 20px;
                    cursor: pointer;
                    color: #666;
                    line-height: 52px;
                    float: left;
                }
                input{
                    height: 52px;
                    width: 154PX;
                    border: 0px;
                    padding: 0px;
                    padding-left: 20px;
                    font-size: 14px;
                    line-height: 52px;
                    float: left;
                    position: absolute;
                }
                &:hover{
                    border: 1px solid #666;
                }
            }
            button{
                float: right;
                width: 115px;
                height: 54px;
                border: 1px solid #ddd;
                border-left:none;
                background: #fff;
                color: #333;
                padding: 0;
                float: right;
                position: absolute;
                border-radius: 0;
                cursor: pointer;
                &:hover{
                    border: 1px solid #666;
                }
            }

        }
        #email-next-step{
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