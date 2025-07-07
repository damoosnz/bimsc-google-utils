import initDriveClient from "../init/initDriveClient.js";

/**
 * Lists files in a specific Google Drive folder.
 *
 * @async
 * @param {Object} params - The list settings.
 * @param {string} params.folderId - The ID of the folder to list files from. (Required)
 * @param {string[]} [params.fields] - Array of metadata fields to return for each file (optional).
 * @param {Object|boolean} [params.drive=false] - Optionally pass an initialized drive client.
 * @returns {Promise<Object[]>} Array of file objects.
 * @throws {Error} If folderId is not provided.
 */
export default async function listFilesInFolder({ folderId, fields = [], drive = false }) {
    if (!folderId) throw new Error('folderId is required');
    if (fields && !Array.isArray(fields)) throw new Error('fields must be an array of strings');

    if (!drive) {
        drive = await initDriveClient();
    }

    const query = `'${folderId}' in parents and trashed = false`;

    const res = await drive.files.list({
        q: query,
        fields: `files(${fields.length > 0 ? fields.join(',') : 'id,name,mimeType'})`,
        spaces: 'drive',
        pageSize: 1000,
    });

    return res.data.files || [];
}