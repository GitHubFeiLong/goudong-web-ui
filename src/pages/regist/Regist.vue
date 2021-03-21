<template>
    <div class="container-fluid"> 
        <Header/>
        <Body/>
        <Footer/>
    </div>
</template>

<script>
    import Header from './components/Header';
    import Body from './components/Body';
    import Footer from './components/Footer';

    export default {
        components:{
            Header,
            Body,
            Footer,
        }
    }
</script>

<style>
    
</style>