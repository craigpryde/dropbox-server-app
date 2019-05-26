/* Depenedencies */
import key from "./private-key.json";

/**
 * App Configuration
 * Guide: https://github.com/craigpryde/server-backup-app
 */
export default {
    app: {
        srcDir: __dirname + "/test", // Source of directories to be backed up.
        destDir: __dirname + "/backups", // Local destination folder for zipped backups
        cleanUp: true // Should the app clean up the local backups
    },
    dropbox: {
        accessToken: "", // Dropbox API access token
        baseDir: "", // Dropbox base location for app
        maxUploadSize: 150 * 1024 * 1024, // Max upload size for Dropbox 150MB
        numToKeep: 5 // The number of items to keep within dropbox. Items beyond this are deleted after upload. (set to false to keep all)
    },
    google: {
        key, // Service JSON saved from google.
        baseDir: "", // Google Drive base for app
        numToKeep: 5 //  The number of items to keep within google drive. Items beyond this are deleted after upload. (set to false to keep all)
    },
    use: "dropbox | google" // Choose which service to use.
}