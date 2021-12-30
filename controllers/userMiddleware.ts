
import { Client } from "https://deno.land/x/postgres/mod.ts"
import { decode } from "https://deno.land/x/djwt@v2.4/mod.ts"
// import { storePage } from '../controllers/render.ts'
// import { dashport } from '../server.ts'
// import { ghStrat, serializerA, deserializerA } from '../dashportConfig.ts';
import { dbCreds } from '../config.ts'

const client = new Client(dbCreds);

const userMiddleware: any = async (ctx:any, next:any) => {
    const jwt = await ctx.cookies.get("jwt") || '' ;
    if (!jwt) {
        ctx.response.body = 401;
        ctx.response.body = {
            message: 'unauthenticated',
            data: ctx.response.redirect('./login')
        };
        return 
    }

    // const [ header, payload, signature] = await decode(jwt);
    const decoded: any = await decode(jwt);
    const user: any[] = decoded[1].user


    // const result = await verify(jwt, key);
    // console.log(`payload ${payload}`)
    if (!user) {
        ctx.response.body = 401;
        ctx.response.body = {
            message: 'unauthenticated',
            data: ctx.response.redirect('./login')
        };
        return 
    }

    const result = await client.queryArray(`SELECT * FROM registration WHERE username = '${ user }'`)
    if(!result) {
        ctx.response.body = 401;
        ctx.response.body = {
            message: 'unauthenticated',
            data: ctx.response.redirect('./login')
        };
        return
    }
    await next()

    return
}
  
  export {userMiddleware};

