import findFileIdInDrive from "./find-file-id-in-drive.js"
import updateFileInDrive from "./update-file-in-drive.js"
import uploadFileToDrive from "./upload-file-to-drive.js"

/**
 * Uploads a file to Google Drive, overwriting it if it already exists in the specified folder.
 *
 * @async
 * @param {Object} settings - The upload settings.
 * @param {string} settings.folderId - The ID of the folder to upload to. (Required)
 * @param {string} settings.mimeType - The MIME type of the file. (Required)
 * @param {string} settings.fileName - The name of the file. (Required)
 * @param {Buffer|string} settings.fileContents - The contents of the file. (Required)
 * @returns {Promise<Object>} The uploaded or updated file resource.
 * @throws {Error} If any required setting is missing.
 */

export async function uploadOverwriteFileInDrive(settings = { folderId, mimeType, fileName, fileContents }) {

    if (!settings.folderId) throw new Error('folderId is required');
    if (!settings.fileContents) throw new Error('fileContents is required');
    if (!settings.mimeType) throw new Error('mimeType is required');
    if (!settings.fileName) throw new Error('fileName is required');

    // look for an existing file

    const extgFileId = await findFileIdInDrive({
        folderId: settings.folderId,
        fileName: settings.fileName
    })

    let file
    if (extgFileId) {
        file = await updateFileInDrive({
            fileId: extgFileId,
            mimeType: settings.mimeType,
            fileContents: settings.fileContents,
        })
    } else {
        file = await uploadFileToDrive({
            folderId: settings.folderId,
            mimeType: settings.mimeType,
            fileName: settings.fileName,
            fileContents: settings.fileContents,
        })
    }

    return file

}

