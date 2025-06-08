import { convertFileContentsToStream } from "../utils/convert-file-contents-to-stream.js";
import initDriveClient from "../init/initDriveClient.js";

export default async function updateFileInDrive(settings = { fileId, mimeType, fileContents }) {

    if (!settings.fileId) throw new Error('fileId is required');
    if (!settings.fileContents) throw new Error('fileContents is required');
    if (!settings.mimeType) throw new Error('mimeType is required');

    const drive = await initDriveClient();

    // If fileContents is a string, convert it to a stream
    let mediaBody;
    if (typeof settings.fileContents === 'string') {
        mediaBody = convertFileContentsToStream(settings.fileContents);
    } else {
        mediaBody = settings.fileContents;
    }

    const res = await drive.files.update({
        fileId: settings.fileId,
        media: {
            mimeType: settings.mimeType,
            body: mediaBody,
        },
    });

    return res.data;

}