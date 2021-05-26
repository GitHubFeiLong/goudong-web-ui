<!--注册页面和找回密码页面的 头部组件（有图标）-->
<template>
    <div id="header">
        <div id="header-main">
            <div class="big-logo" @click="notDone"></div>
            <div class="header-info">{{title}}</div>
            <slot name="header"></slot>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

// 引入工具ts
import NotDone from '@/utils/NotDone';

export default defineComponent({
  props: {
    title: String,
  },
  setup() {
    function notDone() {
      NotDone();
    }
    return {
      notDone,
    };
  },
});
</script>

<style lang='less' scoped>
    #header {
        height:110px;
        background-color:#fff;
        display: flex;
        justify-content: center;
        background: url('~@/assets/imgs/headbg.jpg') repeat-x left bottom;
        #header-main{
            width: @regist-main-width;
            height: 100%;
            .big-logo{
                width: 160px;
                height: 50px;
                float: left;
                margin-top: 24px;
                cursor: pointer;
                background-image: url('~@/assets/imgs/icon.png');
            }
            .header-info {
                height: 34px;
                width:96px;
                line-height: 34px;
                font-size: 24px;
                color: #333;
                margin-top: 34px;
                float: left;
            }
            .go-login{
                height:21px;
                font-size: 16px;
                float: right;
                margin-top: 55px;
                color: #999;
                a{
                    color:#e22;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }

        }
    }
</style>
