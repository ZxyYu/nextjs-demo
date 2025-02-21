import type { NextConfig } from "next";
import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
        {
            // 客户端请求的路径模式，以 /api 开头的请求会被代理
            source: '/api/:path*', 
            // 请求实际要转发到的目标地址，这里假设本地服务运行在 3002 端口
            destination: 'http://localhost:3002/api/:path*' 
        }
    ];
    },
    async serverMiddleware() {
        return [
            {
                path: '/api/cloopen',
                middleware: createProxyMiddleware({
                    target: 'https://app.cloopen.com:8883',
                    changeOrigin: true,
                    pathRewrite: { '^/api/cloopen': '' },
                    secure: false 
                })
            }
        ];
    }
};

export default nextConfig;
