import { convertFileContentsToStream } from "../utils/convert-file-contents-to-stream.js";
import initDriveClient from "../init/initDriveClient.js";

export default async function updateFileInDrive(settings = { fileId, mimeType, fileContents }) {

    if (!fileId) throw new Error('fileId is required');
    if (!fileContents) throw new Error('fileContents is required');
    if (!mimeType) throw new Error('mimeType is required');

    const drive = await initDriveClient();

    // If fileContents is a string, convert it to a stream
    let mediaBody;
    if (typeof fileContents === 'string') {
        mediaBody = convertFileContentsToStream(fileContents);
    } else {
        mediaBody = fileContents;
    }

    const res = await drive.files.update({
        fileId,
        media: {
            mimeType,
            body: mediaBody,
        },
    });

    return res.data;

}