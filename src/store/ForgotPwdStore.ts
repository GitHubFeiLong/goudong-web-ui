import { createStore } from 'vuex';
import User from '@/pojo/User';

export default createStore({
  state() {
    return {
      authorityUser: null,
    };
  },
  mutations: {
    changeAuthorityUser(state: any, value: User) {
      state.authorityUser = value;
    },
    // 设置验证码
    setCode(state:any, code:string) {
      state.authorityUser.code = code;
    }
  },

});

// import { createStore } from 'vuex';
// export default createStore({
//     // 状态对象
//     state: {
//       show:true
//     },
//     //包含多个由action触发去直接更新状态的方法的对象
//     mutations: {
//       show(state){
//         state.show = true;
//       },
//       hidden(state) {
//         state.show = false;
//       }
//     },
//     // 接收组件通知触发mutation调用间接更新状态的方法的对象
//     actions: {
//       show({commit}){
//         commit('show')
//       },
//       hidden({commit}){
//         commit('hidden')
//       },
//     },
//     modules: {
//
//     },
// });
