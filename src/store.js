import Vue from 'vue';
import Vuex from 'vuex';
import { login, validate } from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    }
  },
  actions: {
    async validate({ commit }) {
      const r = await validate();
      if (r && r.data && r.data.code === 1) {
        return false;
      };
      localStorage.setItem("token",r && r.data && r.data.token);
      commit("setUsername",r && r.data && r.data.username);
      return true;
    },
    async login({ commit }, username) {
      const r = await login(username);
      if (r.data && r.data.data && r.data.data.code === 1) {
        return Promise.reject(r);
      };
      localStorage.setItem("token",  r.data && r.data.data && r.data.data.token);
      commit("setUsername", r.data && r.data.data && r.data.data.username);
    },
  },
});
