import { NextResponse } from 'next/server'
import { saveRequest } from "app/services/requests"

export async function POST(request) {
    try {
        const body = await request.json();
        try {
            const result = await saveRequest(body);
            return NextResponse.json({ message: "OK", result }, { status: 201 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Error", error }, { status: 500 });
        }
    } catch (error) {
        return Response.json([])
    }
}