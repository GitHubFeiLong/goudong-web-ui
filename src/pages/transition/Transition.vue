<template>
  <IndexActivity/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { resolvePageParam } from '@/utils/HtmlParamUtil';

import PageParam from '@/pojo/PageParam';
import { AUTHORIZATION } from '@/pojo/ProjectConst';
import LocalStorageUtil from '@/utils/LocalStorageUtil';

export default defineComponent({

  setup() {
    onMounted(() => {
      // 获取参数对象
      const pageParam: PageParam = resolvePageParam();

      // 参数逻辑处理
      // 本地存储token
      if (pageParam.token) {
        LocalStorageUtil.set(AUTHORIZATION, pageParam.token);
      }

      // 最后跳转指定的页面
      if (pageParam.redirectUrl) {
        window.location.href = pageParam.redirectUrl;
      }
    });

    return {

    };
  },
});
</script>

<style lang="less">

</style>
