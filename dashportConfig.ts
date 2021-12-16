import GoogleStrategy from 'https://deno.land/x/dashport_google/mod.ts';
import GitHubStrategy from 'https://deno.land/x/dashport_github/mod.ts'
import { Client } from "https://deno.land/x/postgres/mod.ts"
import { dbCreds } from './config.ts'

const client = new Client(dbCreds);

export const googStrat = new GoogleStrategy({
  client_id: 'client-id-here',
  client_secret: 'client-secret-here',
  redirect_uri: 'http://localhost:8000/store',
  response_type: 'code', 
  scope: 'profile email openid',
  grant_type: 'authorization_code',
});

// export const ghStrat = new GitHubStrategy({
//   client_id: 'client-id-here',
//   client_secret: 'client-secret-here',
//   redirect_uri: 'http://localhost:8000/privatepage',
// })

export const serializerA = async (userInfo: any) => {
  const serializedId = Math.floor(Math.random() * 1000000000);
  userInfo.id = serializedId;

  try {
    await client.connect()
    const result:any = await client.queryArray("INSERT INTO registration(session) VALUES($6)", userInfo.id)
    return serializedId;
  } catch(err) {
    return err;
    // or return new Error(err);
  }
};

// export const serializerB = async (userInfo: any) => {
//   ...
// }

export const deserializerA = async (serializedId: (string | number)) => {
  try {
    await client.connect()
    const userInfo: any = await client.queryObject(`SELECT * FROM registration WHERE username = '${serializedId}'`)
    // const userInfo = await exampleDbFind({ id: serializedId });
    return userInfo;
  } catch(err) {
    return err;
    // or return new Error(err);
  }
};

// export const deserializerB = async (serializedId: (string | number)) => {
//   ...
// }