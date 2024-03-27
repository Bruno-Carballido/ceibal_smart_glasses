import { getUsername } from "app/services/users"

export async function GET(request) {
    try {
        const params = new URL(request.url).searchParams

        const email = params.get('email')
        const username = await getUsername(email)
        return Response.json({ username })
    }catch{
        return Response.json({})
    }
    
}