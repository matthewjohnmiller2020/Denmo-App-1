import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts"
import { dbCreds } from '../config.ts'

const client = new Client(dbCreds);


const hardCode = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://mail.google.com&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fstore&client_id=355975710617-72oa7uqupki1hhce0c036ai69edioj7e.apps.googleusercontent.com'




// var xhr = new XMLHttpRequest();
// xhr.open('GET',
//     'https://www.googleapis.com/drive/v3/about?fields=user&' +
//     'access_token=' + params['access_token']);
// xhr.onreadystatechange = function (e) {
//   console.log(xhr.response);
// };
// xhr.send(null);
/**
 * 
 */