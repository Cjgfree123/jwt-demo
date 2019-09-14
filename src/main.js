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
  if(whileList.includes(to.path)){
    return next();
  };
  let flag = await store.dispatch("validate");
  if (flag) {
    // 如果登录了
    if (to.name === "login") {
      next("/");
    } else {
      next();
    }
  } else {
    // 如果没登录&需要登录
    // 注意: 可能匹配多条路径, 但是: 判断时，只要匹配了,就做权限校验
    const flag = to.matched.some(item => item.meta.neddLogin);
    if(flag){
      next("/login");
    }else{
      next();
    }
  };
  next();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
