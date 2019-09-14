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
