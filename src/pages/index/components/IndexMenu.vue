<!--顶部菜单-->
<template>
  <div id="menu">
    <div id="menu-main">
      <div @mouseenter="showDetail.showCityBoxCard=true" @mouseleave="showDetail.showCityBoxCard=false" id="location">
        <div class="header">
          <span class="iconfont icon-dingwei"></span>
          <a href="#">{{city}}</a>
        </div>
        <el-card class="location-box-card" v-show="showDetail.showCityBoxCard">
          <div :key="item.id" class="city-item" v-for="item in cityArr">
            <span :class="{'checked' : item.checked, 'city-span' : true}"
                  @click="checkedCity(item.id)">{{item.name}}</span>
          </div>
        </el-card>
      </div>

      <div id="menu-detail">
        <ul>
          <li class="li1" v-if="user === null">
            <a href="/login.html">你好，请登录</a>&nbsp;
            <a href="/register.html">免费注册</a>
          </li>
          <li v-else class="li1 li1-username"
              @mouseenter="showDetail.showUserBoxCard=true"
              @mouseleave="showDetail.showUserBoxCard=false"
          >
            <div class="header">
              <a class="username" href="/login.html">{{user.username}}</a>
              <span class="user-icon"></span>
              <span class="iconfont icon-xia"></span>
            </div>
            <el-card class="username-box-card" v-if="showDetail.showUserBoxCard">
              <div class="top">
                <a href="#"><img src="@/assets/imgs/default_head_portrait.jpg" alt="头像" class="head-portrait"/></a>
                <a href="#" class="user-icon"></a>
                <a href="#" class="describe">开通PLUS平均省1210元/年></a>
                <a href="#" class="exit" @click="logout()">退出</a>
              </div>
              <div class="bottom">
                <el-carousel
                  :interval="4000"
                  height="88px"
                  indicator-position="none"
                  autoplay="false"
                  loop=false
                >
                  <el-carousel-item v-for="item in privilegeArr" :key="item">
                    <a href="#" class="item" v-for="a in item" :key="a">
                      <div class="img" :style="{ backgroundPosition: a.position }"></div>
                      <span class="describe">{{a.describe}}</span>
                    </a>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-card>
          </li>
          <li class='split-li'></li>
          <li class="li2">
            <a href="#">我的订单</a>
          </li>
          <li class='split-li'></li>
          <li class="li3">
            <a href="#">我的狗东</a>&nbsp;
            <span class="iconfont icon-xia"></span>
          </li>
          <li class='split-li'></li>
          <li class="li4"><a href="#">狗东会员</a></li>
          <li class='split-li'></li>
          <li class="li5">
            <a href="#">企业采购</a>&nbsp;
            <span class="iconfont icon-xia"></span>
          </li>
          <li class='split-li'></li>
          <li class="li6">
            <a href="#">客户服务</a>&nbsp;
            <span class="iconfont icon-xia"></span>
          </li>
          <li class='split-li'></li>
          <li class="li7">
            <a href="#">网站导航</a>&nbsp;
            <span class="iconfont icon-xia"></span>
          </li>
          <li class='split-li'></li>
          <li class="li8"><a href="#">手机狗东</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, onMounted, reactive, ref,} from 'vue';
import City from '@/pojo/City';
import LocalStorageUtil from '@/utils/LocalStorageUtil';
import {TOKEN_LOCAL_STORAGE, USER_LOCAL_STORAGE} from '@/constant/LocalStorageConst';
import IndexStore from '@/store/IndexStore';
import {logoutApi} from "@/api/GoudongOauth2ServerApi";
import {LOGIN_PAGE} from "@/constant/PageUriConst"
import User from "@/pojo/User";

export default defineComponent({
  setup() {
    const city = ref<string>('');
    const user = ref<User>(new User());
    const tempArr = [
      { name: '北京', id: '1', checked: true },
      { name: '上海', id: '2', checked: false },
      { name: '天津', id: '3', checked: false },
      { name: '重庆', id: '4', checked: false },
      { name: '河北', id: '5', checked: false },
      { name: '山西', id: '6', checked: false },
      { name: '河南', id: '7', checked: false },
      { name: '辽宁', id: '8', checked: false },
      { name: '吉林', id: '9', checked: false },
      { name: '黑龙江', id: '10', checked: false },
      { name: '内蒙古', id: '11', checked: false },
      { name: '江苏', id: '12', checked: false },
      { name: '山东', id: '13', checked: false },
      { name: '安徽', id: '14', checked: false },
      { name: '浙江', id: '15', checked: false },
      { name: '福建', id: '16', checked: false },
      { name: '湖北', id: '17', checked: false },
      { name: '湖南', id: '18', checked: false },
      { name: '广东', id: '19', checked: false },
      { name: '广西', id: '20', checked: false },
      { name: '江西', id: '21', checked: false },
      { name: '四川', id: '22', checked: false },
      { name: '海南', id: '23', checked: false },
      { name: '贵州', id: '24', checked: false },
      { name: '云南', id: '25', checked: false },
      { name: '西藏', id: '26', checked: false },
      { name: '陕西', id: '27', checked: false },
      { name: '甘肃', id: '28', checked: false },
      { name: '青海', id: '29', checked: false },
      { name: '宁夏', id: '30', checked: false },
      { name: '新疆', id: '31', checked: false },
      { name: '陕西', id: '32', checked: false },
      { name: '港澳', id: '33', checked: false },
      { name: '台湾', id: '34', checked: false },
      { name: '钓鱼岛', id: '35', checked: false },
      { name: '海外', id: '36', checked: false },
    ];
    const cityArr: Array<City> = [];
    for (let i = 0; i < tempArr.length; i += 1) {
      cityArr[i] = new City(tempArr[i].id, tempArr[i].name, tempArr[i].checked);
    }

    // 显示城市详情
    const showDetail = reactive({
      showCityBoxCard: false, // 城市
      showUserBoxCard: false, // 用户详情
    });
    const checkedCity = (id: string) => {
      cityArr.forEach((item: City) => {
        // eslint-disable-next-line no-param-reassign
        item.checked = false;
        if (item.id === id) {
          // eslint-disable-next-line no-param-reassign
          item.checked = true;
          city.value = item.name as string;


        }
        // 重新渲染class
        showDetail.showCityBoxCard = false;
        showDetail.showCityBoxCard = true;
      });
    };

    // 特权数组
    const privilegeArr = [
      [
        { position: '-176px -59px', describe: '免费试用' },
        { position: '0 -59px', describe: '运费单免' },
        { position: '0 -118px', describe: '生日特权' },
      ],
      [
        { position: '0 -118px', describe: '生日特权' },
        { position: '-176px 0px', describe: '闪电退款' },
        { position: '-176px -118px', describe: '上门换新' },
      ],
      [
        { position: '-176px -118px', describe: '上门换新' },
        { position: '-59px -177px', describe: '京享值礼包' },
        { position: '-176px -177px', describe: '贵宾专线' },
      ],
      [
        { position: '-176px -177px', describe: '贵宾专线' },
        { position: '-117px -58px', describe: '运费双免' },
      ],
    ];

    onMounted(() => {
      city.value = '重庆';
      user.value = LocalStorageUtil.get(USER_LOCAL_STORAGE) as User;

      IndexStore.commit('initUser', user.value);
      console.log(user.value);
    });

    /**
     * 退出登录
     */
    const logout = () => {
      console.log("退出登录")
      // 清空本地缓存用户数据
      logoutApi().then((response) => {
        // 清除 token
        LocalStorageUtil.remove(TOKEN_LOCAL_STORAGE);
        // 清除 用户信息
        LocalStorageUtil.remove(USER_LOCAL_STORAGE);
        // 重定向到登录页面
        window.location.href=LOGIN_PAGE;
      });
    }
    return {
      city,
      cityArr,
      showDetail,
      checkedCity,
      user,
      privilegeArr,
      logout,
    };
  },
});
</script>


<style lang="less">
  .location-box-card > .el-card__body, .username-box-card > .el-card__body { padding: 0px; }

  .location-box-card, .username-box-card {
    border-radius: unset !important;
    -webkit-box-shadow: 1px 2px 1px rgb(0 0 0 / 10%) !important;
    box-shadow: 1px 2px 1px rgb(0 0 0 / 10%) !important;
    border-left: 1px solid #ccc !important;
    border-bottom: 1px solid #ccc !important;
    border-right: 1px solid #ccc !important;
  }


</style>

<style lang='less' scoped>
  // 未点击样式
  a:link {
    color: @a-link-color-01;
  }

  // 点击后样式
  a:visited {
    color: @a-link-color-01;
  }

  #menu {
    box-sizing: content-box;
    height: 30px;
    width: 100%;
    line-height: 30px;
    background: #e3e4e5;
    border-bottom: solid 1px #ddd;
    color: @a-link-color-01;
    display: flex;
    justify-content: center;
    z-index: 100;
    #menu-main {
      width: @regist-main-width;
      height: 30px;
      display: flex;
      font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "\u5b8b\u4f53", sans-serif;
      -webkit-font-smoothing: antialiased;
      position: relative;
      z-index: 100;
      #location {
        height: 30px;
        width: 70px;
        margin-left: 10px;
        z-index: 20;
        .header {
          width: 100%;
          height: 100%;
          padding: 0 7px;
          border-left: 1px solid #e3e4e5;
          border-right: 1px solid #e3e4e5;

          .icon-dingwei {
            width: 16px;
            height: 16px;
            display: inline-block;
            line-height: 30px;
            color: #f10215;
            font-weight: 600;
          }

          a {
            margin-left: 3px;
          }

          &:hover {
            cursor: pointer;

            a {
              color: @a-hover-color-01;
            }
          }
        }

        .location-box-card {
          width: 300px;
          padding: 10px;
          color: @a-link-color-01;
          z-index: 20;
          .city-item {
            height: 24px;
            width: 60px;
            display: inline-block;

            .city-span {
              height: 24px;
              line-height: 24px;
              display: inline-block;
              padding: 0 8px;

              &:hover {
                cursor: pointer;
                color: #e33333;
                background-color: #f4f4f4;
              }
            }

            .checked {
              color: #fff !important;
              background-color: #f10215 !important;
            }

          }
        }

        &:hover {
          background-color: #fff;
        }
      }

      #menu-detail {
        width: 710px;
        height: 30px;
        position: absolute;
        right: 0;

        ul {
          list-style-type: none;
          display: inline-block;
          list-style-type: none;
          margin: 0;
          padding: 0;
          position: relative;
          li[class^='li'] {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding: 0 2px;
            position: relative;
            .icon-xia {
              font-size: 6px;
            }
          }

          .split-li {
            width: 1px;
            height: 12px;
            margin-top: 9px;
            padding: 0;
            background: #ccc;
            display: inline-block;
            overflow: hidden;
          }

          .li1 {
            width: 130px;
            margin-right: 8px;
            a:nth-child(2) {
              color: @a-hover-color-01;
            }
          }

          .li1-username{
            width: 130px;
            a:nth-child(2){
              color: @a-link-color-01;
              &:hover{
                color: @a-hover-color-01;
              }
            }
            .header{
              position: relative;
              display: inline-block;
              width: 100%;
              padding:0 5px;
              .username{
                width: 60px;
                height: 28px;
                padding-right: 6px;
                overflow: hidden;
                vertical-align: top;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .user-icon{
                display: inline-block;
                background-image: url('~@/assets/imgs/vip-all.png');
                width: 38px;
                height: 16px;
                background-position: 50px -20px;
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                margin-left: -5px;
              }
              .icon-xia{
                position: absolute;
                right: 15px;
              }
            }
            .username-box-card {
              width: 270px;
              height: auto;
              position: absolute;
              top: 30px;
              margin-left: -2px;
              .top{
                width: 255px;
                height: 64px;
                padding: 10px 0 10px 15px;
                position: relative;
                .head-portrait{
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                }
                .user-icon{
                  background-image: url(/img/vip-all.png);
                  width: 55px;
                  height: 16px;
                  background-position: 0px -42px;
                  position: absolute;
                  margin-top: 10px;
                  margin-left: 10px;
                }
                .describe{
                  position: absolute;
                  bottom: 17px;
                  margin-left: 10px;
                }
                .exit{
                  position: absolute;
                  right: 12px;
                }
              }
              .bottom{
                padding-top: 10px;
                border-top: 1px solid #d8d8d8;
                height: 88px;
                .el-carousel__item {
                  width: 210px;
                  position: absolute;
                  left: 0;
                  right: 0;
                  margin: 0 auto;
                  .item{
                    width: 70px;
                    height: 80px;
                    position: relative;
                    .img{
                      width: 55px;
                      height: 55px;
                      display: block;
                      background-image: url('~@/assets/imgs/privilege-all.png');
                      position: absolute;
                      margin: 0 auto;
                      left: 0;
                      right: 0;
                    }
                    .describe{
                      position: absolute;
                      bottom: 0;
                      margin: 0 auto;
                      left: 0;
                      right: 0;
                      text-align: center;
                    }
                  }
                  &:nth-child(1){
                    margin-left: 30px;
                  }
                }
              }
            }
            &:hover{
              background-color: #fff;
            }
          }
          .li2 {
            width: 64px;

            a {
              padding: 0 8px;
            }
          }

          .li3 {
            width: 82px;

            a {
              padding-left: 8px;
            }
          }

          .li4 {
            width: 64px;

            a {
              padding: 0 8px;
            }
          }

          .li5 {
            width: 82px;

            a {
              padding-left: 8px;
            }
          }

          .li6 {
            width: 82px;

            a {
              padding-left: 8px;
            }
          }
          .li7 {
            width: 81px;
            padding: 0px 1px 0px 2px;

            a {
              padding-left: 8px;
            }
          }
          .li8 {
            width: 64px;

            a {
              padding: 0 8px;
            }
          }
        }
      }

      a {
        display: inline-block;

        &:hover {
          color: @a-hover-color-01;
        }
      }

    }
  }
</style>
