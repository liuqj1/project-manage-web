import axios from 'axios';
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { getCookie } from '@/utils/support'

//  see:  https://blog.csdn.net/m0_55119483/article/details/129686563

// 创建axios实例
const service = axios.create({
    //baseURL: process.env.VUE_APP_URL,
    //baseURL: 'http://8.138.133.94:8083/scientific-manage',
    baseURL: process.env.VUE_APP_URL,
    // baseURL: process.env.BASE_URL,    // baseURL: process.env.BASE_URL,
    timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
            config.headers['adminId'] = getCookie("adminId");
        }

        // 此处添加Loading
        return config;
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        console.log(error) // for debug
        return Promise.reject(error);
    }
);


// respone拦截器
service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 处理异常情况，根据项目实际情况处理或不处理
        if (error && error.response) {
            // 根据约定的响应码处理
            switch (error.response.status) {
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 502:
                    error.message = '服务器端出错';
                    break;
                // 401:未登录;
                case 401:
                    MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        store.dispatch('FedLogOut').then(() => {
                            location.reload()// 为了重新实例化vue-router对象 避免bug
                        })
                    })
                    break;
                case 500:
                    error.message = `密码错误`;
                default:
                    error.message = `连接错误${error.response.status}`;
            }
        } else {
            // 超时处理
            error.message = '服务器响应超时，请刷新当前页';
        }
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })

        return Promise.resolve(error.response);
    }
);

export default service;
