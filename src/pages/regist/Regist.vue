<template>
    <div class="container-fluid"> 
        <Header/>
        <Body/>
        <Footer/>
    </div>
</template>

<script lang='ts'>
    import {defineComponent, onMounted} from 'vue';
    import Header from './components/Header.vue';
    import Body from './components/Body.vue';
    import Footer from '../../components/Footer.vue';

    // 引入工具ts
    import * as NotDone from '../../utils/notDone'

    export default defineComponent({
        components:{
            Header,
            Body,
            Footer,
        },
        setup () {
            onMounted(() => {
                (window as any)['notDone'] = (NotDone as any).notDone;
            })

            return {
                
            }
        }
    })
</script>

<style>
    
</style>