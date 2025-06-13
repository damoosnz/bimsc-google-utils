import findFileIdInDrive from "../functions/find-file-id-in-drive.js"
import getFileFromDrive from "../functions/get-file-from-drive.js"

import updateFileInDrive from "../functions/update-file-in-drive.js"
import uploadOverwriteFileInDrive from "../functions/overwrite-file-in-drive.js"
import uploadFileToDrive from "../functions/upload-file-to-drive.js"
import initDriveClient from "../init/initDriveClient.js"

export const drive = {
    findFileId: findFileIdInDrive,
    getFile: getFileFromDrive,
    uploadFile: uploadFileToDrive,
    updateFile: updateFileInDrive,
    overwriteFile: uploadOverwriteFileInDrive,
    initDriveClient: initDriveClient,
    
}
