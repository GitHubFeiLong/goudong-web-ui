<!--遮罩-->
<template>
  <div class="dialog-mask" :style="dialogStyle" @click="hidden"></div>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue';
    export default defineComponent({
        setup(){
          let dialogStyle = ref({width:"0", height:"0"});
          const show = () => {
            dialogStyle.value = {width: "100%", height: "100%"}
          }
          const hidden = () => {
            dialogStyle.value = {width: "0", height: "0"}
          }
          return {
            dialogStyle,
            hidden
          }
        }
    });
</script>

<style lang="less" scoped>
  .dialog-mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0,0,0,.7);
    z-index: 10;
  }
</style>
