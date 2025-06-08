import initDriveClient from "../init/initDriveClient.js";
import { convertFileContentsToStream } from "../utils/convert-file-contents-to-stream.js";

export default async function uploadFileToDrive(settings = { folderId, mimeType, fileName, fileContents }) {

  if (!folderId) throw new Error('folderId is required');
  if (!fileContents) throw new Error('fileContents is required');
  if (!mimeType) throw new Error('mimeType is required');
  if (!fileName) throw new Error('fileName is required');

  const drive = await initDriveClient();

  let mediaBody;
  if (typeof settings.fileContents === 'string') {
    mediaBody = convertFileContentsToStream(settings.fileContents);
  } else {
    mediaBody = settings.fileContents;
  }

  const fileMetadata = {
    name: settings.fileName,
    mimeType: settings.mimeType,
    parents: [settings.folderId]
  };

  const fileContents = {
    mimeType: settings.mimeType,
    body: mediaBody
  }

  const res = await drive.files.create({
    requestBody: fileMetadata,
    media: fileContents,
    supportsAllDrives: true
  });

  return res.data;
}