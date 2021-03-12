<!--登录页头部组件-->
<template>
    <div id="header" class="container-fluid">
        <div class="row" id="header-body">
            
        </div>
        <div class="row" id="header-hint"> 
            <p v-html="hint" class="hint"></p>
        </div>
    </div> 
</template>

<script>
    export default {
        components:{
        },
        data(){
            return {
                hint:"<i class='header-i'></i>依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！ 新版<a href='http://www.baidu.com'>《京东隐私政策》</a>已上线，将更有利于保护您的个人隐私。"
            }
        }
    }
</script>

<style scoped>
    #header{
        height: 120px;
        width: 100%;
        background-color: red;
    }
    #header-body{
        width:100%;
        height:80px;
    }
    /* 分割线 */
    #header-hint >>> a{
        color: #333;
    }
    #header-hint>>>.header-i{
        width: 16px;
        height: 16px;
        background-image: url("~@/assets/imgs/icon-tips.png");
    }
</style>
<style lang="less" scoped>
    // less 字体颜色变量
    @font-color:#999;
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
            }
    }
    
    
</style>