import initGmailClient from "../init/init-gmail-client.js";

/**
 * Sends an email using the Gmail API, with optional attachments and alias support.
 *
 * @async
 * @param {Object} params - The email settings.
 * @param {string} params.to - Recipient email address.
 * @param {string} params.subject - Email subject.
 * @param {string} params.body - Email body (plain text).
 * @param {string} [params.from] - The sender's email address (alias).
 * @param {Array<{filename: string, content: Buffer|string, mimeType?: string}>} [params.attachments] - Attachments.
 * @returns {Promise<Object>} The sent message resource.
 * @throws {Error} If any required setting is missing.
 */
export default async function sendEmail({ to, subject, body, from, attachments = [] }) {
    if (!to) throw new Error("Recipient (to) is required");
    if (!subject) throw new Error("Subject is required");
    if (!body) throw new Error("Body is required");
    if (attachments && !Array.isArray(attachments)) throw new Error("attachments must be an array");

    const gmail = await initGmailClient();

    // Build headers
    const boundary = "__bimsc_gmail_boundary__";
    const headers = [
        from ? `From: ${from}` : undefined,
        `To: ${to}`,
        "MIME-Version: 1.0",
        `Subject: ${subject}`,
        attachments.length > 0
            ? `Content-Type: multipart/mixed; boundary="${boundary}"`
            : "Content-Type: text/html; charset=utf-8",
    ].filter(Boolean);

    // Build body
    let messageBody = "";
    if (attachments.length > 0) {
        // Main text part
        messageBody += `--${boundary}\r\n`;
        messageBody += "Content-Type: text/html; charset=utf-8\r\n\r\n";
        messageBody += `${body}\r\n`;

        // Attachments
        for (const att of attachments) {
            const content = Buffer.isBuffer(att.content)
                ? att.content
                : Buffer.from(att.content, "base64");
            const mimeType = att.mimeType || "application/octet-stream";
            messageBody += `--${boundary}\r\n`;
            messageBody += `Content-Type: ${mimeType}; name="${att.filename}"\r\n`;
            messageBody += "Content-Transfer-Encoding: base64\r\n";
            messageBody += `Content-Disposition: attachment; filename="${att.filename}"\r\n\r\n`;
            messageBody += content.toString("base64").replace(/(.{76})/g, "$1\n") + "\r\n";
        }
        messageBody += `--${boundary}--`;
    } else {
        messageBody = body;
    }

    const message = headers.join("\n") + "\n\n" + messageBody;

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