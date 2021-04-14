<template>
    <div id="body">
        <div id="body-main">
            <div id="body-info">
                <div class="step step1">
                    <span :class="circleOne">{{stepSpan1Val}}</span>
                    <p class='p1-class-success'>验证邮箱</p>
                </div>
                <div :class="lineStep1Class"></div>
                <div class="step step2">
                    <span :class="circleTwo">{{stepSpan2Val}}</span>
                    <p :class='p2Class'>填写账号信息</p>
                </div>
                <div :class="lineStep2Class"></div>
                <div class="step step3">
                    <span :class="circleThree">{{stepSpan3Val}}</span>
                    <p :class='p3Class'>注册成功</p>
                </div>
            </div>
            <Email v-if="isShowEmail" @hindenEmail="hindenEmail" />
            <UserInfo v-else-if="isShowUserInfo" @hindenUserInfo="hindenUserInfo"/>
            <RegistSuccess v-else :username='username'/>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, ref } from 'vue'
    import Email from './Email.vue';
    import UserInfo from './UserInfo.vue';
    import RegistSuccess from './RegistSuccess.vue';

    export default defineComponent ({
        components:{
            Email,
            UserInfo,
            RegistSuccess
        },
        setup () {
            let p2Class = ref('');
            let p3Class = ref('');
            let lineStep1Class = ref('step-line step-line1');
            let lineStep2Class = ref('step-line step-line2')
            let stepSpan1Val = ref('1');
            let stepSpan2Val = ref('2');
            let stepSpan3Val = ref('3');
            let isShowEmail = ref(true);
            let isShowUserInfo = ref(true);
            let username = ref('');
            // 第一个
            let circleOne = ref({
                finish:false,
                current:true,    
            });
            // 第二个
            let circleTwo = ref({
                finish:false,
                current:false,    
            });
            // 第三个
            let circleThree = ref({
                finish:false,
                current:false,    
            });
            
            // 邮箱验证成功
            const hindenEmail = () => {
                // 第一个步骤
                stepSpan1Val.value = '';
                circleOne.value.finish = true;
                circleOne.value.current = false;

                // 1 2 中间的线
                lineStep1Class.value += ' step-line-success ';
                // 第二个步骤
                p2Class.value = 'p-class-success';
                circleTwo.value.current = true;

                // 将Email隐藏
                isShowEmail.value = false;
                isShowUserInfo.value = true;
            }
            // 用户名输入成功
            const hindenUserInfo = (uname:string) => {
                // 第二个步骤
                stepSpan2Val.value = '';
                circleTwo.value.finish = true;
                circleTwo.value.current = false;

                // 1 2 中间的线
                lineStep1Class.value += ' step-line-success ';
                // 第三个步骤
                p3Class.value = 'p-class-success';
                circleThree.value.current = true;
                 // 2 3 中间的线
                lineStep2Class.value += ' step-line-success ';

                // 将用户名隐藏
                isShowUserInfo.value = false;
                username.value = uname;
                console.log(uname);
            }
            return {
                p2Class,
                p3Class,
                lineStep1Class,
                lineStep2Class,
                stepSpan1Val,
                stepSpan2Val,
                stepSpan3Val,
                isShowEmail,
                isShowUserInfo,
                circleOne,
                circleTwo,
                circleThree,
                hindenEmail,
                hindenUserInfo,
                username
            }
        }
    })
</script>

<style lang='less' scoped>
    @import url('~@/assets/less/globalVariable.less');
    #body {
        height:@regist-main-height;
        padding-top: 85px;
        background-color:#fff;
        display: flex;
        justify-content: center;
        // 文字不能被选中
        user-select: none;
        #body-main{
            width: @regist-main-width;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;
            border-bottom: solid 1px #e6e6e6;
            #body-info{
                width:400px;
                height:55px;
                display: flex;
                justify-content: space-between;
                position: relative;
            
                // 步骤
                .step {
                    span {
                        width:25px;
                        height:25px;
                        display: block;
                        background: #fff;
                        line-height: 25px;
                        text-align: center;
                        font-size: 12px;
                        font-weight: 700;
                        color: #ccc;
                        background-image: url('~@/assets/imgs/reg-icon.png');
                        background-position: -44px -199px;
                        margin:0 auto;
                    }
                    p{
                        margin:0;
                        margin-top: 10px;
                        font-size: 12px;
                        color: #999;
                    }
                    .p-class-success{
                        color: #3b4;
                    }
                    .finish{
                        background-position: 0px 0px;
                    }
                    .finish ~ p{
                        color: #3b4;
                    }
                    .current{
                        background-position: 1px -199px;
                        color:#fff;
                    }

                }
                // 过度线
                .step-line{
                    top: 7px;
                    width: 124px;
                    height:10px;
                    position: absolute;
                    background-image: url('~@/assets/imgs/reg-icon.png');
                    background-position: 0px -100px;
                }
                .step-line1{
                    left:50px;
                }
                .step-line2{
                    right:50px;
                }
                // 执行成功的过度线
                .step-line-success {
                    background-position: 0px -130px;
                }
            }
        }
    }
</style>