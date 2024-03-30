import { getModels } from "app/services/models"

export async function GET() {
    return getModels()
}