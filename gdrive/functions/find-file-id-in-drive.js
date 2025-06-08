import initDriveClient from "../init/initDriveClient.js";

export default async function findFileIdInDrive(settings = { folderId, fileName }) {

    if (!settings.fileName) throw new Error('fileName is required');

    const drive = await initDriveClient();

    // Build the query string
    let query = `name = '${settings.fileName.replace(/'/g, "\\'")}' and trashed = false`;
    if (settings.folderId) {
        query = `'${settings.folderId}' in parents and ` + query;
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