import axios from "axios";
import { message } from "antd";

// 创建实例
const instance = axios.create({
    timeout: 10 * 1000, // 请求超时时间 10s
});

// request拦截器: 统一设置请求头, 每次请求携带token
instance.interceptors.request.use(config => {
    return config;
},
    error => Promise.reject(error)
);

// response拦截器: 统一处理 erron 和msg
instance.interceptors.response.use(res => {
    const resData = (res.data || []) as ResType;
    const { errno, data, msg } = resData;

    if (errno !== 0) {
        if (msg) {
            message?.error(msg);
        }
        throw new Error(msg || '请求失败');
    }

    return data as any;
})

export default instance;

export type ResType = {
    errno: number,
    data?: ResDataType,
    msg?: string
};

export type ResDataType = {
    // string类型的key
    [key: string]: any
}