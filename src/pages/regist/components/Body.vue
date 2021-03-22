<template>
    <div id="body">
        <div id="body-main">
            <div id="body-info">
                <div class="step step1">
                    <span :class="circleOne">{{stepSpan1Val}}</span>
                    <p>验证邮箱</p>
                </div>
                <div class="step-line step-line1"></div>
                <div class="step step2">
                    <span :class="circleTwo">{{stepSpan2Val}}</span>
                    <p>填写账号信息</p>
                </div>
                <div class="step-line step-line2"></div>
                <div class="step step3">
                    <span :class="circleThree">{{stepSpan3Val}}</span>
                    <p>注册成功</p>
                </div>
            </div>
            <Email v-if="isShowEmail" />
            <SetInfo v-else />
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, ref } from 'vue'
    import Email from './Email.vue';
    import SetInfo from './SetInfo.vue';

    export default defineComponent ({
        components:{
            Email,
            SetInfo
        },
        setup () {
            let stepSpan1Val = ref('1');
            let stepSpan2Val = ref('2');
            let stepSpan3Val = ref('3');
            let isShowEmail = ref(true);
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
            return {
                stepSpan1Val,
                stepSpan2Val,
                stepSpan3Val,
                isShowEmail,
                circleOne,
                circleTwo,
                circleThree
            }
        }
    })
</script>

<style lang='less' scoped>
    @import url('~@/assets/less/registVariable.less');
    #body {
        height:406.16px;
        margin-top: 85px;
        background-color:#fff;
        display: flex;
        justify-content: center;
        #body-main{
            width: @main-width;
            height: 100%;
            display: flex;
            justify-content: start;
            flex-direction: column;
            align-items: center;
            #body-info{
                width:400px;
                height:55px;
                display: flex;
                justify-content: space-between;
                position: relative;
            
                // 步骤
                .step {
                    span {
                        width:24px;
                        height:24px;
                        display: block;
                        background: #fff;
                        line-height: 24px;
                        text-align: center;
                        font-size: 12px;
                        font-weight: 700;
                        color: #ccc;
                        background-image: url('~@/assets/imgs/reg-icon.png');
                        background-position: -45px -200px;
                        margin:0 auto;
                    }
                    p{
                        margin:0;
                        margin-top: 10px;
                        font-size: 12px;
                        color: #999;
                    }
                    .finish{
                        background-position: 0px 0px;
                    }
                    .finish ~ p{
                        color: #3b4;
                    }
                    .current{
                        background-position: 0px -200px;
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
            }
        }
    }
</style>