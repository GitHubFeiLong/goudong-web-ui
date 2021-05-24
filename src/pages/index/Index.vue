<template>

</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { resolvePageParam } from '@/utils/HtmlParamUtil';
import * as a from '@/utils/LocalStorageUtil';

import PageParam from '@/pojo/PageParam';
import { AUTHORIZATION } from '@/pojo/ProjectConst';
import LocalStorageUtil from '@/utils/LocalStorageUtil';


export default defineComponent({
  setup() {
    onMounted(() => {
      const pageParam = resolvePageParam();
      // 本地存储token
      if (pageParam.token) {
        LocalStorageUtil.set(AUTHORIZATION, pageParam.token);
      }
    });
    return {

    };
  },
});
</script>

<style lang="less">

</style>
