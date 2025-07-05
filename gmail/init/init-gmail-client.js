import { google } from "googleapis";
import { bimscJs } from "bimsc-js-utils";
import path from "path";

/**
 * Initializes and returns an authenticated Gmail client using a service account and domain-wide delegation.
 *
 * @async
 * @returns {Promise<import('googleapis').gmail_v1.Gmail>} The Gmail client.
 */
export default async function initGmailClient() {
    const glSaCredsPath = process.env.GL_SA_CREDENTIALS_PATH;
    const glSaImpersonateUser = process.env.GL_SA_IMPERSONATE_USER;

    if (!glSaCredsPath) {
        throw new Error('process.env.GL_SA_CREDENTIALS_PATH variable is missing');
    }
    if (!glSaImpersonateUser) {
        throw new Error('process.env.GL_SA_IMPERSONATE_USER variable is missing');
    }

    const resolvedglSaCredsPath = path.resolve(glSaCredsPath);
    const glSaCreds = bimscJs.files.readJsonFile(resolvedglSaCredsPath);

    const jwtClient = new google.auth.JWT({
        email: glSaCreds.client_email,
        key: glSaCreds.private_key,
        scopes: [
            "https://www.googleapis.com/auth/gmail.send",
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/gmail.modify"
        ],
        subject: glSaImpersonateUser,
    });

    await jwtClient.authorize();

    return google.gmail({ version: "v1", auth: jwtClient });
}