import { useState } from 'react';
import type { NextPage } from 'next';
import { Button, message } from 'antd';
import '@ant-design/v5-patch-for-react-19';

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
        
    };

    // 调用接口获取验证码
    const handleGetVerifyCode = async () => {
        console.log("message", message);
        if (!form?.phone) {
            console.log(form?.phone);
            message?.warning('请输入手机号');
            return;
        };
        setShowVerifyCode(true);
        const res = await request.post("/api/user/sendVerifyCode", {
            to: form?.phone,
            templateId: "1",
        });
        console.log("res", res);
        if (res?.code === 200) {
            setShowVerifyCode(true);
            message?.success(res?.msg || "获取验证码成功");
        } else {
            message?.error(res?.msg || "获取验证码失败");
        };
    };

    const handleLogin = () => {
        
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