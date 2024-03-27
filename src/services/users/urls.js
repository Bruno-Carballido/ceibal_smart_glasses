import { env } from "app/config/env"


export const goresturls = {
    users: {
        'byemail': `${env.GOREST_HOSTNAME}/public/v2/users`
    }
}