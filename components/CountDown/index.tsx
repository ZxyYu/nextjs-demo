import { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import './index.css'

type CountDownProps = {
    time?: number; // 倒计时时间
    onEndChange?: () => void; // 倒计时结束回调
}

const CountDown: NextPage = (props: CountDownProps) => {

    const { time, onEndChange } = props;

    const [count, setCount] = useState(time || 60);
    
    useEffect(() => {
        // 如果倒计时还未结束
        if (count >= 0) {
            // 设置一个定时器，每秒减少一秒
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            // 在组件卸载或 count 变化时清除定时器，避免内存泄漏
            return () => clearTimeout(timer);
        } else if (typeof onEndChange === 'function') {
            // 倒计时结束，调用传入的回调函数
            onEndChange();
        }
    }, [count, onEndChange]);

    return <div className='countDown'>{count}</div>;
}

export default CountDown;