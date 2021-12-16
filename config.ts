import { config } from "https://deno.land/x/dotenv/mod.ts";

const obj = config()
const pubKey = Object.values(obj)[0]

const dbCreds = {
    user: "DeNiMM",
    database: "Denmoapi",
    password: pubKey,
    hostname: "localhost",
    port: 5432
}

export { dbCreds }