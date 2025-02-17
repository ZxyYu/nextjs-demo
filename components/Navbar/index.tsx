import Link from 'next/link';
import type { NextPage } from 'next';

import { navs } from './config'; 
// import styles from './index.moudle.scss';

const Navbar: NextPage = () => {
    return (
        <div className="bg-white h-16 flex justify-between items-center px-10">
            <div>BLOG-C</div>
            <div>
                {navs?.map((item) => {
                    return <Link key={item.value} href={item?.value}>
                       {item?.label}
                   </Link>
                })}
            </div>
        </div>
    );
}

export default Navbar;