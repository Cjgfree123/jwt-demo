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
      if (r.code === 1) {
        return false;
      };
      localStorage.setItem("token", r.token);
      console.log("tt", r.token)
      commit("setUsername", r.username);
      return true;
    },
    async login({ commit }, username) {
      const r = await login(username);
      console.log(")))))", r)
      if (r.code === 1) {
        return Promise.reject(r);
      };
      console.log("-----", r)
      localStorage.setItem("token", r && r.token);
      commit("setUsername", r.username);
    },
  },
});
