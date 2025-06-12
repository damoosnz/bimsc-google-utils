import initDriveClient from "../init/initDriveClient.js";
import { toReadableStream } from "../utils/convert-file-contents-to-stream.js";

/**
 * Updates an existing file in Google Drive with new contents and MIME type.
 *
 * @async
 * @param {Object} settings - The update settings.
 * @param {string} settings.fileId - The ID of the file to update. (Required)
 * @param {string} settings.mimeType - The MIME type of the file. (Required)
 * @param {Buffer|string} settings.fileContents - The new contents of the file. (Required)
 * @returns {Promise<Object>} The updated file resource.
 * @throws {Error} If any required setting is missing.
 */

export default async function updateFileInDrive(settings = { fileId, mimeType, fileContents }) {

    if (!settings.fileId) throw new Error('fileId is required');
    if (!settings.fileContents) throw new Error('fileContents is required');
    if (!settings.mimeType) throw new Error('mimeType is required');

    const drive = await initDriveClient();

    const mediaBody = toReadableStream(settings.fileContents)

    const res = await drive.files.update({
        fileId: settings.fileId,
        media: {
            mimeType: settings.mimeType,
            body: mediaBody,
            fields: 'id, name, webViewLink',
        },
    });

    return res.data;

}