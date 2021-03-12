<template>
    <div class="row" id="body">
        <div id="body-main">
            <LoginForm/>
        </div>
    </div>
</template>

<script>
    import LoginForm from './LoginForm'
    export default {
        components:{
            LoginForm
        }
    }
</script>

<style lang="less" scoped>
    #body{
        height: 475px;
        width: 100%;
        background-color: #000;
        // background-color: #e93854;
        display: flex;
        #body-main{
            width:990px;
            height:100%;
            margin: auto;
            background-image: url("~@/assets/imgs/login-bg.png");
            position: relative;
            // background-color: red;
        }
    }  
</style>