<template>
  <IndexActivity/>
  <IndexMenu/>
  <IndexSearch/>
  <IndexMain/>
  <IndexSecKill/>
  <IndexActivityFloor/>
  <IndexFeatureOptimization/>
  <div style="width: 100%; height: 1000px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import IndexStore from '@/store/IndexStore';

import IndexActivity from './components/IndexActivity.vue';
import IndexMenu from './components/IndexMenu.vue';
import IndexSearch from './components/IndexSearch.vue';
import IndexMain from './components/IndexMain.vue';
import IndexSecKill from './components/IndexSecKill.vue';
import IndexActivityFloor from './components/IndexActivityFloor.vue';
import IndexFeatureOptimization from "@/pages/index/components/IndexFeatureOptimization.vue";

export default defineComponent({
  components: {
    IndexActivity,
    IndexMenu,
    IndexSearch,
    IndexMain,
    IndexSecKill,
    IndexActivityFloor,
    IndexFeatureOptimization,
  },
  setup() {
    // 距顶部滚动条
    let scrollHeight = 730;
    const handleScroll = () => {
      // 使用 document.documentElement.scrollTop=0 回到顶部
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > scrollHeight && !IndexStore.getters.fixed) {
        IndexStore.dispatch('changeOneScrollClass');
      } else if (scrollTop < scrollHeight && IndexStore.getters.fixed) {
        IndexStore.dispatch('changeRawScrollClass');
      }
    };
    onMounted(() => {
      window.addEventListener('scroll', handleScroll, true);
    });
    return { };
  },
});
</script>

<style lang="less">
  html{
    background-color: @index-background-color;
  }
</style>
