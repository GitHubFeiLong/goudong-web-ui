<template>
    <div id="email">
        <div id="email-phone">
            <label for="">中国 0086</label>
            <input type="">
        </div>
        <div id="email-verify"></div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent } from 'vue'
    export default defineComponent ({
    })
</script>

<style lang='less'>
    #email{
        width: 400px;
        height: 246px;
        background: pink;
        position: relative;
        margin-top: 50px;
        #email-phone {
            position: relative;
            border: solid 1px #ddd;
            width: 398px;
            height: 52px;
            z-index: 0;
        }
    }
</style>