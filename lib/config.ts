import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

import { ISession } from './config';

// 检查环境变量是否存在
if (!process.env.SESSION_COOKIE_NAME || !process.env.SESSION_PASSWORD) {
    throw new Error('SESSION_COOKIE_NAME and SESSION_PASSWORD environment variables are required');
}

const sessionOptions = {
    cookieName: process.env.SESSION_COOKIE_NAME,
    password: process.env.SESSION_PASSWORD,
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 1000,
      secure: process.env.NODE_ENV === 'production',
    },
};
  
/**
 * 导出一个异步函数setSession，用于设置session
 * @param name: string session的名称
 * @param params: any session的值
 */
export const setSession = async (name, params) => {

    // 获取cookieStore
    const cookieStore = await cookies();

    // 使用cookieStore和sessionOptions获取IronSession
    const session: ISession = await getIronSession(cookieStore, sessionOptions);

    // 将params赋值给session的name属性
    session[name] = params;

    // 保存session
    await session.save();
};

/**
 * 导出一个异步函数getSession，用于获取session
 * @param name: string session的名称
 * @param params: any session的值
 */
export const getSession = async () => {

    // 获取cookieStore
    const cookieStore = await cookies();

    // 使用cookieStore和sessionOptions获取IronSession
    const session: ISession = await getIronSession(cookieStore, sessionOptions);
    return session;
}