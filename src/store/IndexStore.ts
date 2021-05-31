import { createStore } from 'vuex';
import { CHANGE_ABSOLUTE_SCROLL_CLASS, CHANGE_FIXED_SCROLL_CLASS } from './MutationTypes';
import AuthorityUser from '@/pojo/AuthorityUser';

export default createStore({
  state: {
    user : new AuthorityUser(),
    scrollObj : {
      sidebarClass: {sidebar:true, fixed: false},
      searchClass: {'sidebar': true, 'sidebar-fixed': false},
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
    initUser(state: any, user: AuthorityUser) {
      state.user = user;
    },
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [CHANGE_ABSOLUTE_SCROLL_CLASS](state){
      state.scrollObj.sidebarClass.fixed = false;
    },
    [CHANGE_FIXED_SCROLL_CLASS](state) {
      state.scrollObj.sidebarClass.fixed = true;
    },
  },
  // Action 提交的是 mutation，而不是直接变更状态。
  actions: {
    // 参数 context 解构： context.commit 提交一个 mutation，或者通过 context.state 和 context.getters
    changeAbsoluteScrollClass({ commit }) {
      commit(CHANGE_ABSOLUTE_SCROLL_CLASS);
    },
    changeFixedScrollClass({ commit }) {
      commit(CHANGE_FIXED_SCROLL_CLASS);
    },
  },
  modules: {
  },
});
