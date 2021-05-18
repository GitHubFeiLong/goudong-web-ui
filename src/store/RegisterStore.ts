import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      accountRadio: '',
    };
  },
  mutations: {
    changeAccountRadio(state: any, value: string) {
      state.accountRadio = value;
    },
  },

});
