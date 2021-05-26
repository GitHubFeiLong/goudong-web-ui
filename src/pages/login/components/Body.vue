/* 中间体 */
<template>
    <div class="row" id="body">
        <div id="body-main">
            <LoginForm/>
        </div>
    </div>
</template>

<script>
import LoginForm from './LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>

<style lang="less" scoped>
    #body{
        height: 475px;
        width: 100%;
        background-color: #e93854;
        display: flex;
        #body-main{
            // width:990px;
            width:@login-main-width;
            height:100%;
            margin: auto;
            background-image: url("~@/assets/imgs/login-bg1.png");
            position: relative;
        }
    }
</style>
