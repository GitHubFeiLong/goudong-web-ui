/* 底部 */
<template>
  <div class="row" id="fotter">
    <div class="links">
      <a rel="nofollow" target="_blank">关于我们</a>
      |
      <a rel="nofollow" target="_blank">联系我们</a>
      |
      <a rel="nofollow" target="_blank">人才招聘</a>
      |
      <a rel="nofollow" target="_blank">商家入驻</a>
      |
      <a rel="nofollow" target="_blank">广告服务</a>
      |
      <a rel="nofollow" target="_blank">手机狗东</a>
      |
      <a target="_blank">友情链接</a>
      |
      <a target="_blank">销售联盟</a>
      |
      <a target="_blank">狗东社区</a>
      |
      <a target="_blank">狗东公益</a>
      |
      <a clstag="pageclick|keycount|20150112ABD|9" target="_blank">English Site</a>
    </div>
    <div class="copyright">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50010602502314"
        style="display:inline-block;text-decoration:none;height:20px;line-height:20px;" >
        <img src="@/assets/imgs/备案图标.png" style="float:left;" />
        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">渝公网安备 50010602502314号</p>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="less" scoped>
@import url("~@/assets/index.less");
#fotter {
  height: 86px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: @main-width;
    height: 18px;
    line-height: 18px;
    font: 12px/150% Arial, Verdana, "\5b8b\4f53";
  }
  .links {
    margin-top: 20px;
    text-align: center;
    a {
      margin: 10px;
      color: #666 !important;
      &:hover {
        color: #e4393c !important;
        cursor: pointer;
      }
    }
  }
  .copyright {
    margin: 10px;
    text-align: center;
    color: #666 !important;
  }
}
</style>