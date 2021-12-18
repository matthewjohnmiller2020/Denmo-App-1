import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const obj = config()
const clientKey = Object.values(obj)[1]

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

const OauthOne = (ctx:any) => {
    ctx.response.redirect(
      oauth2Client.code.getAuthorizationUri(),
    );
  };
  
  const OauthTwo = async (ctx:any, next:any) => {
    console.log(oauth2Client)
    // Exchange the authorization code for an access token
    const tokens = await oauth2Client.code.getToken(ctx.request.url);
    console.log(`url ${ctx.request.url}`)
    console.log(JSON.stringify(tokens.accessToken))
    // Use the access token to make an authenticated API request
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    // console.log(userResponse)
    const { name } = await userResponse.json();
    await next()
    
  };

  export { OauthOne, OauthTwo, oauth2Client }