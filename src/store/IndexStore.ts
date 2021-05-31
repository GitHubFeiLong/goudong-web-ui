import { createStore } from 'vuex';
import AuthorityUser from '@/pojo/AuthorityUser';

export default createStore({
  state() {
    const user: AuthorityUser = new AuthorityUser();
    return {
      user,
    };
  },
  mutations: {
    /**
     * 初始化用户对象
     * @param state
     * @param user
     */
    initUser (state: any, user: AuthorityUser) {
      state.user = user;
    },
  },
  actions: {
  },
  modules: {
  },
});
