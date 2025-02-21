"use client"; // 标记为客户端组件
import {useState} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NextPage } from 'next';
import { Button } from 'antd';
import Login from "components/Login";
import { navs } from './config'; 
import './index.css';

const Navbar: NextPage = () => {

    const pathname = usePathname();

    const [isShowLogin, setIsShowLogin] = useState(false);

    const handleGotoEditorPage = () => {
        // window.location.href = '/editor';
    };

    const handleLogin = () => {
        setIsShowLogin(true);
    };

    const handleClose = () => {
        setIsShowLogin(false);
    }


    return (
        <div className='navbar'>
            <div className='logArea'>BLOG-C</div>
            <div className='linkArea'>
                {navs?.map((item) => {
                    return <Link className={pathname === item?.value ? 'active' : 'linkItem'} key={item.value} href={item?.value}>
                       {item?.label}
                   </Link>
                })}
            </div>
            <div className='operationArea'>
                <Button onClick={handleGotoEditorPage} type="default">写文章</Button>
                <Button type="primary" onClick={handleLogin}>登录</Button>
            </div>
            <Login isShow={isShowLogin} onClose={handleClose} />
        </div>
    );
}

export default Navbar;