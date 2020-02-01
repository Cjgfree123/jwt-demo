import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;

const whileList = ["/"];
router.beforeEach(async (to, from, next) => {
  if (whileList.includes(to.path)) {
    return next();
  };
  // flag: true已经登录  false:没有登录或登录异常
  let flag = await store.dispatch("validate");
  if (flag) {
    // 如果登录了
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    // 如果该路由 没登录&需要登录
    // 注意: 可能匹配多条路径, 但是: 判断时，只要匹配了,就做权限校验
    let needLogin = to.matched.some(item => {
      return item && item.meta && item.meta.needLogin;
    });
    if (needLogin) {
      next("/login");
    } else {
      next();
    }
  };
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
