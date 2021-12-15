import { Router } from "https://deno.land/x/oak/mod.ts"
import { addProduct, getProducts, getProduct, deleteProduct, addToCart, deleteFromtCart, getCartProducts } from './controllers/products.ts'
import { addUser, loginUser, jwtLogin, logout  } from './controllers/users.ts'
import { registerPage, loginPage, home, store } from './controllers/render.ts'
// import { storeRender } from './controllers/stripe.ts'

const router = new Router();


router.post('/api/products', addProduct)
      .get('/api/products', getProducts)
      .get('/api/incart', getCartProducts)
      .get('/api/products/:id', getProduct)
      .delete('/api/products/:id', deleteProduct)
      .post('/api/register', addUser)
      .post('/api/login', loginUser)
      .get('/api/user', jwtLogin)
      .post('/api/logout', logout)
      .patch('/api/addtocart/:id', addToCart)
      .patch('/api/deletefromcart/:id', deleteFromtCart)
      .get('/login', loginPage)
      .get('/register', registerPage)
      .get('/store', store)
      .get('/', home)
      // .get('/store', storeRender)

      // router.post('/api/register', async (ctx: any) => {
      //       const body = await ctx.request.body({ type: 'form-data '});
      //       console.log(body)
      //       const formData = await body.value.read();
      //       console.log(formData.fields);
      //       ctx.response.redirect("/");
      //     });
  

export default router