import initGmailClient from "../init/init-gmail-client.js";

/**
 * Retrieves an email message by ID from Gmail.
 *
 * @async
 * @param {string} messageId - The ID of the email message to retrieve.
 * @param {string[]} [fields] - Array of fields to retrieve (optional).
 * @returns {Promise<Object>} The email message resource.
 * @throws {Error} If messageId is not provided.
 */
export default async function getEmail(messageId, fields = []) {
    if (!messageId) throw new Error("messageId is required");
    if (fields && !Array.isArray(fields)) throw new Error("fields must be an array of strings");

    const gmail = await initGmailClient();

    const params = { userId: "me", id: messageId };
    if (fields.length > 0) {
        params.format = "full";
        params.fields = fields.join(", ");
    }

    const res = await gmail.users.messages.get(params);
    return res.data;
}