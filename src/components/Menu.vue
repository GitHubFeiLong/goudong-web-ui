<!--顶部菜单-->
<template>
    <div id="menu">
        <div id="menu-main">
            <div id="index">
                <span class="iconfont icon-home"></span>
                <a href="#">京东首页</a>
            </div>
            <div id="location">
                <span class="iconfont icon-dingwei"></span>
                <a href="#">重庆</a>
            </div>

            <div id="menu-detail">
                <ul>
                    <li class="li1">
                        <a href="/login.html">你好，请登录</a>&nbsp;
                        <a href="/regist.html" >免费注册</a>
                    </li>
                    <li class='split-li'></li>
                    <li class="li2">
                        <a href="#">我的订单</a>
                    </li>
                    <li class='split-li'></li>
                    <li class="li3">
                        <a href="#">我的狗东</a>&nbsp;
                        <span class="iconfont icon-xia"></span>
                    </li>
                    <li class='split-li'></li>
                    <li class="li4"><a href="#">狗东会员</a></li>
                    <li class='split-li'></li>
                    <li class="li5">
                        <a href="#">企业采购</a>&nbsp;
                        <span class="iconfont icon-xia"></span>
                    </li>
                    <li class='split-li'></li>
                    <li class="li6">
                        <a href="#">客户服务</a>&nbsp;
                        <span class="iconfont icon-xia"></span>
                        </li>
                    <li class='split-li'></li>
                    <li class="li7">
                        <a href="#">网站导航</a>&nbsp;
                        <span class="iconfont icon-xia"></span>
                    </li>
                    <li class='split-li'></li>
                    <li class="li8"><a href="#">手机狗东</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent } from 'vue'
    export default defineComponent ({
    })
</script>

<style lang='less' scoped>
    @import url('~@/assets/less/globalVariable.less');
    @import url('~@/assets/fonts/iconfont.css');
    // 未点击样式
    a:link{
        color:@a-link-color-01;
    }
    // 点击后样式
    a:visited{
        color:@a-link-color-01;
    }
    #menu{
        height: 30px;
        width: 100%;
        line-height: 30px;
        background: #e3e4e5;
        border-bottom: solid 1px #ddd;
        color:@a-link-color-01;
        display: flex;
        justify-content: center;
        #menu-main {
            width: @regist-main-width;
            height:30px;
            display: flex;
            font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
            -webkit-font-smoothing: antialiased;
            position: relative;
            #index{
                width:69px;
                height:100%;
                padding:0 2px 0 2px;
                span{
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    line-height: 30px;
                }
                a {
                    margin-left:5px;
                }
            }
            #location{
                width:43.75px;
                height:30px;
                padding:0 23px 0 10px;
                span{
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    line-height: 30px;
                }
                a {
                    margin-left:3px;
                }
            }
            #menu-detail{
                width:695.5px;
                height:30px;
                position: absolute;
                right: 0;
                ul{
                    list-style-type: none;
                    display: inline-block;
                    list-style-type: none;
                    margin:0;
                    padding:0;
                    position: relative;
                    li[class^='li'] {
                        display: inline-block;
                        height:30px;
                        line-height: 30px;
                        padding: 0 2px;
                        div{
                            float: left;
                            padding: 0 8px;
                        }
                    }

                    .split-li{
                        width: 1px;
                        height: 12px;
                        margin-top: 9px;
                        padding: 0;
                        background: #ccc;
                        display: inline-block;
                        overflow: hidden;
                    }
                    .li1{
                        width: 127.5px;
                        margin-right: 10px;
                        a:nth-child(2){
                            color: @a-hover-color-01;
                        }
                    }
                    .li2{
                        width:64px;
                        a{
                            padding:0 8px;
                        }
                    }
                    .li3{
                        width:82px;
                        a{
                            padding-left: 8px;
                        }
                        span{
                            font-size:6px;
                        }
                    }
                    .li4{
                        width:64px;
                        a{
                            padding: 0 8px;
                        }
                    }
                    .li5{
                        width:82px;
                        a{
                            padding-left: 8px;
                        }
                        span{
                            font-size:6px;
                        }

                    }
                    .li6{
                        width:82px;
                        a{
                            padding-left: 8px;
                        }
                        span{
                            font-size:6px;
                        }
                    }
                    .li7{
                        width:81px;
                        padding: 0px 1px 0px 2px;
                        a{
                            padding-left: 8px;
                        }
                        span{
                            font-size:6px;
                        }
                    }
                    .li8{
                        width:64px;
                        a{
                            padding: 0 8px;
                        }
                    }
                }
            }
            a{
                display: inline-block;
                &:hover{
                    color: @a-hover-color-01;
                }
            }

        }
    }
</style>
