<template>
  <div class="container-fluid">
    <Header :title='HeaderTitle'>
      <template #header>
        <div class="go-login">
          已有账号？
          <a href="/login.html">请登录></a>
        </div>
      </template>
    </Header>
    <Body/>
    <Footer/>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Header from '@/components/RegisterHeader.vue';
import Footer from '@/components/Footer.vue';
import Body from './components/Body.vue';

export default defineComponent({
  components: {
    Header,
    Body,
    Footer,
  },
  setup() {
    const HeaderTitle = ref('欢迎注册');
    const goLoginSlot = ref('goLoginSlot');

    return {
      HeaderTitle,
      goLoginSlot,
    };
  },
});
</script>

<style lang="less" scoped>
  .go-login {
    height: 21px;
    font-size: 16px;
    float: right;
    margin-top: 55px;
    color: #999;

    a {
      color: #e22;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
