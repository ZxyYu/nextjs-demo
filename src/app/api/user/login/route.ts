// import requests from "services/fetch";
import { getSession } from "lib/config";
import { prepareConnection } from "db/index"
import { User, UserAuth } from 'db/entity';
import { setSession } from "lib/config";

export async function POST(request: Request) {

    try {
        const { phone, verify, identity_type = "phone" } = await request?.json();
        console.log("phone", phone);
        console.log("verify", verify);
        // 引用数据库方法
        const db = await prepareConnection();

        console.log("数据库连接状态:", db.isConnected);

        // 数据库连接-获取用户表
        // const userRepo = db.getRepository(User);

        // 数据库连接-获取用户认证表
        const userAuthRepo = db.getRepository(UserAuth);

        // const users = await userRepo.find();

        const sesstion = await getSession();

        // 判断缓存中的验证码与输入的验证码是否相等
        if (String(verify) === String(sesstion.verifyCode)) {
            // 验证码正确，登录成功， 开始在user_auth 中查找 identity_type 是否有记录
            const userAuth = await userAuthRepo.findOne({
                where: {
                    identity_type,
                    identifier: phone
                },
                relations: ["user"]
            });
            console.log("userAuth", userAuth);
            if (userAuth) {
                // 已经存在的用户
                const _user = userAuth?.user;

                const { _id, nickname, avatar } = _user;
        
                await setSession("userId", _id); 

                await setSession("nickname", nickname); 

                await setSession("avatar", avatar); 

            } else {
                // 新用户, 自动注册
                const user = new User();
                // 设置用户昵称和头像
                user.nickname = `用户_${Math.floor(Math.random() * 10000)}`;
                user.avatar = "https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=avatar&step_word=&lid=8853561081400806336&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2602536019,1501078489&os=2446744608,4275035292&simid=2602536019,1501078489&pn=15&rn=1&di=7477984738934784001&ln=799&fr=&fmq=1742799104163_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=https%3A%2F%2Fbbs-resource.oss-cn-zhangjiakou.aliyuncs.com%2F6575E10377074790B392AD1F681D70C5_9462620230625.png&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwxMiwzLDEsMiwxMyw3LDYsNSw5";
                user.job = '暂无';
                user.introduce = '暂无';
                
                const userAuths = new UserAuth();
                userAuths.identifier = phone; // 设置用户身份标识
                userAuths.identity_type = identity_type; // 设置用户身份类型(登录方式)
                userAuths.credential = sesstion.verifyCode; // 设置用户凭证(验证码/密码/扫码登录....)

                userAuths.user = user; // 设置用户关系(一对多)

                const resUserAuth = await userAuthRepo.save(userAuths); // 保存用户身份信息

                const { user: { _id, nickname, avatar } } = resUserAuth;

                await setSession("userId", _id); 

                await setSession("nickname", nickname); 

                await setSession("avatar", avatar); 
            };
        };

        return new Response(JSON.stringify({
            code: 0,
            msg: "登录成功",
        }));

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

};