import initDriveClient from "../../gdrive/init/initDriveClient.js";

/**
 * Retrieves a file from Google Drive and returns an attachment object
 * suitable for use with sendEmail.
 *
 * @async
 * @param {string} fileId - The ID of the file to attach.
 * @returns {Promise<{filename: string, content: Buffer, mimeType: string}>} The attachment object.
 */
export default async function getDriveAttachment(fileId) {
    const drive = await initDriveClient();

    // Get file metadata (name and mimeType)
    const metaRes = await drive.files.get({
        fileId,
        fields: "name,mimeType"
    });

    // Get file content
    const contentRes = await drive.files.get(
        { fileId, alt: "media" },
        { responseType: "arraybuffer" }
    );

    return {
        filename: metaRes.data.name,
        content: Buffer.from(contentRes.data),
        mimeType: metaRes.data.mimeType
    };
}