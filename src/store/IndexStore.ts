import { createStore } from 'vuex';
import { CHANGE_RAW_SCROLL_CLASS, CHANGE_ONE_SCROLL_CLASS } from './MutationTypes';
import User from '@/pojo/User';

export default createStore({
  state: {
    user : new User(),
    scrollObj : {
      // 秒杀右侧侧边栏
      sidebarClass: {sidebar:true, fixed: false},
      // 顶部搜索栏
      searchClass: {search: true, fixed: false},
    }
  },
  getters: {
    sidebarClass: state => {return state.scrollObj.sidebarClass},
    searchClass: state => {return state.scrollObj.searchClass},
    scrollObj: state => {return state.scrollObj},
    fixed: state => {return state.scrollObj.sidebarClass.fixed},
  },
  mutations: {
    /**
     * 初始化用户对象
     * @param state
     * @param user
     */
    initUser(state: any, user: User) {
      state.user = user;
    },
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [CHANGE_RAW_SCROLL_CLASS](state){
      state.scrollObj.sidebarClass.fixed = false;
      state.scrollObj.searchClass.fixed = false;
    },
    [CHANGE_ONE_SCROLL_CLASS](state) {
      state.scrollObj.sidebarClass.fixed = true;
      state.scrollObj.searchClass.fixed = true;
    },
  },
  // Action 提交的是 mutation，而不是直接变更状态。
  actions: {
    // 参数 context 解构： context.commit 提交一个 mutation，或者通过 context.state 和 context.getters
    // 还原修改的 fixed 样式
    changeRawScrollClass({ commit }) {
      commit(CHANGE_RAW_SCROLL_CLASS);
    },
    // 第一次滚动条事件
    changeOneScrollClass({ commit }) {
      commit(CHANGE_ONE_SCROLL_CLASS);
    },
  },
  modules: {
  },
});
