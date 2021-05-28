<template>
  <IndexActivity/>
  <IndexMenu/>
  <IndexSearch/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import IndexActivity from './components/IndexActivity.vue';
import IndexMenu from './components/IndexMenu.vue';
import IndexSearch from './components/IndexSearch.vue';

export default defineComponent({
  components: {
    IndexActivity,
    IndexMenu,
    IndexSearch,
  },
  setup() {
    onMounted(() => {

    });
    return {

    };
  },
});
</script>

<style lang="less">

</style>
