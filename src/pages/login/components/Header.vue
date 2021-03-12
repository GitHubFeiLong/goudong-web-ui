<!--登录页头部组件-->
<template>
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
        <div class="row" id="header-hint"> 
            <p class="hint">
                <i class='header-i'></i>
                依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！ 新版
                <a href='http://www.baidu.com' @click.prevent="notDone">《京东隐私政策》</a>已上线，将更有利于保护您的个人隐私。
            </p>
        </div>
    </div> 
</template>

<script>
    export default {
        methods:{
            notDone(){
                alert("not done");
            }
        }
    }
</script>

<style lang="less" scoped>
    @font-color:#999;
    #header{
        height: 120px;
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
                    color: @font-color;
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
        #header-hint{
            width:100%;
            height:40px;
            font-size: 12px;
            font-family: Arial, Verdana, 宋体;
            background-color: rgb(255, 248, 240);
            color: @font-color;
            display: flex;
                .hint{
                    margin: 0 auto;
                    line-height: 40px;
                    display: flex;
                    .header-i{
                        width: 16px;
                        height: 16px;
                        margin: auto;
                        margin-right: 5px;
                        background-image: url("~@/assets/imgs/icon-tips.png");
                    
                    }
                    a{
                        color: #333;
                    }
                }
        }
    }
    
</style>
