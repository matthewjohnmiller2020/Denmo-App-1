// import { config } from "https://deno.land/x/dotenv/mod.ts";

// const obj = config()
// const publicKey = Object.values(obj)[1]
// const stripe = Object.values(obj)[2]

// const storeRender = async (ctx:any, response:any) => {
//     const data = await Deno.readTextFile('items.json')
//       try {
//         ctx.render('store.ejs', {
//             stripePublicKey: publicKey,
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

// export { storeRender }