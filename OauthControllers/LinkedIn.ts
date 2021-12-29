import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts"
import { dbCreds } from '../config.ts'

const client = new Client(dbCreds);

const obj = config()
const clientKey = Object.values(obj)[2]
const clientId:string = '8693ww7e9p6u3t'
// const redirect:string = "http://localhost:3000/store"
const redirect:string = "http://localhost:3000/auth/linkedin/callback"
const scope:string = 'r_liteprofile'  //'r_emailaddress'
let sessionId: String;

// const oauth2Client = new OAuth2Client({
//     clientId: '8693ww7e9p6u3t',
//     clientSecret: clientKey, 
//     authorizationEndpointUri: 'https://www.linkedin.com/oauth/v2/authorization',
//     tokenUri: "https://api.linkedin.com/v2/me",
//     redirectUri: "http://localhost:3000/store",
//     defaults: {
//       scope: "read:user",
//     },
//   });

// console.log(oauth2Client.config.redirectUri)


// const SampleLink: String = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={your_client_id}&redirect_uri={your_callback_url}&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social`

const createLink: Function = (cliendId:String, redirect:any, scope:String) => {
  const state: Number = Math.floor(Math.random() * 1000000000)
  const encode: String = encodeURIComponent(redirect)
  let SampleLink: String = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${cliendId}&redirect_uri=${encode}&state=${state}&scope=${scope}`
  return SampleLink
}

// console.log(createLink(clientId, redirect, scope))
const newLink = createLink(clientId, redirect, scope)

const setBearerToken = async (bearToken: any) => {
  const userResponse = await fetch("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${bearToken}`,
    },
  });
  const {localizedFirstName} = await userResponse.json()
  console.log(`Hello ${localizedFirstName}`)
  
}

const LOauthOne = async (ctx:any, next:any) => {
    // let sessionId: Number = Math.floor(Math.random() * 1000000000);
    // await client.connect()
    // await client.queryObject("INSERT INTO session(session_id) VALUES($1)", sessionId)
    // ctx.response.body = {
    //     message: 'success',
    //     data: ctx.response.redirect(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=8693ww7e9p6u3t&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fstore&state=foobar&scope=r_liteprofile`)
        
        
    // };
    ctx.response.body = {
        message: 'success',
        data: ctx.response.redirect(newLink)
        
        
    };
    // ctx.response.redirect("http://localhost:3000/store")
    // ctx.cookies.set('test', sessionId, {httpOnly: true})
    // findCode()
/**
 * const pathString = string.subString(string.indexOf('code=')+5, string.length);
 */


    // await next()
    // const test = "test"
    // await fetch(ctx.request.url, {
    //   headers: {
    //     Authorization: `Bearer ${test}`
    //   }
    // })
}

// const getToken: Function = () => {
//   fetch('https://www.linkedin.com/oauth/v2/accessToken',{
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'grant_type': 'client_credentials',
//     'client_id': `${clientId}`,
//     'client_secret': `${clientKey}`
//   }
// }).then((tokenData) => {
//   console.log('First field should be token: ', tokenData);
// })
  
// }

const findCode = async (ctx:any, next:any) => {
  const stringPathName: String = ctx.request.url;
  
  const code: String = JSON.stringify(stringPathName.search)
  const parsedCode = code.slice(code.indexOf('"?code=')+7, code.indexOf('&state'))
  console.log(`parsedCode ${parsedCode}`)


  const tokens = await fetch('https://www.linkedin.com/oauth/v2/accessToken',{
  method: 'POST',
  headers: {
    // 'Accept': 'application/json',
    // "Content-type": "application/json"
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
    //  body: `grant_type=authorization_code&
    //  code=${parsedCode}
    //  &redirect_uri=${redirect}
    //  &client_id=${clientId}
    //  &client_secret=${clientKey}`
  // body: JSON.stringify({
  //   grant_type: "authorization_code",
  //   code: parsedCode,
  //   redirect_uri: redirect,
  //   client_id: clientId,
  //   client_secret: clientKey
  // })
  body: new URLSearchParams({
    'grant_type': "authorization_code",
    'code': parsedCode,
    'redirect_uri': redirect,
    'client_id': clientId,
    'client_secret': clientKey
  })
 })
 .then((response: any) => {
  console.log(response)
  return response.text()
})
.then((paramsString: any) => {
  let params = new URLSearchParams(paramsString)
    console.log(params);
    let tokenKey = [];
    for (const [key, value] of params.entries()){
    // for (const key in params){
      
      tokenKey.push(key, value)
    }
    console.log(tokenKey[0])
    let obj: any = tokenKey[0]
    let values = Object.values(obj)
    // console.log(values)
    const tokenArr = []
    let i = 17;
    while (values[i] !== '"') {
      tokenArr.push(values[i])
      i++
    }
    const bearerToken = tokenArr.join('')
    // obj = JSON.stringify(obj)
    // // console.log(obj)
    // let Btoken = [];
    // for(const token in obj) {
    //   Btoken.push(token)
    // }
    console.log('access_token', bearerToken)

    setBearerToken(bearerToken)
 })
 
  return await next();
}



// const testCase: String = 'https://dev.example.com/auth/linkedin/callback?state=foobar&code=AQTQmah11lalyH65DAIivsjsAQV5P-1VTVVebnLl_SCiyMXoIjDmJ4s6rO1VBGP5Hx2542KaR_eNawkrWiCiAGxIaV-TCK-mkxDISDak08tdaBzgUYfnTJL1fHRoDWCcC2L6LXBCR_z2XHzeWSuqTkR1_jO8CeV9E_WshsJBgE-PWElyvsmfuEXLQbCLfj8CHasuLafFpGb0glO4d7M'
// console.log(findCode())

// POST https://www.linkedin.com/oauth/v2/accessToken 

// Content-Type: application/x-www-form-urlencoded
// grant_type=client_credentials
// client_id={your_client_id}
// client_secret={your_client_secret}


    // await next()
    // ctx.cookies.set('jwt', 'tokens.accessToken', {httpOnly: true})
    // const jwt = await ctx.cookies.get("jwt") || ''
    // console.log(jwt)
    // // Exchange the authorization code for an access token
    // const tokens = await oauth2Client.code.getToken(ctx.request.url);
    // console.log(`tokens ${tokens}`)
    // ctx.cookies.set('jwt', tokens.accessToken, {httpOnly: true})


// http://localhost:3000/store?code=AQRQtZgS_T-LpTFQTnBKkzu2D98OJnhu7I8fZOR-K24QbTlakD3yFb-KBjTsCvaCpPPSS6EnMp_ZUNe3M-CpKct7TJQamlyi3H9dlXiEvYQYyFaUcsOJN1Z-sYxNvvpMSxEu-01zsRLh5DohPYYcU0GOhmx2iwBl56uSQmYvVjkvEywe8kC1FPA07EGzgn2nyVF4ALmdKuJ6g9kFgHk

// const LOauthOne = (ctx:any) => {
//     ctx.response.redirect(
//       oauth2Client.code.getAuthorizationUri(),
//     );
//   };

// const hardCode = "AQRQtZgS_T-LpTFQTnBKkzu2D98OJnhu7I8fZOR-K24QbTlakD3yFb-KBjTsCvaCpPPSS6EnMp_ZUNe3M-CpKct7TJQamlyi3H9dlXiEvYQYyFaUcsOJN1Z-sYxNvvpMSxEu-01zsRLh5DohPYYcU0GOhmx2iwBl56uSQmYvVjkvEywe8kC1FPA07EGzgn2nyVF4ALmdKuJ6g9kFgHk"

// const oauth2Clone = async (ctx: any) => {
  // const  redirectUri: String = oauth2Client 
  // ctx.cookies.set('test', 'tokens.accessToken', {httpOnly: true});
  // const test = await ctx.cookies.get("test") || '';
  // const test = "test"
  // const userResponse: any = await fetch(ctx.request.url, {
  //   headers: {
  //     Authorization: `Bearer ${test}`,
  //   },
  // })

//   ctx.response.redirect(oauth2Client.config.redirectUri);
// }


  const LOauthTwo = async (ctx:any, next:any) => {
      // console.log(oauth2Client)
    // Exchange the authorization code for an access token
    // const tokens = await oauth2Client.code.getToken(ctx.request.url);
    // console.log(`tokens ${tokens}`)
    // Use the access token to make an authenticated API request
    // const userResponse = await fetch("https://api.linkedin.com/v2/me", {
    //   headers: {
    //     Authorization: `Bearer ${tokens.accessToken}`,
    //   },
    // });
    // ctx.cookies.set('jwt', tokens.accessToken, {httpOnly: true})
    // console.log(userResponse)
    // const { name } = await userResponse.json();
    // console.log(name)
    await next()

  };

  export { LOauthOne, findCode }