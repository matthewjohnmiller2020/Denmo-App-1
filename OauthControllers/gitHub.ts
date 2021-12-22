import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts"
import { dbCreds } from '../config.ts'

const client = new Client(dbCreds);

const obj = config()
const clientKey = Object.values(obj)[1]

let sessionId: String;

const oauth2Client = new OAuth2Client({
    clientId: '8d769a8e565111f853fb',
    clientSecret: clientKey,
    authorizationEndpointUri: "https://github.com/login/oauth/authorize",
    tokenUri: "https://github.com/login/oauth/access_token",
    redirectUri: "http://localhost:3000/auth/github/callback",
    defaults: {
      scope: "read:user",
    },
  });

const OauthOne = async (ctx:any) => {
  let sessionId = Math.floor(Math.random() * 1000000000);

  try {
    await client.connect()
    await client.queryObject("INSERT INTO session(session_id) VALUES($1)", sessionId)
    ctx.response.redirect(
      oauth2Client.code.getAuthorizationUri(),
    );
  } catch(err) {
    return err;
  }
  };
  
  const OauthTwo = async (ctx:any, next:any) => {
    
    // Exchange the authorization code for an access token
    // const tokens = await oauth2Client.code.getToken(ctx.request.url);

    // Use the access token to make an authenticated API request
    // const userResponse = await fetch("https://api.github.com/user", {
    //   headers: {
    //     Authorization: `Bearer ${tokens.accessToken}`,
    //   },
    // });
    // console.log(userResponse)
    ctx.response.redirect("http://localhost:3000/store")
    ctx.cookies.set('test', sessionId, {httpOnly: true})
    await next()
    
  };

  const sessionCheck = async (ctx:any, next:any) => {
    const jwt = await ctx.cookies.get("jwt") || '' ;
    if(jwt) {
      await next()
    } else {
    const test = await ctx.cookies.get("test") || '';
    console.log(test)
    if (!test) {
      ctx.response.body = 401;
      ctx.response.body = {
          message: 'unauthenticated',
          data: ctx.response.redirect('./login')
      };
      return 
  }
    const token = await client.queryObject(`SELECT * FROM session WHERE session_id = '${ test }'`)
    if (!token){
        ctx.response.body = 401;
        ctx.response.body = {
            message: 'unauthenticated',
            data: ctx.response.redirect('./login')
        } 
    } 
    await next();
    return;
  }
};  

  //    console.log(`url ${ctx.request.url}`)
  // console.log(JSON.stringify(tokens.accessToken))
  export { OauthOne, OauthTwo, oauth2Client, sessionCheck }