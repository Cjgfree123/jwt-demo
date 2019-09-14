import axios from '../lib/request';

// 全部是promise
export const getTest = () => axios.request({ url: '/test' });
export const login = (username) => axios.request({
    url: '/login',
    method: "POST",
    data: {
        username,
    }
});

export const validate = () => axios.request({
    url: "/validate",
});