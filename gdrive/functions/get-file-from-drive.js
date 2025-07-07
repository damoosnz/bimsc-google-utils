/**
 * Retrieves file metadata from Google Drive.
 *
 * @async
 * @param {string} fileId - The ID of the file to retrieve. (Required)
 * @param {string[]} [fields] - Array of metadata fields to retrieve (e.g., ['name', 'webViewLink']).
 * @returns {Promise<Object>} The file metadata.
 * @throws {Error} If fileId is not provided or retrieval fails.
 */

import initDriveClient from "../init/initDriveClient.js";

export default async function getFileFromDrive({drive = false,  fileId, fields = [] }) {
    if (!fileId) throw new Error('fileId is required');
    if (fields && !Array.isArray(fields)) {
        throw new Error('fields must be an array of strings');
    }

    if (!drive) {
        drive = await initDriveClient();
    }

    try {
        const params = { fileId };

        if (fields.length > 0) {
            params.fields = fields.join(', ');
        }

        const res = await drive.files.get(params);

        return res.data;
    } catch (error) {
        console.error('Error fetching file from Drive:', error);
        throw new Error('Failed to retrieve file from Google Drive');
    }
}