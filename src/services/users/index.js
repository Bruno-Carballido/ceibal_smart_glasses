import { goresturls } from "./urls"
import { env } from "app/config/env"


export const getUsername = async (email) => {
    try {
        const response = await fetch(`${goresturls.users.byemail}?email=${email}`, {
            headers: {
                Authorization: `Bearer ${env.GOREST_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            }
        }
        )
        const userData = await response.json()
        if (userData.length == 1)
            return userData[0].name
    } catch (error) {
        return {}
    }
}