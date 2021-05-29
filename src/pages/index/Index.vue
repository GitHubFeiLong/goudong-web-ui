<template>
  <IndexActivity/>
  <IndexMenu/>
  <IndexSearch/>
  <IndexMain/>
  <IndexSecKill/>
  <div style="width: 100%; height: 1000px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import IndexActivity from './components/IndexActivity.vue';
import IndexMenu from './components/IndexMenu.vue';
import IndexSearch from './components/IndexSearch.vue';
import IndexMain from './components/IndexMain.vue';
import IndexSecKill from './components/IndexSecKill.vue';

export default defineComponent({
  components: {
    IndexActivity,
    IndexMenu,
    IndexSearch,
    IndexMain,
    IndexSecKill,
  },
  setup() {
    return { };
  },
});
</script>

<style lang="less">
  html{
    background-color: @index-background-color;
  }
</style>
