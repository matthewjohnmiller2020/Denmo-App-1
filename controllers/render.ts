import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";
// import {  getCookies } from "https://deno.land/std/http/cookie.ts";
// import { serve } from "https://deno.land/std@0.116.0/http/server.ts"
// import { RouterContext } from "https://deno.land/x/oak/mod.ts"


// const port: string | 3000 =  Deno.env.get("PORT") || 3000
// for await (const req of port) {
//     getCookies(req);
// }


export const store = async (ctx: any, request:any) => {
  // const c = getCookies(request.headers);
  // console.log(c)
  // if (!c) {
  //     ctx.response.body = 401;
  //     ctx.response.body = {
  //         message: 'unauthenticated'
  //         // data: ctx.response.redirect('./login')
  //     };
  //     return;
  // }
    ctx.response.body = await renderFileToString(
      `${Deno.cwd()}/views/store.ejs`,
      {

      },
    );
  }

export const home = async (ctx: any) => {
    const currentUser = ctx.state.currentUser;
    ctx.response.body = await renderFileToString(
      `${Deno.cwd()}/views/home.ejs`,
      {
        user: currentUser
      },
    );
  }

export const loginPage = async (ctx: any) => {
    ctx.response.body = await renderFileToString(
      `${Deno.cwd()}/views/login.ejs`,
      {
        error: false,
      },
    );
  }

  export const registerPage = async (ctx: any) => {
    ctx.response.body = await renderFileToString(
      `${Deno.cwd()}/views/register.ejs`,
      {},
    );
  }


