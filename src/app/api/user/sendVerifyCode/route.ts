import moment from "moment";
import md5 from "md5";
import { encode } from "js-base64";

import requests from "services/fetch";
import { setSession } from "lib/config";

export async function POST(request: Request) {
    try {

        // 容联云账户信息
        const accountSid = '2c94811c946f6bfb01952236cc8d1676';
        const authToken = 'c4a2b466e4694b90b5c51eddeed1cb9a';
        const appId = '2c94811c946f6bfb01952236ce47167d';

        // 生成时间戳（格式：YYYYMMDDHHmmss）
        const timestamp = moment().format('YYYYMMDDHHmmss');

        const SigParamter = md5(`${accountSid}${authToken}${timestamp}`);

        // 生成随机验证码
        const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;

        // 验证码有效期（单位：分钟）
        const expireMinute = "5";

        // 生成授权信息（格式：Base64(accountSid:timestamp)）
        const Authorization = encode(`${accountSid}:${timestamp}`);

        // 构造请求 URL
        const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${accountSid}/SMS/TemplateSMS?sig=${SigParamter}`;

        // 构造请求头
        const headers = {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json;charset=utf-8',
            'Authorization': Authorization
        };

        // 解析请求体为 JSON 数据 body
        const { to, templateId } = await request?.json();
       
        const response = await requests.post(url, {
            to,
            appId,
            templateId,
            datas: [verifyCode, expireMinute],
        }, {
            headers,
        });
        
        // 请求成功
        if (response.statusCode === '000000') {

            // 存储验证码到 session
            await setSession("verifyCode", verifyCode); 

            return new Response(JSON.stringify({
                code: 0,
                msg: response?.statusMsg,
                data: {
                    templateSMS: response?.templateSMS
                },
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

        return new Response(JSON.stringify({
            code: response?.statusCode,
            msg: response?.statusMsg,
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error("解析请求体时出错:", error);
        return new Response(JSON.stringify({
            code: -1,
            msg: "解析请求体时出错",
            data: null
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
