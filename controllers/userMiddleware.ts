import { Client } from "https://deno.land/x/postgres/mod.ts"
import { decode } from "https://deno.land/x/djwt@v2.4/mod.ts"
import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";
import { dbCreds } from '../config.ts'

const client = new Client(dbCreds);

const userMiddleware: any = async ({response, cookies}: { response: any, cookies: any}) => {
    const jwt = await cookies.get("jwt") || '';
    if (!jwt) {
        response.body = 401;
        response.body = {
            message: 'unauthenticated',
            data: response.redirect('./login')
        };
        return 
    }

 

    // const [ header, payload, signature] = await decode(jwt);
    const decoded: any = await decode(jwt);
    console.log(decoded);
    const user: any[] = decoded[1].user
    console.log(user)
    // const result = await verify(jwt, key);
    

    // const result = await verify(jwt, key);
    // console.log(`payload ${payload}`)
    if (!user) {
        response.body = 401;
        response.body = {
            message: 'unauthenticated',
            data: response.redirect('./login')
        };
        return 
    }

    const result = await client.queryArray(`SELECT * FROM registration WHERE username = '${ user }'`)
    if(!result) {
        response.body = 401;
        response.body = {
            message: 'unauthenticated',
            data: response.redirect('./login')
        };
        return
    }
    response.body = await renderFileToString(
        `${Deno.cwd()}/views/store.ejs`,
        {},
      );
    return 
}
  
  export {userMiddleware};