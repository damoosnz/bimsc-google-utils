/**
 * Utility function to construct the JSON payload required for the Gemini API.
 * This function handles all structural requirements like contents, system instructions,
 * tools, and setting up the JSON schema for structured output.
 *
 * @param {Object} options - Configuration options for the payload.
 * @param {string} options.userQuery - The main instruction or prompt for the model.
 * @param {string} [options.systemInstruction=null] - Instructions defining the model's persona or constraints.
 * @param {Object} [options.responseSchema=null] - JSON schema to enforce structured output.
 * @param {Array<Object>} [options.tools=[]] - Array of tools (e.g., [{ "google_search": {} }]) to enable grounding.
 * @returns {Object} The complete JSON payload object ready for the API call.
 */
export function buildGeminiPayload({
    userQuery,
    systemInstruction = null,
    responseSchema = null,
    tools = []
}) {
    const payload = {
        contents: [
            { parts: [{ text: userQuery }] }
        ],
    };

    if (systemInstruction) {
        // System instructions define the model's role and tone.
        payload.systemInstruction = {
            parts: [{ text: systemInstruction }]
        };
    }

    if (tools.length > 0) {
        // Tools, like Google Search, enable grounding (web access).
        payload.tools = tools;
    }

    if (responseSchema) {
        // Generation configuration enforces structured JSON output.
        payload.generationConfig = {
            responseMimeType: "application/json",
            responseSchema: responseSchema
        };
    }
    
    return payload;
}
