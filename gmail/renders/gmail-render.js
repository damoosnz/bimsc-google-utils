import sendEmail from "../functions/send-email.js";
import getEmail from "../functions/get-email.js";
import listEmails from "../functions/list-emails.js";
import initGmailClient from "../init/init-gmail-client.js";

export const gmail = {
    sendEmail,
    getEmail,
    listEmails,
    initGmailClient,
};