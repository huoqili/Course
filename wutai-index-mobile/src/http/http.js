import axios from "axios";
import {URLPATH} from "../config/config";
import router from "../router";
let instance = axios.create({
   baseURL: URLPATH,
   timeout: 5000
});
// 请求拦截： 通用的请求配置

instance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('islogin');
    token && (config.headers.token = token);
    return config;
},function(error){
    return Promise.reject(error);
})
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 500 404 403 401
    let status = error.response.status;
    // let text = error.response.statusText;
    switch (status) {
        case 301:
            // Message.warning( '永久重定向，资源已永久分配新URI');
            break;
        case 400:
            // Message.warning('请求报文语法错误或参数错误');
            break;
        case 401:
            // Message.warning('需要通过HTTP认证，或认证失败');
            router.replace({name:'login'});
            break;
        case 403:
            // Message.warning('请求资源被拒绝');
            break;
        case 404:
            // Message.warning( '无法找到请求资源');
            break;
        case 500:
            // Message.warning('服务器故障或Web应用故障');
            break;
        case 503:
            // Message.warning('服务器超负载或停机维护');
            break;
    }
    return Promise.reject(error);
});

export  default  instance;
