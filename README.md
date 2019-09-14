# jwt-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your server
```
nodemon server.js
```

### 页面汇总

1. home // 显示首页

2. login // 登录页面

    * /login // 登录,拿到token
    * /validate // 进入新路由,判断token失效否&更新token

3. profile // 个人中心页面

### 实现思路

```
1. 路由拆分(/,/login,/profile)
2. 封装axios
    * 通过instance(axios实例), 定制使每个请求的拦截方法不一样
    * 拦截分为请求拦截、响应拦截
        请求拦截: 会在请求的时候, 拦截当前请求
        响应拦截: 
    * 请求拦截顺序，与代码中的拦截顺序保持一致。
3.抽离请求 api/index.js(promise对象)
4.token + userid存到localStorage, userInfo存vuex;  异步派发login
5.beforeEach权限路由
  每每进入路由前，要校验当前用户的登录情况,通过给store派发validate进行异步校验
  1. 将本地token传给后端, 如果校验成功,利用响应的token, 更新本地token
  2. 如果校验失败, 则跳转到登录页
6. 添加路由白名单, 直接跳转
```

## axios拦截器

1. 实现拦截器

```
import axios from 'axios';

// 配置请求的接口地址
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/';

axios.interceptors.request.use((config) => {
  console.log(1);
  return config;
});

axios.interceptors.request.use((config) => {
  console.log(2);
  return config;
});

export default axios;
```

2. 上面缺点: 每调用一次axios,将会生成一个axios实例, axios的拦截器方法将会被调用一次。

改进:

```
import axios from 'axios';

class Request {
    constructor() {
        this.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/';
        this.timeout = 2000;
    }
    request(config) { // 用户自定义的请求头
        axios.defaults.baseURL = this.baseURL;
        axios.defaults.timeout = this.timeout;
        // 请求拦截器
        axios.interceptors.request.use((config) => {
            config.headers.Authorization = "token"; // 共用请求头
            return config;
        }, (err) => {
            return Promise.reject(err);
        });
        // 响应拦截器
        axios.interceptors.response.use((res) => res.data, (err) => Promise.reject(err));
        return axios(config);
    }
};

export default new Request();

```

调用:

```
import axios from '../lib/request';

// 返回promise
export const getTest = () => axios.request({ url: '/test' });

```

## 小收获

1. 
```
   将用户信息对象,存到vuex, 项目内全局共享.
   将userId + token, 存到localstorage。

   为何不将userId + token 存到vuex? 
   防止一刷新, 用户数据丢失。
```

2. async 没有拦截住

分析:

```
1. 没找到bebel-loader, 缺少Babel插件,并进行安装相关插件,结果报错。
2. 发现之前vue-cli3项目，可以正常使用async
3. 猜测: vue-cli3 支持async, 我的写法不对,或接口报错
```

解决:

```
错误原因:
1. 发现接口: 没有返回data:{}
2. 请求封装, 默认从data下面取数据。但是读不到接口的data,就返回un. 

改进:
1. 建议:请求封装,从res直接读数据(更容易定位问题)
2. 所有接口, 必须返回code+data数据。
```
