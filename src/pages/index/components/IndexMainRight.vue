<!--main 右边的用户信息和快捷-->
<template>
  <div class="right-container">
    <div class="top">
      <div class="top-user">
        <a href="#"><img class="head-portrait" :src="user === null ? require('/src/assets/imgs/logo2.png') : user.headPortrait" raw="~@/assets/imgs/logo2.png" alt="log"/></a>
        <div class="txt">
          <p class="username-p"><a href="/login.html" class="username-a">Hi~{{user === null ? '欢迎逛京东！' : user.username}}</a></p>
          <p v-if="user === null"><a href="/login.html">登录</a> | <a href="/register.html">注册</a></p>
          <p class="icon-p" v-else>
            <a href="#" class="icon icon1"></a>
            <a href="#" class="icon icon2"></a>
            <a href="#" class="exit-a">退出</a>
          </p>
        </div>
      </div>
      <div class="top-btn">
        <button v-if="user === null" class="new-people-btn">新人福利</button>
        <button v-if="user === null" class="plus-btn">PLUS会员</button>
        <button v-else class="open-plus-btn">开通PLUS 平均省1210元/年</button>
      </div>
    </div>
    <div class="body">
      <p class="body-p">
        <span class="bulletin">狗东快报</span>
        <a class="more" href="#">更多 <span class="iconfont icon-arrow-right"></span></a>
      </p>
      <div class="body-main">
        <ul class="body-ul">
          <li class="body-li">
            <span class="body-li-span">HOT</span>
            <a href="#" class="body-li-a">OA走流程卡到崩溃？换上英特尔轻薄本体验顺滑操作</a>
          </li>
          <li class="body-li">
            <span class="body-li-span">热评</span>
            <a href="#" class="body-li-a">OA走流程卡到崩溃？换上英特尔轻薄本体验顺滑操作</a>
          </li>
          <li class="body-li">
            <span class="body-li-span">HOT</span>
            <a href="#" class="body-li-a">OA走流程卡到崩溃？换上英特尔轻薄本体验顺滑操作</a>
          </li>
          <li class="body-li">
            <span class="body-li-span">热议</span>
            <a href="#" class="body-li-a">OA走流程卡到崩溃？换上英特尔轻薄本体验顺滑操作</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="foot">
      <a :href="item.link" class="foot-item" v-for="item in arr" :key="item">
        <span :class="['iconfont', item.iconfont]" :style="{color: item.color}"></span>
        <span class="name">{{item.name}}</span>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import AuthorityUser from '@/pojo/AuthorityUser';
import LocalStorageUtil from '@/utils/LocalStorageUtil';
import { USER_LOCAL_STORAGE } from '@/pojo/ProjectConst';

export default defineComponent({
  setup() {
    const arr = [
      {
        name: '话费', iconfont: 'icon-huafei', link: '#', color: '#5aaae5',
      },
      {
        name: '机票', iconfont: 'icon-feijichang', link: '#', color: '#f2a53b',
      },
      {
        name: '酒店', iconfont: 'icon-jiudian', link: '#', color: '#41d7c7',
      },
      {
        name: '游戏', iconfont: 'icon-94', link: '#', color: '#f2a336',
      },
      {
        name: '加油卡', iconfont: 'icon-jiayouqia', link: '#', color: '#41d7c7',
      },
      {
        name: '火车票', iconfont: 'icon-huoche', link: '#', color: '#eb665d',
      },
      {
        name: '众筹', iconfont: 'icon-zhongchou', link: '#', color: '#41d7c7',
      },
      {
        name: '理财', iconfont: 'icon-licai', link: '#', color: '#5aaae5',
      },
      {
        name: '白条', iconfont: 'icon-baitiao', link: '#', color: '#eb665d',
      },
      {
        name: '电影票', iconfont: 'icon-dianying', link: '#', color: '#eb665d',
      },
      {
        name: '企业购', iconfont: 'icon-company', link: '#', color: '#5aaae5',
      },
      {
        name: '礼品卡', iconfont: 'icon-lipinqia', link: '#', color: '#f2a53b',
      },
    ];
    const user = reactive<AuthorityUser>(LocalStorageUtil.get(USER_LOCAL_STORAGE) as AuthorityUser);

    onMounted(() => {
      if (user != null && !user.headPortrait) {
        user.headPortrait = require('@/assets/imgs/default_head_portrait.jpg');
      }
    });
    return {
      arr,
      user,
    };
  },
});
</script>
<style lang="less" scoped>
  .right-container{
    margin-left: 10px;
    position: relative;
    z-index:5;
    width: 190px;
    height: 470px;
    background-color: #fff;
    color: #333;
    .top{
      width: 190px;
      height: 102px;
      position: relative;
      .top-user{
        width: 100%;
        height: 67px;
        padding: 14px 10px 10px 21px;
        box-sizing: border-box;
        .head-portrait{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #fff;
        }
        .txt{
          display: inline-block;
          font-size: 12px;
          position: absolute;
          top: 17px;
          margin-left: 12px;
          font: 12px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
          width: 106px;
          .username-p{
            .username-a{
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: inline-block;
            }
          }
          .icon-p{
            .icon{
              width: 20px;
              height: 20px;
              display: inline-block;
              margin-right: 5px;
            }
            .icon1{
              background-image: url('~@/assets/imgs/sprite1.png');
              background-position: -111px -21px;
            }
            .icon2{
              background-image: url('~@/assets/imgs/sprite1.png');
              background-position: -111px -46px;
            }
            .exit-a{
              position: absolute;
            }
          }

        }
      }
      .top-btn{
        width: 100%;
        height: 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        .new-people-btn,.plus-btn{
          height: 25px;
          width: 70px;
          margin: 0 5px;
          border-radius: 13px;
          text-align: center;
          transition: background .3s ease,color .3s ease;
          border: unset;
          cursor: pointer;
          font-size: 12px;
        }
        .new-people-btn{
          background-color: #e1251b;
          color: #fff;
          &:hover{
            background-color: #c81623;
          }
        }
        .plus-btn{
          background-color: #363634;
          color: #e5d790;
          &:hover{
            background-color: #c81623;
            color: #fff;
          }
        }
        .open-plus-btn{
          height: 25px;
          width: 162px;
          background-color: #fff;
          color: #e1251b;
          border-radius: 13px;
          text-align: center;
          transition: background .3s ease,color .3s ease;
          border: unset;
          cursor: pointer;
          font-size: 12px;
          box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, .2);
          &:hover{
            background-color: #c81623;
            color: #fff;
          }
        }
      }
      &::after{
        content: " ";
        position: absolute;
        height: 1px;
        left: 15px;
        right: 15px;
        background: linear-gradient(
          270deg
          ,white,#eeeeee,#eeeeee,white);

        bottom: 0;
      }
    }
    .body{
      width: 190px;
      height: 130px;
      position: relative;
      .body-p{
        height: 20px;
        padding: 10px 0 0;
        position: relative;
        line-height: 20px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 600;
        .bulletin{
          font-size: 14px;
          margin-left: 15px;
          color: #333;
        }
        .more{
          float: right;
          margin-right: 15px;
          font-size: 12px;
          color: #999;
          position: relative;
          .icon-arrow-right{
            float: right;
          }
        }
      }
      .body-main{
        position: relative;
        margin: 0 15px;
        height: 88px;
        .body-ul{
          font-size: 12px;
          color: #666;
          width: 160px;

          .body-li{
            height: 16px;
            overflow: hidden;
            line-height: 16px;
            width: 160px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-bottom: 3px;
            .body-li-span{
              padding: 0 3px;
              font-size: 12px;
              height: 16px;
              width: 35px;
              line-height: 16px;
              text-align: center;
              vertical-align: 0;
              color: #e1251b;
              background-color: rgba(225,37,27,.08);
            }
            .body-li-a{
              margin-left: 5px;
              color:#666;
            }
          }
        }
      }
      &::after{
        content: " ";
        position: absolute;
        height: 1px;
        left: 15px;
        right: 15px;
        background: linear-gradient(
          270deg
          ,white,#eeeeee,#eeeeee,white);

        bottom: 0;
      }
    }
    .foot{
      width: 190px;
      height: 240px;
      position: relative;
      box-sizing: border-box;
      padding: 5px 0.5px;
      display: flex;
      flex-wrap: wrap;
      .foot-item{
        width: 63px;
        height: 55px;
        display: block;
        .iconfont{
          display: block;
          font-size: 28px;
          width: 28px;
          height: 28px;
          margin-left: 16px;
        }
        .name{
          width: 63px;
          display: inline-block;
          text-align: center;
          font-size: 12px;
          height: 25px;
          line-height: 25px;
          border-bottom: 2px solid #fff;
          color: #333;
          transition: color .15s ease;
        }
        &:hover{
          .iconfont{
            color: @a-hover-color-01;
          }
          .name{
            color: @a-hover-color-01;
          }
        }
      }
    }
  }
</style>
