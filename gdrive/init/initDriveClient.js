import { google } from 'googleapis';
import { bimscJs } from 'bimsc-js-utils';
import { retrieveFilePath } from '../utils/retrieve-file-path.js';

// serviceAccountCredentials is a path to the google credential json file

export default async function initDriveClient() {

  const glSaCredsPath = process.env.GL_SA_CREDENTIALS_PATH

  if(!glSaCredsPath) {
    throw new Error('process.env.GL_SA_CREDENTIALS_PATH variable is missing')
  }

  const glSaCreds = bimscJs.files.readJsonFile(retrieveFilePath(glSaCredsPath))

  //Create a new client for google drive
  const client = await google.auth.getClient({
    credentials: glSaCreds ,
    scopes: 'https://www.googleapis.com/auth/drive.file',
  });

  const drive = google.drive({
    version: 'v3',
    auth: client,
  })

  return drive;

}