import Vue from 'vue';
import Vuex from 'vuex';
import { login } from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username:"",
  },
  mutations: {
    setUsername(state, username){
      state.username = username;
    }
  },
  actions: {
    async login({ commit }, username) {
      const r = await login(username);
      console.log("r", r)
      if(r.code === 1){
        return Promise.reject(r);
      };
      localStorage.setItem("token", r.token);
      commit("setUsername", r.username);
    }
  },
});
