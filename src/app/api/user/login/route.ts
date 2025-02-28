// import requests from "services/fetch";
// import { setSession } from "lib/config";

export async function POST(request: Request) {

    try {
        const { phone, verify } = await request?.json();
        console.log("phone", phone);
        console.log("verify", verify);

        return new Response(JSON.stringify({
            code: 0,
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