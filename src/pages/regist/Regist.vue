<template>
    <div class="container-fluid"> 
        <Header :title='HeaderTitle' >
            <template #header>
                <div class="go-login">
                    已有账号？
                    <a href="/login">请登录></a>
                </div>
            </template>
        </Header>
        <Body/>
        <Footer/>
    </div>
</template>

<script lang='ts'>
    import {defineComponent, onMounted, ref} from 'vue';
    import Header from '@/components/RegistHeader.vue';
    // import Header from './components/Header.vue';
    import Body from './components/Body.vue';
    import Footer from '@/components/Footer.vue';

    // 引入工具ts
    import * as NotDone from '@/utils/notDone'

    export default defineComponent({
        components:{
            Header,
            Body,
            Footer,
        },
        setup () {
            let HeaderTitle = ref('欢迎注册');
            let goLoginSlot = ref('goLoginSlot');
            onMounted(() => {
                (window as any)['notDone'] = (NotDone as any).notDone;
            })

            return {
                HeaderTitle,
                goLoginSlot
            }
        }
    })
</script>

<style>
    
</style>