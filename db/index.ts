import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import {User, UserAuth} from "./entity";

const type = process.env.DATABASE_TYPE;
const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

let connectionReadypromise: Promise<Connection> | null = null;
export function prepareConnection() {
    
    if(!connectionReadypromise) {
        connectionReadypromise = (async () => {
            try {
                // 检查环境变量是否正确加载
                if (!type || !host || !port || !username || !password || !database) {
                    throw new Error('缺少数据库配置环境变量。');
                }
                // try {
                //     const staleConnection = await getConnection();
                //     console.log('关闭陈旧的数据库连接…');
                //     await staleConnection.close();
                //     console.log('数据库连接关闭。');
                // } catch (error) {
                //     console.log('没有发现陈旧的数据库连接。继续创建一个新连接。');
                //     throw error;
                // }
                console.log('试图创建一个新的数据库连接…');
                const connection = await createConnection({
                    type, // 要链接的数据库类型
                    host, // 数据库的host
                    port, // 数据库的端口
                    username, // 数据库的用户名
                    password, // 数据库的密码
                    database, // 数据库的名称
                    entities: [User, UserAuth], // 数据库的实体
                    synchronize: false, // 是否自动创建数据库表
                    logging: true, // 是否打印日志
                    authSource: "admin",
                    useUnifiedTopology: true, // 必须启用（避免弃用警告）
                    useNewUrlParser: true,    // 必须启用（避免弃用警告）
                });
                console.log('数据库连接建立成功。');
                return connection;
            } catch (err) {
                console.error('建立数据库连接错误:', err);
                throw err;
            };
        })();
    }
    return connectionReadypromise;
};