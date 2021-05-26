<!--顶部活动信息-->
<template>
    <div class="outer">
        <div class="inner">

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>

<style lang="less" scoped>
    .outer{
        width: 100%;
        height: 80px;
        background-color: rgb(170, 86, 242);
        .inner{
            width: @index-main-width;
            background-color: red;
        }
    }

</style>
