import { createStore } from 'vuex';
import AuthorityUser from '@/pojo/AuthorityUser';

export default createStore({
  state() {
    const accountRadio = 'BLANK';
    const user: AuthorityUser = new AuthorityUser();
    const password = '';
    return {
      accountRadio,
      user,
    };
  },
  mutations: {
    /**
     * 修改单选框值
     * @param state
     * @param value
     */
    changeAccountRadio(state: any, value: string) {
      state.accountRadio = value;
    },

    /**
     * 修改用户名和密码
     * @param state
     * @param value
     */
    changeUsernamePassword(state: any, user: AuthorityUser) {
      console.log('changeUsernamePassword', user);
      state.user = user;
    },
  },

});
