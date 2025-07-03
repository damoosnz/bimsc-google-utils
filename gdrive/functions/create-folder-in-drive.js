import initDriveClient from "../init/initDriveClient.js";

/**
 * Creates a new folder in Google Drive.
 *
 * @async
 * @param {Object} params - The folder creation settings.
 * @param {string} params.folderName - The name of the folder to create. (Required)
 * @param {string} [params.parentId] - The ID of the parent folder (optional).
 * @param {string[]} [params.fields] - Array of metadata fields to return (optional).
 * @returns {Promise<Object>} The created folder resource.
 * @throws {Error} If folderName is not provided.
 */
export default async function createFolderInDrive({ folderName, parentId, fields = [] }) {
    
    if (!folderName) throw new Error('folderName is required');
    if (fields && !Array.isArray(fields)) throw new Error('fields must be an array of strings');

    const drive = await initDriveClient();

    const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
    };

    if (parentId) {
        fileMetadata.parents = [parentId];
    }

    const params = {
        requestBody: fileMetadata,
        fields: fields.length > 0 ? fields.join(', ') : 'id, name, parents, webViewLink',
    };

    const res = await drive.files.create(params);

    return res.data;
}