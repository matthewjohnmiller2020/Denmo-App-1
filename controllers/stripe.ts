// import { config } from "https://deno.land/x/dotenv/mod.ts";
// import { Stripe } from "https://esm.sh/stripe?target=deno"


// const obj = config()
// const pubKey = Object.values(obj)[1]
// const stripe = Stripe(Object.values(obj)[2], {
//     httpClient: Stripe.createFetchHttpClient()
// })

// async function handler(request:any) {
//     const session = await stripe.checkout.session.create({
//         success_url: 'http://localhost:3000/success',
//         cancel_url: 'http://localhost:3000/cancel',
//         line_items: [{
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: 'Blue shirt'
//                 },
//                 unit_amount: 2000,
//             },
//             quantity: 1,
//         }],
//         medo: 'payment',
//     })
//     return Response.redirect(session.url, 303)
// }

// const storeRender = async (ctx:any, response:any) => {
//     const data = await Deno.readTextFile('items.json')
//       try {
//         ctx.render('store.ejs', {
//             stripePublicKey: pubKey,
//             items: JSON.parse(data)
//           })
//       } catch (error) {
//         response.status(500).end()
//       }
// }   

// const purchase = async ({ request, response }: {request: any, response: any }) => {
//     const data = await Deno.readTextFile('items.json') 
//       try {
//         const itemsJson = JSON.parse(data)
//         const itemsArray = itemsJson.music.concat(itemsJson.merch)
//         let total = 0
//         request.body.items.forEach(function(item:any) {
//           const itemJson = itemsArray.find(function(i:any) {
//             return i.id == item.id
//           })
//           total = total + itemJson.price * item.quantity
//         })
  
//         stripe.charges.create({
//           amount: total,
//           source: request.body.stripeTokenId,
//           currency: 'usd'
//         }).then(function() {
//           console.log('Charge Successful')
//           response.json({ message: 'Successfully purchased items' })
//         }).catch(function() {
//           console.log('Charge Fail')
//           response.status(500).end()
//         })
//       } catch (error) {
//         response.status(500).end()
//       }
// }

// export { storeRender, purchase }

// export { handler }

