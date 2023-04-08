import axios from "axios";

const createAxios = (baseUrl: string) => {
  const serviceAxios = axios.create({
    baseURL: baseUrl, // 基础请求地址
    timeout: 10000, // 请求超时设置
    withCredentials: false, // 跨域请求是否需要携带 cookie
  });
  serviceAxios.interceptors.response.use((res) => {
    return res
  }, (err) => {
    return Promise.reject(err);
  })
  return serviceAxios
};

export default createAxios
