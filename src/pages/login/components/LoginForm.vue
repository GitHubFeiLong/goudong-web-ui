/* 登录方式块 */
<template>
    <div id="login-form">
        <Hint :hint="hint"/>
        <div id="login-methods">
            <router-link class="qr-code-method" to="/QRCode"> <div class="middle-wire">扫码登录</div> </router-link>
            <router-link class="account-method" to="/Account"><div>账户登录</div></router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Hint from './Hint';

export default {
  components: {
    Hint,
  },
  data() {
    return {
      hint: '京东不会以任何理由要求您转账汇款，谨防诈骗。',
    };
  },

};
</script>

<style lang="less" scoped>
    @font-color:#666;
    .method(){
        width:50%;
        height:100%;
        display: inline-block;
        position: relative;
        div{
            width:100%;
            display: inline-block;
            position: absolute;
            margin: auto;
            height: 18px;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            line-height: 18px;
        }
        &:hover{
            color:#e4393c !important;
            font-weight: 700;
        }

    }
    #login-form{
        width:346px;
        // height:437.89px;
        background-color:#fff;
        position: absolute;
        right: 0;
        top: 10px;
        #login-methods{
            width:100%;
            height:55px;
            color:@font-color;
            font-size: 18px;
            text-align: center;
            font-family: "microsoft yahei";
            border-bottom: 1px solid #f4f4f4;
            .qr-code-method{
                .method();
                .middle-wire{
                    border-right: 1px solid #f4f4f4;
                }
            }
            .account-method{
                .method()
            }
            .router-link-active{
                color:#e4393c !important;
                font-weight: 700;
            }
        }
    }
</style>
