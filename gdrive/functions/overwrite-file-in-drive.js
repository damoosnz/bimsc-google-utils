import findFileIdInDrive from "./find-file-id-in-drive.js";
import updateFileInDrive from "./update-file-in-drive.js";
import uploadFileToDrive from "./upload-file-to-drive.js";

/**
 * Uploads a file to Google Drive, overwriting it if it already exists in the specified folder.
 *
 * @async
 * @param {Object} params - The upload settings.
 * @param {string} params.folderId - The ID of the folder to upload to. (Required)
 * @param {string} params.mimeType - The MIME type of the file. (Required)
 * @param {string} params.fileName - The name of the file. (Required)
 * @param {Buffer|string} params.fileContents - The contents of the file. (Required)
 * @param {string[]} [params.fields] - Array of metadata fields to return (optional).
 * @returns {Promise<Object>} The uploaded or updated file resource.
 * @throws {Error} If any required setting is missing.
 */
export async function uploadOverwriteFileInDrive({ folderId, mimeType, fileName, fileContents, fields = [] }) {
    if (!folderId) throw new Error('folderId is required');
    if (!fileContents) throw new Error('fileContents is required');
    if (!mimeType) throw new Error('mimeType is required');
    if (!fileName) throw new Error('fileName is required');
    if (!Array.isArray(fields)) throw new Error('fields must be an array of strings');

    // look for an existing file
    const extgFileId = await findFileIdInDrive({ folderId, fileName });

    let file;
    if (extgFileId) {
        file = await updateFileInDrive({
            fileId: extgFileId,
            mimeType,
            fileContents,
            fields
        });
    } else {
        file = await uploadFileToDrive({
            folderId,
            mimeType,
            fileName,
            fileContents,
            fields,
        });
    }

    return file;
}

