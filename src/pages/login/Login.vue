<template>
    <div class="container-fluid">
        <Header/>
        <Body/>
        <Footer/>
    </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';
import {ElNotification} from 'element-plus';
import Footer from '@/components/Footer.vue';
import Header from './components/Header.vue';
import Body from './components/Body.vue';

export default defineComponent({
  components: {
    Header,
    Body,
    Footer,
  },
  setup(){
    ElNotification({
      title: '提示',
      message: '账号 admin，密码 admin',
      duration: 60000,
    });
    return {};
  }
});
</script>

<style>

</style>
