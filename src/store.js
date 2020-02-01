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
    // 1. 判断是否已经登录，并返回 userName(种到store里) + token(种到localStorage里)
    async validate({ commit }) {
      // 缺点: 每次进入路由，需要先进行请求validate，如果validate请求挂掉，则页面空白。
      const r = await validate();
      if (r && r.data && r.data.code === 1) {
        return false;
      };
      localStorage.setItem("token",r && r.data && r.data.token);
      commit("setUsername",r && r.data && r.data.username);
      return true;
    },
    // 2. 获取用户信息 userName(种到store里) + token(种到localStorage里)
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
