import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";
// import { RouterContext } from "https://deno.land/x/oak/mod.ts"


export const store = async (ctx: any) => {
    ctx.response.body = await renderFileToString(
      `${Deno.cwd()}/views/store.ejs`,
      {},
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


