<template>
    <Menu/>
    <Header :title='HeaderTitle'/>
    <Body/>
    <Footer/>
</template>

<script lang='ts'>
    import { defineComponent, ref} from 'vue'
    import Menu from '@/components/Menu.vue'
    import Header from '@/components/RegisterHeader.vue'
    import Footer from '@/components/Footer.vue';
    import Body from './components/Body.vue';
    export default defineComponent ({
        components:{
            Menu,
            Header,
            Body,
            Footer,
        },
        setup(){
            let HeaderTitle = ref('找回密码');
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
