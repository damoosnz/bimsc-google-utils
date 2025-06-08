import findFileIdInDrive from "../functions/find-file-id-in-drive.js"
import updateFileInDrive from "../functions/update-file-in-drive.js"
import uploadFileToDrive from "../functions/upload-file-to-drive"


export const drive = {
    findFileId: findFileIdInDrive,
    uploadFile: uploadFileToDrive,
    updateFile: updateFileInDrive,
}