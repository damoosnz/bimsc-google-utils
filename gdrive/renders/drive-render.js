import findIdInDrive from "../functions/find-file-id-in-drive.js"
import getFileFromDrive from "../functions/get-file-from-drive.js"

import updateFileInDrive from "../functions/update-file-in-drive.js"
import uploadOverwriteFileInDrive from "../functions/overwrite-file-in-drive.js"
import uploadFileToDrive from "../functions/upload-file-to-drive.js"
import initDriveClient from "../init/initDriveClient.js"
import moveFile from "../functions/move-file.js"
import createFolderInDrive from "../functions/create-folder-in-drive.js"

export const drive = {
    findId: findIdInDrive,
    getFile: getFileFromDrive,
    uploadFile: uploadFileToDrive,
    updateFile: updateFileInDrive,
    overwriteFile: uploadOverwriteFileInDrive,
    moveFile: moveFile,
    createFolder: createFolderInDrive,
    initDriveClient: initDriveClient,    
}
