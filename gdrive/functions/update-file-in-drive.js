/**
 * Updates an existing file in Google Drive with new contents and MIME type.
 *
 * @async
 * @param {Object} params - The update settings.
 * @param {string} params.fileId - The ID of the file to update. (Required)
 * @param {string} params.mimeType - The MIME type of the file. (Required)
 * @param {Buffer|string} params.fileContents - The new contents of the file. (Required)
 * @param {string[]} [params.fields] - Array of metadata fields to return (optional).
 * @returns {Promise<Object>} The updated file resource.
 * @throws {Error} If any required setting is missing.
 */

import initDriveClient from "../init/initDriveClient.js";
import { toReadableStream } from "../utils/convert-file-contents-to-stream.js";
import  getFileFromDrive  from "./get-file-from-drive.js";

export default async function updateFileInDrive({ fileId, mimeType, fileContents, fields = [] }) {

    if (!fileId) throw new Error('fileId is required');
    if (!fileContents) throw new Error('fileContents is required');
    if (!mimeType) throw new Error('mimeType is required');
    if (!Array.isArray(fields)) throw new Error('fields must be an array of strings');

    const drive = await initDriveClient();

    const mediaBody = toReadableStream(fileContents);

    const params = {
        fileId,
        media: {
            mimeType,
            body: mediaBody,
        },
    };

    const res = await drive.files.update(params);

    if (fields.length > 0) {
        const resFld = await getFileFromDrive({fileId, fields});
        for (const field of fields) {
            if (resFld[field] !== undefined) {
                res.data[field] = resFld[field];
            }
        }
    }

    return res.data;
}