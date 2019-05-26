/* Dependences */
import { prepDriveUpload } from "./modules/prepDriveUpload";
import { uploadFiles } from "./modules/uploadFiles";
import { logToConsole } from "../../helpers/logToConsole";

/**
 * Google Drive Controller - Handles uploading files to google drive.
 * @function
 * @param {Array} filesToUpload - Array of file objects.
 * @returns {Promsie} - Returns a promise.
 * @example
 * controller({
 *     title: "TestFile",
 *     zipName: '2019-12-02__02-13__Test-File-1',
 *     timestamp: '2019-12-02__02-13',
 *     paths: {
 *       srcDir: './test',
 *       destDir: './backups/test',
 *       destFile: './backups/test/2019-12-02__02-13__Test-File-1.zip'
 *     }
 * })
 * .then(() => console.log("All Files Uploaded"))
 * .catch((error) => console.log(error));
 */
export const controller = (filesToUpload) => {
    return new Promise((resolve, reject) => {
        prepDriveUpload(filesToUpload)
        .then((files) => {
            logToConsole("Starting Upload");
            uploadFiles(files)
            .then(() => {
                resolve();
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
}