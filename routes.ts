import { Router } from "https://deno.land/x/oak/mod.ts"
import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";
import { addProduct, getProducts, getProduct, deleteProduct, addToCart, deleteFromtCart, getCartProducts } from './controllers/products.ts'
import { addUser, loginUser, jwtLogin, logout } from './controllers/users.ts'
import { registerPage, loginPage, home, storePage } from './controllers/render.ts'
import { userMiddleware } from './controllers/userMiddleware.ts'
import { OauthOne, OauthTwo } from './OauthControllers/gitHub.ts'
import { LOauthOne, LOauthTwo } from './OauthControllers/LinkedIn.ts'
// import { dashport } from './server.ts'
// import { ghStrat, serializerA, deserializerA } from './dashportConfig.ts';

// import { storeRender, purchase } from './controllers/stripe.ts'
// import { handler } from './controllers/stripe.ts'

const router = new Router();


router.get('/', home)
      // .post('/api/products', addProduct)
      // .get('/api/products', getProducts)
      // .get('/api/incart', getCartProducts)
      // .get('/api/products/:id', getProduct)
      // .delete('/api/products/:id', deleteProduct)
      // .post('/api/register', addUser)
      // .post('/api/login', loginUser)
      // .get('/api/user', jwtLogin)
      // .get('/api/logout', logout)
      // .patch('/api/addtocart/:id', addToCart)
      // .patch('/api/deletefromcart/:id', deleteFromtCart)
      // .get('/login', loginPage)
      // .get('/register', registerPage)
      // .get('/store', storePage)
      // .get('/gitHub', OauthOne)
      // .get('/linkedin', LOauthOne)
      // // .get('/auth/linkedin/callback', LOauthTwo, storePage)
      // .get('/auth/github/callback', OauthTwo, storePage)
      // // .get('/auth/linkedin/callback', LOauthTwo, storePage)
 
   
      
      // .get('/privatepage', dashport.authenticate(googStrat, serializerA, deserializerA),
      //   async (ctx: any, next: any) => {
      //   ctx.response.body = 'This is a private page!';
      // })




      // .get('/store', storeRender)

      // router.post('/api/register', async (ctx: any) => {
      //       const body = await ctx.request.body({ type: 'form-data '});
      //       console.log(body)
      //       const formData = await body.value.read();
      //       console.log(formData.fields);
      //       ctx.response.redirect("/");
      //     });
  

export default router