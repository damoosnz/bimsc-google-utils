import { google } from 'googleapis';
import { bimscJs } from 'bimsc-js-utils';
import path from 'path'

export default async function initDriveClient() {

  const glSaCredsPath = process.env.GL_SA_CREDENTIALS_PATH;
  const glSaImpersonateUser = process.env.GL_SA_IMPERSONATE_USER;

  if (!glSaCredsPath) {
    throw new Error('process.env.GL_SA_CREDENTIALS_PATH variable is missing');
  }

  if (!glSaImpersonateUser) {
    throw new Error('process.env.GL_SA_IMPERSONATE_USER variable is missing');
  }

  const resolvedglSaCredsPath = path.resolve(glSaCredsPath);
  const glSaCreds = bimscJs.files.readJsonFile(resolvedglSaCredsPath);

  // ✅ Create JWT client instead of getClient()
  const jwtClient = new google.auth.JWT({
    email: glSaCreds.client_email,
    key: glSaCreds.private_key,
    scopes: ['https://www.googleapis.com/auth/drive'],
    subject: glSaImpersonateUser,
  });

  await jwtClient.authorize(); // ⬅️ Optional but good for early failure

  const drive = google.drive({
    version: 'v3',
    auth: jwtClient,
  });

  return drive;
}