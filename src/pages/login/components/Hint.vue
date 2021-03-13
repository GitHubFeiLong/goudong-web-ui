<!-- 提示模板 -->
<template>
    <div class="row" id="header-hint"> 
        <p class="hint">
            <i class='header-i'></i>
            <font v-html="hint"></font>
        </p>
    </div>
</template>

<script>
    export default {
        props:{
            hint:String
        }
    }
</script>
<style>
    a{
        color:#333 !important;
    }
</style>
<style lang="less" scoped>
@font-color:#999;
#header-hint{
    width:100%;
    height:38.9px;
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
                position: relative;
                margin: 12px 6px 0px 0px;
                background-image: url("~@/assets/imgs/icon-tips.png");
            }
        }
}
</style>