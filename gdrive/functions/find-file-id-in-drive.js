/**
 * Finds the ID of a file in Google Drive by its name (and optionally within a specific folder).
 *
 * @async
 * @param {Object} settings - The search settings.
 * @param {string} settings.fileName - The name of the file to search for. (Required)
 * @param {string} [settings.folderId] - The ID of the folder to search within. (Optional)
 * @returns {Promise<string|null>} The file ID if found, or null if not found.
 * @throws {Error} If fileName is not provided.
 */

import initDriveClient from "../init/initDriveClient.js";

export default async function findIdInDrive({ drive = false, folderId, fileName, type = 'file' }) {

    if (!fileName) throw new Error('fileName is required');

    if (!drive) {
        drive = await initDriveClient();
    }

    // Build the query string
    let query = `name = '${fileName.replace(/'/g, "\\'")}' and trashed = false`;

    if (folderId) {
        query = `'${folderId}' in parents and ` + query;
    }

    if (type === 'folder') {
        query += " and mimeType = 'application/vnd.google-apps.folder'";
    }

    const res = await drive.files.list({
        q: query,
        fields: 'files(id, name)',
        spaces: 'drive',
        pageSize: 1, // only need the first match
    });

    const files = res.data.files;
    if (files && files.length > 0) {
        return files[0].id;
    } else {
        return null;
    }

}