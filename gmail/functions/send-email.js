import initGmailClient from "../init/init-gmail-client.js";

/**
 * Sends an email using the Gmail API.
 *
 * @async
 * @param {Object} params - The email settings.
 * @param {string} params.to - Recipient email address.
 * @param {string} params.subject - Email subject.
 * @param {string} params.body - Email body (plain text).
 * @returns {Promise<Object>} The sent message resource.
 * @throws {Error} If any required setting is missing.
 */
export default async function sendEmail({ to, subject, body, from }) {
    if (!to) throw new Error("Recipient (to) is required");
    if (!subject) throw new Error("Subject is required");
    if (!body) throw new Error("Body is required");

    const gmail = await initGmailClient();

    const messageParts = [
        from ? `From: ${from}` : undefined, // only include if `from` is defined
        `To: ${to}`,
        "Content-Type: text/plain; charset=utf-8",
        "MIME-Version: 1.0",
        `Subject: ${subject}`,
        "",
        body,
    ].filter(Boolean); // removes undefined entrie


    const message = messageParts.join("\n");

    const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    const res = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
            raw: encodedMessage,
        },
    });

    return res.data;
}