import axios1 from '../lib/request';

console.log('axios', axios1);

// 全部是promise
export const getTest = () => axios1({ url: '/test' });
