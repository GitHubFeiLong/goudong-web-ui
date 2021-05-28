<template>
  <div class="left-container">
    <ul class="out-ul">
      <li class="out-li" v-for="a in arr" :key="a">
        <a class="out-a" href="#" v-for="b in a.outTypes" :key="b">{{b.name}}</a>
        <div class="detail">
          <div class="top">
            <ul class="top-ul">
              <li class="top-li" v-for="c in a.inTypes" :key="c">
                <a href="#" class="top-a">{{c.name}}</a>
                <span class="iconfont icon-arrow-right"></span>
              </li>
            </ul>
          </div>
          <div class="body">
            
          </div>
          <div class="right"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import IndexMainType from '@/pojo/IndexMainType';
import Type from '@/pojo/Type';

export default defineComponent({
  setup() {
    const outTypes = [new Type('1', '家用电器'), new Type('2', '手机'), new Type('3', '数码')];
    const inTypes = [new Type('1', '玩3C'), new Type('2', '手机频道'), new Type('3', '网上营业厅'), new Type('3', '智能数码'), new Type('3', '配件频道'), new Type('3', '影像Club')];
    const detailTypes = [new Type('1', '手机频道', [new Type('1', '玩3C'), new Type('1', '玩3C'),new Type('1', '玩3C'),new Type('1', '玩3C')])];

    const indexMainType = new IndexMainType(outTypes, inTypes, detailTypes);

    const arr = Array(15).fill(indexMainType);
    onMounted(() => {
      console.log(arr);
    });
    return {
      arr,
    };
  },
});
</script>
<style lang="less" scoped>
  .left-container{
    width: 190px;
    height: 470px;
    background-color: #fff;
    position: relative;
    .out-ul{
      &:first-child{
        margin-top: 10px;
      }
      .out-li{
        width: 170px;
        height: 25px;
        padding-left: 18px;
        line-height: 25px;
        position: unset;
        &:hover{
          background-color: #d9d9d9;
          .detail{
            display: block;
          }
        }
        .out-a{
          font-size: 14px;
          color: #333;
          -webkit-transition: color .2s ease;
          transition: color .2s ease;
          &::after{
            content: '/';
            margin: 0 2px;
          }
        }
        & a:last-of-type::after{
          content: '';
        }
        .detail{
          width: 998px;
          height: 454px;
          position: absolute;
          left: 190px;
          top: 0;
          padding: 20px 0 10px;
          display: none;
          border: 1px solid #f7f7f7;
          min-height: 468px;
          background-color: #fff;
          box-shadow: 2px 0 5px rgba(0, 0, 0, .3);
          .top{
            position: absolute;
            padding-left: 20px;
            width: 780px;
            height: 24px;
            .top-ul{
              .top-li{
                height: 24px;
                margin-right: 10px;
                line-height: 21px;
                padding: 0 10px 0 10px;
                background-color: #333;
                position: relative;
                &:hover{
                  background-color: #c81623;
                }
                .top-a{
                  color: #fff !important;
                  font-size: 12px;
                }
                .icon-arrow-right{
                  font-size: 18px;
                  color: #fff;
                  float: right;
                  margin-top: 2px;
                }
              }
            }
          }
        }
      }
    }

  }
</style>
