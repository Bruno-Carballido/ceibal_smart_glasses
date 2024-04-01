import { goresturls } from "./urls"
import { env } from "app/config/env"


export const getUsername = async (email) => {
    try {
        // Consulto gorest.co.in para obtener el nombre de usuario dado un email
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
        throw error
    }
}