import { useState } from 'react';
import type { NextPage } from 'next';
import { Button, message } from 'antd';
import '@ant-design/v5-patch-for-react-19';
// import { withIronSessionApiRoute } from "iron-session/next";
import CountDown from 'components/CountDown';
import request from "services/fetch";
import './index.css';

type LoginProps = {
    isShow?: boolean;
    onClose?: () => void;
}

const Login: NextPage = ({ isShow, onClose }: LoginProps) => {

    const [form, setForm] = useState({
        phone: null,
        verify: null,
    });

    const [isShowVerifyCode, setShowVerifyCode] = useState(false); // 是否显示验证码

    const handleClose = () => {
        onClose()
    };

    // 调用接口获取验证码
    const handleGetVerifyCode = async() => {
        if (!form?.phone) {
            console.log(form?.phone);
            message?.warning('请输入手机号');
            return;
        };
        // setShowVerifyCode(true);
        // 1、单独搭建的服务端请求方式
        // const res = await request.post("/api/user/sendVerifyCode", {
        //     to: form?.phone,
        //     templateId: "1",
        // });
        // console.log("res", res);
        // if (res?.code === 200) {
        //     setShowVerifyCode(true);
        //     message?.success(res?.msg || "获取验证码成功");
        // } else {
        //     message?.error(res?.msg || "获取验证码失败");
        // };


        // 2、使用next提供的api方式
        try {
            const res = await request?.post("/api/user/sendVerifyCode", {
                to: form?.phone,
                templateId: "1",
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("res", res);
            if (res?.code === 0) {
                setShowVerifyCode(true);
                message?.success(res?.msg || "获取验证码成功");
            } else {
                message?.error(res?.msg || "获取验证码失败");
           };
        } catch (error) {
            console.log("获取验证码失败");
            // console.error(error);
            throw error;
        };        
    };

    const handleLogin = async() => {
        const res = await request.post("/api/user/login", {
            phone: form?.phone,
            verify: form?.verify,
            identity_type: "phone",  // 登录方式（暂时写死手机号登录 后续有不同登录后可传入）
        });

        if (res?.code === 0) {
            message?.success(res?.msg || "登录成功");
            // ......
            onClose();
        } else {
            message?.error(res?.msg || "未知错误");
        }
    };

    const handleOAtuhGitHub = () => {
        
    };

    const handleCountDownEnd = () => {
        setShowVerifyCode(false);
    }

    if (!isShow) return null;
    return <div className='loginArea'>
        <div className='loginBox'>
            <div className='loginTitle'>
                <div>手机号登陆</div>
                <div className='close' onClick={handleClose}>x</div>
            </div>
            <input
                name="phone"
                type="text"
                placeholder='请输入手机号'
                value={form?.phone || ""}
                onChange={(e) => setForm({...form, phone: e?.target?.value})}
            />
            <div className='verifyCodeArea'>
                <input
                    name="verify"
                    type="text"
                    placeholder='请输入验证码'
                    value={form?.verify || ""}
                    onChange={(e) => setForm({...form, verify: e?.target?.value})}
                />
                <span className='verifyCode' onClick={handleGetVerifyCode}>
                    {isShowVerifyCode ? <CountDown time={10} onEndChange={handleCountDownEnd} /> : "获取验证码"}
                </span>
            </div>
            <div className='loginButton'>
                <Button block type='primary' onClick={handleLogin}>登陆</Button>
            </div>
            <div className='otherLogin' onClick={handleOAtuhGitHub}>使用gitHub登陆</div>
            <div className='loginPrivacy'>
                注册登陆即表示同意
                <a href='https://moco.imooc.com/privacy.html' target='_blank' rel="referrer">隐私政策</a>
            </div>
        </div>
    </div>
};

export default Login;