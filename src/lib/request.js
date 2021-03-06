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
            config.headers.Authorization = localStorage.getItem("token"); // 共用请求头
            return config;
        }, (err) => {
            return Promise.reject(err && err.data && err.data.data && err.data.data.msg);
        });
        // 响应拦截器
        axios.interceptors.response.use((res) => res, (err) => Promise.reject(err));
        return axios(config);
    }
};

export default new Request();
