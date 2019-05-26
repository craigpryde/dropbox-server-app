/* Dependencies */
import { google } from "googleapis";

/* Config */
import config from "../../../config";
const key = config.google.key;

// Create and export default client
export const client = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/drive"],
    null
);

// Create & export drive client
export const drive = google.drive({
    version: 'v3',
    auth: client
});