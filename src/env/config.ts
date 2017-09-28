
import {env} from "./env";

let finalConfig;
if(process.env.NODE_ENV === 'prod'){
    finalConfig = {
        "db": {
            "user": process.env.PSQL_USER,
            "pass": process.env.PSQL_PASS,
            "host": process.env.PSQL_HOST,
            "port": process.env.PSQL_PORT,
            "name": process.env.PSQL_NAME,
        },
        "jwt": process.env.JWT
    };
}else{
    finalConfig = env;
}

export const config = finalConfig;