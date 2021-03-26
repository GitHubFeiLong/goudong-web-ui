<template>
    <Menu/>
    <Header :title='HeaderTitle'/>
</template>

<script lang='ts'>
    import { defineComponent, ref} from 'vue'
    import Menu from '@/components/Menu.vue'
    import Header from '@/components/RegistHeader.vue'
    export default defineComponent ({
        components:{
            Menu,
            Header
        },
        setup(){
            let HeaderTitle = ref('找回密码');
            return {
                HeaderTitle
            }
        }
    })
</script>

<style lang='less' scoped>

</style>