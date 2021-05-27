<template>
  <IndexActivity/>
  <IndexMenu/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import IndexActivity from './components/IndexActivity.vue';
import IndexMenu from './components/IndexMenu.vue';

export default defineComponent({
  components: {
    IndexActivity,
    IndexMenu,
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
