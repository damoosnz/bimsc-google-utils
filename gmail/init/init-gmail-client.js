import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

/**
 * Initializes and returns an authenticated Gmail client using a service account.
 *
 * @async
 * @returns {Promise<import('googleapis').gmail_v1.Gmail>} The Gmail client.
 */
export default async function initGmailClient() {
    // Set up authentication using a service account
    const auth = new GoogleAuth({
        scopes: [
            "https://www.googleapis.com/auth/gmail.send",
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/gmail.modify"
        ],
    });

    // If you need to impersonate a user, set the subject (user email)
    // const client = await auth.getClient({ subject: "user@yourdomain.com" });
    const client = await auth.getClient();

    return google.gmail({ version: "v1", auth: client });
}