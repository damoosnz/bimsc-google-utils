import findFileIdInDrive from "./find-file-id-in-drive.js"
import updateFileInDrive from "./update-file-in-drive.js"
import uploadFileToDrive from "./upload-file-to-drive.js"

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

