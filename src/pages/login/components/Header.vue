<!--登录页头部组件-->
<template>
    <!-- Vue3 开始可以不需要跟标签 -->
    <div id="header" class="container-fluid">
        <div class="row" id="header-body">
            <div class="center">
                <div id="logo">
                    <img class="big-logo" src="../../../assets/imgs/logo-20200504-b.png" alt="大logo" @click="notDone">
                    <img class="text-logo" src="../../../assets/imgs/logo-text.png"   alt="登录文字">
                </div>
                <a id="questionnaire" href="http://www.baidu.com" @click.prevent="notDone">
                    <b></b>登录页面，调查问卷
                </a>
            </div>
        </div>
        <Hint :hint="hint"/>
    </div> 
</template>

<!--lang="ts" 可以写ts代码-->
<script lang="ts">
    // defineComponent函数定义一个组件，内部可以传入一个配置对象
    import {defineComponent,ref} from 'vue';
    import { useStore } from 'vuex';
    // 引入子组件
    import Hint from './Hint.vue';

    // 暴露出去一个定义好的组件
    export default defineComponent({
        components:{
            Hint
        },
        setup () {
            let hint = ref(` 依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！ 新版
            <a href='javascript:' onClick='notDone()'>《京东隐私政策》</a>已上线，将更有利于保护您的个人隐私。`);
            function notDone(){
                (window as any).notDone()
            }
            return {
                hint,
                notDone
            }
        }
    });
</script>

<style lang="less" scoped>
    @font-color:#999;
    #header{
        height: 119px;
        width: 100%;
        #header-body{
            width:100%;
            height:80px;
            display: flex;

            .center {
                width:990px;
                height:100%;
                margin: auto;
                display: flex;
                position: relative;
                #logo{
                    width:300px;
                    height:60px;
                    margin: auto 0px;
                    position: relative;
                    .big-logo{
                        display: inline-block;
                        cursor: pointer;
                    }
                    .text-logo{
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                        display: inline-block;
                    }
                }
                #questionnaire{
                    color: @font-color !important;
                    font: 12px/150% Arial,Verdana,"\5b8b\4f53";
                    width:136px;
                    height:18px;
                    display: inline-block;
                    position: absolute;
                    right: 0px;
                    bottom: 10px;
                    line-height: 18px;
                    text-align: right;
                    b{
                        width: 18px;
                        height: 14px;
                        margin: auto;
                        display: inline-block;
                        background-image: url("~@/assets/imgs/q-icon.png");
                        position: absolute;
                        margin-top: 3px;
                        left: 5px;
                    }
                }
            }
        }
        
    }
    
</style>
