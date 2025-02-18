"use client"; // 标记为客户端组件
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NextPage } from 'next';
import { navs } from './config'; 
import './index.css';

const Navbar: NextPage = () => {
    const pathname = usePathname();
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
        </div>
    );
}

export default Navbar;