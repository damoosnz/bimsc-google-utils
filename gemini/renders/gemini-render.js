import { fetchGeminiApi } from "../functions/fetch-gemini-api.js"
import { buildGeminiPayload } from "../functions/build-gemini-payload.js"

export const gemini = {
    fetch: fetchGeminiApi,
    payload: buildGeminiPayload
}