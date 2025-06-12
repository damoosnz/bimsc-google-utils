import initDriveClient from "../init/initDriveClient.js";
import { toReadableStream } from "../utils/convert-file-contents-to-stream.js";

/**
 * Uploads a new file to Google Drive in the specified folder.
 *
 * @async
 * @param {Object} settings - The upload settings.
 * @param {string} settings.folderId - The ID of the folder to upload to. (Required)
 * @param {string} settings.mimeType - The MIME type of the file. (Required)
 * @param {string} settings.fileName - The name of the file. (Required)
 * @param {Buffer|string} settings.fileContents - The contents of the file. (Required)
 * @returns {Promise<Object>} The uploaded file resource.
 * @throws {Error} If any required setting is missing.
 */

export default async function uploadFileToDrive(settings = { folderId, mimeType, fileName, fileContents }) {

  if (!settings.folderId) throw new Error('folderId is required');
  if (!settings.fileContents) throw new Error('fileContents is required');
  if (!settings.mimeType) throw new Error('mimeType is required');
  if (!settings.fileName) throw new Error('fileName is required');

  const drive = await initDriveClient();

  const mediaBody = toReadableStream(settings.fileContents)

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
    supportsAllDrives: true,
    fields: 'id, name, webViewLink',
  });

  return res.data;
}