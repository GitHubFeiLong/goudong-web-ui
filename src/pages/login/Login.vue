<template>
    <div class="container-fluid">
        <Header/>
        <Body/>
        <Footer/>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Footer from '@/components/Footer.vue';
import Header from './components/Header.vue';
import Body from './components/Body.vue';

export default defineComponent({
  components: {
    Header,
    Body,
    Footer,
  },
});
</script>

<style>

</style>
