import { Application } from "https://deno.land/x/oak/mod.ts"
import { oakCors } from "https://deno.land/x/cors/mod.ts";
// import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";
// import { config } from "https://deno.land/x/dotenv/mod.ts";
// import { DashportOak } from 'https://deno.land/x/dashport@v1.2.1/mod.ts';
// import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";
// import { ghStrat, serializerA, deserializerA } from './dashportConfig.ts';
import router from './routes.ts'

// const obj = config()
// const clientKey = Object.values(obj)[1]

// const oauth2Client = new OAuth2Client({
//   clientId: '8d769a8e565111f853fb',
//   clientSecret: clientKey,
//   authorizationEndpointUri: "https://github.com/login/oauth/authorize",
//   tokenUri: "https://github.com/login/oauth/access_token",
//   redirectUri: "http://localhost:3000/auth/github/callback",
//   defaults: {
//     scope: "read:user",
//   },
// });


// import onyx from 'https://deno.land/x/onyx/mod.ts'
// import { connect } from "https://deno.land/x/redis/mod.ts";
// import { OakSession, RedisStore } from "https://deno.land/x/sessions/mod.ts";
// import { Session } from "https://deno.land/x/session/mod.ts";
// import {
//     viewEngine,
//     engineFactory,
//     adapterFactory
// } from 'https://deno.land/x/view_engine/mod.ts';


// const ejsEngine = engineFactory.getEjsEngine();
// const oakAdapter = adapterFactory.getOakAdapter();

// router.get("/gitHub", (ctx) => {
//   ctx.response.redirect(
//     oauth2Client.code.getAuthorizationUri(),
//   );
// });

// router.get("/auth/github/callback", async (ctx) => {
//   // Exchange the authorization code for an access token
//   const tokens = await oauth2Client.code.getToken(ctx.request.url);

//   // Use the access token to make an authenticated API request
//   const userResponse = await fetch("https://api.github.com/user", {
//     headers: {
//       Authorization: `Bearer ${tokens.accessToken}`,
//     },
//   });
//   const { name } = await userResponse.json();

//   // ctx.response.body = `Hello, ${name}!`;
//   ctx.response.body = await renderFileToString(
//     `${Deno.cwd()}/views/store.ejs`,
//     {},
//   );
// });


const port: String|any =  Deno.env.get("PORT") || 3000
const app = new Application()

// export const dashport: any = new DashportOak(app);



// router.get('./gitHub', dashport.authenticate(ghStrat, serializerA, deserializerA)), 
// async (ctx: any, next: any) => {
//   ctx.response.body = 'This is a private page!';
// }

// router.get('/auth/github/callback', 
//   dashport.authenticate(ghStrat, serializerA, deserializerA),
//   async (ctx: any, next: any) => {
//     if (ctx.locals instanceof Error) {
//       ctx.response.body = 'An Error occurred!';
//     } else {
//       const displayName = ctx.locals.displayName;
//       ctx.response.body = `Welcome ${displayName}!`;
//     }
//   }
// )


// async (ctx: any) => {
// ctx.response.body = await renderFileToString(
//       `${Deno.cwd()}/views/store.ejs`,
//       {},
//       )
    // }

// const session: Session = new Session({ framework: "oak" });
// await session.init();

// Adding the Session middleware. Now every context will include a property
// called session that you can use the get and set functions on
// app.use(session.use()(session));

// const store:any = new RedisStore({
//   host: '127.0.0.1',
//   port: 6379
// });

// Since Redis connection is async, must be initialized before used
// await store.init();

// const store: any = new WebdisStore({
//   url: 'http://127.0.0.1:7379'
// });
// Attach sessions to middleware
// const session = new OakSession(app, store);

// const store:any = new SqliteStore({
//   path: './database.db',
//   tableName: 'sessions' // optional
// })

// Attach sessions to middleware
// const session = new OakSession(app, store);




// Attach sessions to middleware
// const session = new OakSession(app, store);

// await session.createSession();
// app.use(session.use()(session));

app.use(oakCors({
    credentials: true,
    origin: /^.+localhost:(3000)$/,
}))

// app.addEventListener('error', evt => {
//     console.log(evt.error);
//   });

//   router.get("/", async (context) => {

//     // Examples of getting and setting variables on a session
//     if (!await context.state.session.has("pageCount")) {
//         await context.state.session.set("pageCount", 0);

//     } else {
//         await context.state.session.set("pageCount", await context.state.session.get("pageCount") + 1);
//     }

//     // If you only want a variable to survive for a single request, you can "flash" it instead
//     await context.state.session.flash("message", "I am good for form validations errors, success messages, etc.")
    
//     context.response.body = `Visited page ${await context.state.session.get("pageCount")} times`;
// });

app.use(router.routes())
app.use(router.allowedMethods())

// app.use(viewEngine(oakAdapter,ejsEngine));

// app.use(async (ctx,next) => {
//     await next();
//     const rt = ctx.response.headers.get("X-Response-Time");
//     console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
// });

// app.use(async (ctx,next) => {
//     await send(ctx, ctx.request.url.pathname,{
//         root: `${Deno.cwd()}/static`
//     });
//     next();
// })

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});



console.log(`Server running on port ${port}`)

await app.listen({port: +port})

