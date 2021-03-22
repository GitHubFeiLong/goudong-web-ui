<template>
    <div id="hint-info-div">
        <b class="hint-icon" :style="{ backgroundPosition: hint.backgroundPosition}"></b>
        <span class="hint-info" :style="{color:hint.color}">{{ hint.info }}</span>
    </div>
</template>

<script lang='ts'>
    import { defineComponent} from 'vue';
    import HintEntity from '../entity/HintEntity';
    // 申明jquery
    declare var $: (selector: string) => any;
    
    export default defineComponent ({
        props:{
            hint:HintEntity
        },
    })
</script>

<style lang='less' scoped>
    #hint-info-div{
        font-size: 10px;
        font-family: Arial, Verdana, 宋体;
        color: #ccc;
        height: 16px;
        position: absolute;
        width: 100%;
        bottom: -21px;
        .hint-icon{
            width: 16px;
            height: 16px;
            position: absolute;
            background-image: url("~@/assets/imgs/icon.png");
            display: inline-block;
            background-position: 0px -100px;
    
        }
        .hint-info{
            display: inline-block;
            height: 16px;
            line-height: 16px;
            position: absolute;
            margin-left: 21px;
        }
    }
</style>