import { Application } from "https://deno.land/x/oak/mod.ts"
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import onyx from 'https://deno.land/x/onyx/mod.ts'
// import { connect } from "https://deno.land/x/redis/mod.ts";
// import { OakSession, RedisStore } from "https://deno.land/x/sessions/mod.ts";
import { Session } from "https://deno.land/x/session/mod.ts";
// import {
//     viewEngine,
//     engineFactory,
//     adapterFactory
// } from 'https://deno.land/x/view_engine/mod.ts';
import router from './routes.ts'

// const ejsEngine = engineFactory.getEjsEngine();
// const oakAdapter = adapterFactory.getOakAdapter();


const port =  Deno.env.get("PORT") || 3000
const app = new Application()

const session: Session = new Session({ framework: "oak" });
await session.init();

// Adding the Session middleware. Now every context will include a property
// called session that you can use the get and set functions on
app.use(session.use()(session));

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

app.addEventListener('error', evt => {
    console.log(evt.error);
  });

  router.get("/", async (context) => {

    // Examples of getting and setting variables on a session
    if (!await context.state.session.has("pageCount")) {
        await context.state.session.set("pageCount", 0);

    } else {
        await context.state.session.set("pageCount", await context.state.session.get("pageCount") + 1);
    }

    // If you only want a variable to survive for a single request, you can "flash" it instead
    await context.state.session.flash("message", "I am good for form validations errors, success messages, etc.")
    
    context.response.body = `Visited page ${await context.state.session.get("pageCount")} times`;
});

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

// console.log(config());
console.log(`Server running on port ${port}`)

await app.listen({port: +port})

