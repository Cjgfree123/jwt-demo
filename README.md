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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
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
3.抽离请求 api/index.js

```
