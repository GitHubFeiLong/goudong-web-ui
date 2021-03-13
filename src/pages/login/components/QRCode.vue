<template>
    <div id="qr-code">
        <div class="qr-top">
            <div class="qr-outer">
                <img src="../../../assets/imgs/qr-code.png" alt="扫码登录二维码" class="qr-inner">
            </div>
        </div>
    </div>
</template>

<script>
    import {defineComponent} from 'vue'
    export default defineComponent({

    });
</script>

<style lang="less" scoped>
    #qr-code{
        width:100%;
        height: 293px;
        background-color: pink;
        position:relative;
        .qr-top{
            
        }
        .qr-outer{
            width:172px;
            height:163px;
            background-color: #fff;
            position: relative;
            margin: auto;
            top: 20px;
            border: 1px solid red;
            .qr-inner{
                width: 147px;
                height:147px;
                display: block;
                position: absolute;
                margin: auto;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

            }
        }
    }
</style>