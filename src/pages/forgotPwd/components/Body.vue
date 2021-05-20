<template>
    <div id="body">
        <div id="body-main">
          <BodyStep1 v-if="stepVal==='BodyStep1'" @step1Complete="step1Complete"/>
          <BodyStep2 v-else-if="stepVal==='BodyStep2'" @step2Complete="step2Complete"/>
          <BodyStep3 v-else-if="stepVal==='BodyStep3'" @step2Complete="step2Complete"/>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import BodyStep1 from '@/pages/forgotPwd/components/BodyStep1.vue';
import BodyStep2 from '@/pages/forgotPwd/components/BodyStep2.vue';
import BodyStep3 from '@/pages/forgotPwd/components/BodyStep3.vue';

export default defineComponent({
  components: {
    BodyStep1,
    BodyStep2,
    BodyStep3,
  },
  setup() {
    // 显示哪个个步骤（组件）
    const steps = ['BodyStep1', 'BodyStep2', 'BodyStep3'];
    const stepVal = ref(steps[0]);
    // 定义一个 第一个子组件步骤完成的回调
    const step1Complete = () => {
      // eslint-disable-next-line prefer-destructuring
      stepVal.value = steps[1];
    };
    const step2Complete = () => {
      // eslint-disable-next-line prefer-destructuring
      stepVal.value = steps[2];
    };
    return {
      stepVal,
      step1Complete,
      step2Complete,
    };
  },
});
</script>

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
        }
    }
</style>
