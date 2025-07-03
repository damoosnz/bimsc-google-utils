import initDriveClient from "../init/initDriveClient.js";

/**
 * Moves a file to a different folder in Google Drive.
 *
 * @async
 * @param {Object} params - The move settings.
 * @param {string} params.fileId - The ID of the file to move. (Required)
 * @param {string} params.folderId - The ID of the destination folder. (Required)
 * @returns {Promise<Object>} The updated file resource.
 * @throws {Error} If any required setting is missing.
 */
export default async function moveFile({ fileId, folderId, fields = [] }) {
    
    if (!fileId) throw new Error('fileId is required');
    if (!folderId) throw new Error('folderId is required');

    const drive = await initDriveClient();

    // Get the file's current parents
    const file = await drive.files.get({
        fileId,
        fields: 'parents',
    });

    const previousParents = file.data.parents ? file.data.parents.join(',') : '';

    // Move the file to the new folder
    const res = await drive.files.update({
        fileId,
        addParents: folderId,
        removeParents: previousParents,
        fields
    });

    return res.data;
}