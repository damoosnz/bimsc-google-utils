
import initGmailClient from "../init/init-gmail-client.js";

/**
 * Lists email messages in the user's mailbox.
 *
 * @async
 * @param {Object} [options] - List options.
 * @param {string} [options.q] - Search query (Gmail search syntax).
 * @param {number} [options.maxResults] - Maximum number of results to return.
 * @returns {Promise<Object[]>} Array of email message resources.
 */
export default async function listEmails({ gmail = false, q = "", maxResults = 10, format = 'metadata' }) {

    if (!gmail) {
        gmail = await initGmailClient();
    }

    const res = await gmail.users.messages.list({
        userId: "me",
        q,
        maxResults,
        format,
        metadataHeaders: ["From", "To", "Subject", "Date"]
    });

    return res.data.messages || [];
}