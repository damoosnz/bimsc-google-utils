/**
 * Core Utility for fetching data from the Google Gemini API endpoint.
 * Handles network connection, API key injection, and exponential backoff/retries.
 * * This function does NOT handle any prompt construction, categorization logic, 
 * or response parsing; it only handles the raw HTTP request/response cycle.
 */

const DEFAULT_MODEL = 'gemini-2.5-flash-preview-09-2025';

/**
 * Fetches the raw JSON response from the Gemini API endpoint.
 * * @param {Object} payload - The complete API request body (contents, generationConfig, etc.).
 * @param {string} [modelName=DEFAULT_MODEL] - The name of the Gemini model to use (e.g., 'gemini-2.5-flash-preview-09-2025').
 * @returns {Promise<Object|null>} The raw JSON response object from the API, or null on failure after retries.
 */
export async function fetchGeminiApi(payload, modelName = DEFAULT_MODEL) {
    // The apiKey constant is a placeholder. The runtime environment automatically 
    // injects the correct authentication for the API call via the query parameter.
    const apiKey = process.env.GEMINI_API_KEY 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    // --- API Call with Exponential Backoff ---
    for (let attempt = 0; attempt < 5; attempt++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Throw error for non-successful HTTP statuses (4xx, 5xx)
            if (!response.ok) {
                // Read response text for detailed error if available
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText.substring(0, 150)}`);
            }
            
            // Return the parsed JSON response
            const result = await response.json();
            return result; 

        } catch (error) {
            // Log error internally
            console.error(`Gemini API Attempt ${attempt + 1} failed: ${error.message}`);
            
            if (attempt === 4) {
                // Last attempt failed, break loop and return null
                break;
            }
            
            // Exponential backoff delay (1s, 2s, 4s, 8s, 16s)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
    }

    // Return null if all retries fail
    return null;
}
