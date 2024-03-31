import { NextResponse } from 'next/server'
import { getModels } from "app/services/models"

export async function GET() {
    try {
        const models = await getModels()
        return NextResponse.json({ message: "OK", models }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}