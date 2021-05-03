<template>
    <Header :title='HeaderTitle'/>
    <Body/>
    <Footer/>
</template>

<script lang='ts'>
    import { defineComponent, ref} from 'vue'
    import Header from '@/components/RegistHeader.vue'
    import Body from './components/Body.vue'
    import Footer from '@/components/Footer.vue';
    export default defineComponent ({
        components:{
            Header,
            Body,
            Footer,
        },
        setup(){
            let HeaderTitle = ref('联合登录');
            return {
                HeaderTitle
            }
        }
    })
</script>

<style>
  #app{
    position: relative;
  }
</style>
<style lang='less' scoped>

</style>
