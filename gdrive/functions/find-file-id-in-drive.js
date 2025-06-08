export default async function findFileIdInDrive(settings = { folderId, fileName }) {

    if (!fileId) throw new Error('fileId is required');

    const drive = await initDriveClient();

    // Build the query string
    let query = `name = '${fileName.replace(/'/g, "\\'")}' and trashed = false`;
    if (folderId) {
        query = `'${folderId}' in parents and ` + query;
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