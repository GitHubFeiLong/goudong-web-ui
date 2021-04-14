<template>
    <div id="body">
        <div id="body-main">
            <div id="body-info">
                <div id="username-div">
                    <input v-model="username" type="text"  placeholder="请输入用户名/邮箱/已验证手机号"  autocomplete="off" maxlength="20">
                    <Hint :hint="hintUsername" v-show="hintUsernameShow"/>
                </div>
                <!--滑块验证-->
                <PuzzleVerify v-if="showPuzzle" @successPuzzle="successPuzzle" @closePuzzle="closePuzzle"/>
                <div id="puzzle-btn" @click="puzzleFunc">点击进行验证
                
                </div>
                <div id="next-step" @click="clickNextStep">下一步</div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent,ref } from 'vue'
    import Hint from './Hint.vue';
    import PuzzleVerify from '@/components/PuzzleVerify.vue';

    import * as HintEntity from '@/pojo/HintEntity';

    // 验证
    import * as Validate from '@/utils/validate';

    export default defineComponent ({
        components:{
            Hint,
            PuzzleVerify,
        },
        setup () {
            // 用户名
            let username = ref('');
            // 用户名输入框的提示信息
            let hintUsername = ref(HintEntity.USERNAME_HINT_2);
            // 是否显示用户名输入框的提示信息
            let hintUsernameShow = ref(true);
            // 滑块验证是否正确
            let puzzleSure = ref(false);
            // 是否显示滑块验证
            let showPuzzle = ref(false);
            // 绑定事件监听，父子组件通信
            const successPuzzle = () => {
                console.log("successPuzzle 调用了");
                puzzleSure.value = true;
                // 延迟关闭滑块验证码
                setTimeout(()=>{
                    showPuzzle.value = false;
                }, 1000);
            }

            // 关闭滑块验证事件监听
            const closePuzzle = () => {
                showPuzzle.value = false;
            }
            // 滑块验证码
            const puzzleFunc = () => {
                console.log('点击按钮');
                if (username.value.length > 0) {
                    showPuzzle.value = true;
                }
            }
            // 下一步
            const clickNextStep = () => {

            }
            return {
                username,
                hintUsername,
                hintUsernameShow,
                successPuzzle,
                closePuzzle,
                clickNextStep,
                puzzleFunc,
                showPuzzle,
            }
        }
    })
</script>

<style>
    #puzzle-warp{
        margin-top:-170px;
    }
</style>
<style lang='less' scoped>
    @import url('~@/assets/less/globalVariable.less');
    #body{
        height:@regist-main-height;
        background-color:#fff;
        display: flex;
        justify-content: center;
        #body-main{
            width:@regist-main-width;
            height:100%;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;
            border-bottom: solid 1px #e6e6e6;
            position:relative;
            #body-info{
                width:400px;
                height:230px;
                display: flex;
                flex-direction:column;
                justify-content: space-between;
                position: relative;
                margin-top:60px;
                #username-div,#puzzle-div {
                    position: relative;
                    border: solid 1px #ddd;
                    width: 398px;
                    height: 52px;
                    input{
                        width: 230px;
                        height: 50px;
                        border: 0;
                        padding-left: 20px;
                        font-size: 14px;
                        line-height: 48px;
                        font-family: Arial;
                    }
                    &:hover{
                        border: 1px solid #666;
                    }
                }
                #puzzle-btn{
                    border: solid 1px #ccc;
                    width: 398px;
                    height: 54px;
                    cursor: pointer;
                    text-align: center;
                    line-height: 54px;
                    font-size: 14px;
                    color: #333;
                    position:relative;
                    background-color:#f3f3f3;
                }
                #next-step{
                    border: 0;
                    width: 400px;
                    height: 54px;
                    background-color: #e2231a;
                    cursor: pointer;
                    text-align: center;
                    line-height: 54px;
                    color: #fff;
                    font-size: 16px;
                    font-family: "Microsoft YaHei","Hiragino Sans GB";
                    &:hover{
                        background-color:#c81623;
                    }
                }
            }
            
        }
    }
</style>