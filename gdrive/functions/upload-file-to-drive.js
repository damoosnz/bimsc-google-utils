import initDriveClient from "../init/initDriveClient.js";
import { toReadableStream } from "../utils/convert-file-contents-to-stream.js";

/**
 * Uploads a new file to Google Drive in the specified folder.
 *
 * @async
 * @param {Object} params - The upload settings.
 * @param {string} params.folderId - The ID of the folder to upload to. (Required)
 * @param {string} params.mimeType - The MIME type of the file. (Required)
 * @param {string} params.fileName - The name of the file. (Required)
 * @param {Buffer|string} params.fileContents - The contents of the file. (Required)
 * @param {string[]} [params.fields] - Array of metadata fields to return (optional).
 * @returns {Promise<Object>} The uploaded file resource.
 * @throws {Error} If any required setting is missing.
 */
export default async function uploadFileToDrive({ folderId, mimeType, fileName, fileContents, fields = [] }) {
  
  if (!folderId) throw new Error('folderId is required');
  if (!fileContents) throw new Error('fileContents is required');
  if (!mimeType) throw new Error('mimeType is required');
  if (!fileName) throw new Error('fileName is required');
  if (!Array.isArray(fields)) throw new Error('fields must be an array of strings');

  const drive = await initDriveClient();

  const mediaBody = toReadableStream(fileContents);

  const fileMetadata = {
    name: fileName,
    mimeType: mimeType,
    parents: [folderId]
  };

  const media = {
    mimeType: mimeType,
    body: mediaBody
  };

  const params = {
    requestBody: fileMetadata,
    media: media,
    supportsAllDrives: true,
    fields: fields.length > 0 ? fields.join(', ') : 'id, name, webViewLink',
  };

  const res = await drive.files.create(params);

  return res.data;
}