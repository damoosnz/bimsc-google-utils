import initGmailClient from "../init/initGmailClient.js";

/**
 * Lists email messages in the user's mailbox.
 *
 * @async
 * @param {Object} [options] - List options.
 * @param {string} [options.q] - Search query (Gmail search syntax).
 * @param {number} [options.maxResults] - Maximum number of results to return.
 * @returns {Promise<Object[]>} Array of email message resources.
 */
export default async function listEmails({ q = "", maxResults = 10 } = {}) {
    const gmail = await initGmailClient();

    const res = await gmail.users.messages.list({
        userId: "me",
        q,
        maxResults,
    });

    return res.data.messages || [];
}