import { createStore } from 'vuex';
import { CHANGE_SIDEBAR_CLASS } from './MutationTypes';
import AuthorityUser from '@/pojo/AuthorityUser';

export default createStore({
  state: {
    user : new AuthorityUser(),
    sidebarClass : {'sidebar': true, 'sidebar-fixed': false},
  },
  getters: {
    sidebarClass: state => {return state.sidebarClass}
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
    [CHANGE_SIDEBAR_CLASS](state) {
      state.sidebarClass = {'sidebar': true, 'sidebar-fixed': true}
    }
  },
  // Action 提交的是 mutation，而不是直接变更状态。
  actions: {
    // 参数 context 解构： context.commit 提交一个 mutation，或者通过 context.state 和 context.getters
    changeSidebarClass({ commit }) {
      commit(CHANGE_SIDEBAR_CLASS);
    }
  },
  modules: {
  },
});
