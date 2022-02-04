/**
 * register.html的store
 */
import { createStore } from 'vuex';
import User from '@/pojo/User';

export default createStore({
  state() {
    const accountRadio = 'BLANK';
    const user: User = new User();
    const password = '';
    let oldEmail = '';
    return {
      accountRadio,
      user,
      oldEmail,
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
    changeUsernamePassword(state: any, user: User) {
      console.log('changeUsernamePassword', user);
      state.user = user;
    },

    /**
     * 当手机号已经被使用了，那么邮箱就设置下，避免重复报错问题
     * @param state
     * @param email
     */
    setOldEmail(state:any, email:string){
      state.oldEmail = email;
    }
  },

});
