/* Dependences */
import { prepDropBox } from "./modules/prepDropbox";
import { uploadFiles } from "./modules/uploadFiles";
import { removeLegacyFiles } from "./modules/removeLegacyFiles";
import { logToConsole } from "../../helpers/logToConsole";

/* Config */
import config from "../../config";

/**
 * Dropbox Controller - Handles uploading files to dropbox.
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
        prepDropBox(filesToUpload)   
        .then(() => {
            logToConsole("Starting Upload");
            uploadFiles(filesToUpload)
            .then(() => {
                if(config.dropbox.numToKeep) {
                    removeLegacyFiles()
                    .then(() => { 
                        resolve()
                    });
                }
                else {
                    resolve();
                }
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    }); 
}