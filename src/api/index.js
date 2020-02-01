import axios from '../lib/request';

/**
 * 1. 判断是否已经登录，并返回 userName + token
 */
export const validate = () => axios.request({
    url: "/validate",
});

/**
 * 2. 根据username，获取用户信息 
 */
export const login = (username) => axios.request({
    url: '/login',
    method: "POST",
    data: {
        username,
    }
});

// 全部是promise
// export const getTest = () => axios.request({ url: '/test' });