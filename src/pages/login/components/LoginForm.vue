<template>
    <div id="login-form">
        <Hint :hint="hint"/>
    </div>
</template>

<script>
    import Hint from './Hint';
    export default {
        components:{
            Hint
        },
        data () {
            return {
                hint:`京东不会以任何理由要求您转账汇款，谨防诈骗。`,
            }
        }

    }
</script>

<style lang="less" scoped>
    #login-form{
        width:346px;
        height:400px;
        background-color:#fff;
        position: absolute;
        right: 0;
        top: 10px;
    }
</style>