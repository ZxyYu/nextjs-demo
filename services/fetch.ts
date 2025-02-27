import axios from "axios";
// import { message } from "antd";

// 创建实例
const instance = axios.create({
    timeout: 30 * 1000, // 请求超时时间 10s
});

// request拦截器: 统一设置请求头, 每次请求携带token
instance.interceptors.request.use(config => {
    return config;
},
    error => Promise.reject(error)
);

// response拦截器: 统一处理 erron 和msg
instance.interceptors.response.use(response => {

    if (response.status === 200) {
        return response?.data;
    };

    return {
        code: -1,
        msg: "未知错误！",
        data: null,
    };
}, error => Promise.reject(error),
);

export default instance;