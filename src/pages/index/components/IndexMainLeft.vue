<!--main 左边的分类-->
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
            <div class="body-item" v-for="d in a.detailTypes" :key="d">
              <div class="title">
                <a href="#">{{d.name}}</a>
                <span class="iconfont icon-arrow-right"></span>
              </div>
              <ul class="body-ul">
                <li class="body-li" v-for="e in d.detailTypes" :key="e">
                  <a class="body-a" href="#">{{e.name}}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="right">
            <div class="right-top">
              <a href="#" v-for="f in a.littleBrand" :key="f" >
                <img :src="f.name" />
              </a>
            </div>
            <div class="right-bottom">
              <a href="#" v-for="g in a.bigBrand" :key="g">
                <img :src="g.name" />
              </a>
            </div>
          </div>
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
    const detailTypes = Array(2).fill(new Type('1', '电视', Array(30).fill(new Type('1', '玩3C'))));
    // eslint-disable-next-line import/no-unresolved
    const littleBrand = Array(8).fill(new Type('1', require('@/assets/imgs/little-brand1.jpg'), []));
    const bigBrand = Array(2).fill(new Type('1', require('@/assets/imgs/big-brand1.jpg'), []));

    const indexMainType = new IndexMainType(outTypes, inTypes, detailTypes, littleBrand, bigBrand);

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
    z-index:10;
    .out-ul{
      z-index:10;
      &:first-child{
        margin-top: 10px;
      }
      .out-li{
        width: 170px;
        height: 25px;
        padding-left: 18px;
        line-height: 25px;
        position: unset;
        z-index:10;
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
          height: 438px;
          position: absolute;
          left: 190px;
          top: -10px;
          padding: 20px 0 10px;
          display: none;
          border: 1px solid #f7f7f7;
          min-height: 438px;
          background-color: #fff;
          box-shadow: 2px 0 5px rgba(0, 0, 0, .3);
          z-index:10;
          .top{
            padding-left: 20px;
            width: 780px;
            height: 24px;
            position: absolute;
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
          .body{
            width: 780px;
            padding: 10px 0 10px 20px;
            font-size: 12px;
            top: 50px;
            position: absolute;
            .body-item{
              margin-bottom: 5px;
              .title{
                display: inline-block;
                width: 70px;
                color: #333;
                font-weight: 700;
                text-align: right;
                float: left;
                .icon-arrow-right{
                  float: right;
                }
                &:hover{
                  a,.icon-arrow-right{
                    color: @a-hover-color-01;
                  }
                }
              }
              .body-ul{
                height: 25px;
                width: 700px;
                .body-li{
                  padding: 0 7px;
                  height: 25px;
                  line-height: 25px;
                  .body-a{

                  }
                }
              }
            }
          }
          .right{
            width: 168px;
            height: 424px;
            position: absolute;
            right: 0;
            padding: 0 15px;
            .right-top{
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 10px;
              a{
                height: 35px;
                margin-bottom: 1px;
                img{
                  width: 83px;
                  height: 35px;
                  margin-left: 1px;
                  margin-bottom: 1px;
                }
              }
            }
            .right-bottom{
              width: 168px;
              height: 424px;
              display: flex;
              justify-content: flex-start;
              flex-direction: column;
              a{
                height: 134px;
                margin-bottom: 1px;
                img{
                  width: 168px;
                  height: 134px;
                  margin-bottom: 1px;
                }
              }
            }
          }
        }
      }
    }

  }
</style>
