import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const obj = config()
const clientKey = Object.values(obj)[2]
const clientId:string = '8693ww7e9p6u3t'

const oauth2Client = new OAuth2Client({
    clientId: '8693ww7e9p6u3t',
    clientSecret: clientKey, 
    authorizationEndpointUri: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUri: "https://www.linkedin.com/oauth/v2/accessToken",
    redirectUri: "http://localhost:3000/auth/linkedin/callback",
    defaults: {
      scope: "read:user",
    },
  });




const LOauthOne = (ctx:any, next:any) => {
    ctx.response.body = {
        message: 'success',
        data: ctx.response.redirect(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=8693ww7e9p6u3t&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fstore&state=foobar&scope=r_emailaddress`)
    };
}


// http://localhost:3000/store?code=AQRQtZgS_T-LpTFQTnBKkzu2D98OJnhu7I8fZOR-K24QbTlakD3yFb-KBjTsCvaCpPPSS6EnMp_ZUNe3M-CpKct7TJQamlyi3H9dlXiEvYQYyFaUcsOJN1Z-sYxNvvpMSxEu-01zsRLh5DohPYYcU0GOhmx2iwBl56uSQmYvVjkvEywe8kC1FPA07EGzgn2nyVF4ALmdKuJ6g9kFgHk

// const LOauthOne = (ctx:any) => {
//     ctx.response.redirect(
//       oauth2Client.code.getAuthorizationUri(),
//     );
//   };

const hardCode = "AQRQtZgS_T-LpTFQTnBKkzu2D98OJnhu7I8fZOR-K24QbTlakD3yFb-KBjTsCvaCpPPSS6EnMp_ZUNe3M-CpKct7TJQamlyi3H9dlXiEvYQYyFaUcsOJN1Z-sYxNvvpMSxEu-01zsRLh5DohPYYcU0GOhmx2iwBl56uSQmYvVjkvEywe8kC1FPA07EGzgn2nyVF4ALmdKuJ6g9kFgHk"

const oauth2Clone = (clientObj: any) => {

}


  const LOauthTwo = async (ctx:any, next:any) => {
      console.log(oauth2Client)
    // Exchange the authorization code for an access token
    const tokens = await oauth2Client.code.getToken(ctx.request.url);
    console.log(`tokens ${tokens}`)
    // Use the access token to make an authenticated API request
    const userResponse = await fetch("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    // console.log(userResponse)
    // const { name } = await userResponse.json();
    // console.log(name)
    await next()

  };

  export { LOauthOne, LOauthTwo }