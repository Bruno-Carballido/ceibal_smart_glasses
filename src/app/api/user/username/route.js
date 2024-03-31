import { NextResponse } from 'next/server'
import { getUsername } from "app/services/users"

export async function GET(request) {
    try {
        const params = new URL(request.url).searchParams

        const email = params.get('email')
        const username = await getUsername(email)
        return NextResponse.json({ message: "OK", username }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}