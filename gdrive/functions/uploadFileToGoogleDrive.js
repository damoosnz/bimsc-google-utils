import initDriveClient from "../init/initDriveClient.js";

export default async function uploadFileToGoogleDrive(settings = {folderId, mimeType, fileName, fileContents}){
  
  const drive = await initDriveClient();

  const fileMetadata = {
    name: settings.fileName,
    mimeType: settings.mimeType,
    parents: [settings.folderId]
  };

  const fileContents = {
    mimeType: settings.mimeType,
    body: settings.fileContents
  }

  const file = await drive.files.create({
    requestBody: fileMetadata,
    media: fileContents,
    supportsAllDrives: true
  });

  return file;
}