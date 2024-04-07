import axios from 'axios';
// import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpResponse<T = unknown> {
  msg: string;
  code: number;
  data: T;
}

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: '/',
  timeout: 1000,
//   headers: { 'X-Custom-Header': 'my-value' },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 token 到请求头
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    // 请求错误时做些事
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么，例如处理特定的状态码
    if (response.status === 200) {
      return response.data;
    } else {
      // 处理其他状态码，例如显示错误消息
      console.error('Error:', response.statusText);
      return Promise.reject(response.statusText);
    }
  },
  (error) => {
    // 响应错误时做些事
    if (error.response) {
      // 请求已发出，服务器响应状态码不在 2xx 范围内
      console.error('Error:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('Error:', error.request);
    } else {
      // 发送请求时出现错误
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default instance;
