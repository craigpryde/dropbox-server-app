/* Depenedencies */
import fs from "fs"; 
import { uploadFile } from "../helpers/uploads";
import { Queue } from "../../../classes/Queue";

// Create a queue for files to be uploaded
const queue = new Queue();

/**
 * Handles uploading files to dropbox utilizing a queue.
 * @param {Array} filesToUpload - Array of files to be uploaded.
 * @returns {Promise} - Promise that handles the file uploads.
 * @example
 * const files = [
 *   {
 *     title: "TestFile",
 *     zipName: '2019-12-02__02-13__Test-File-1',
 *     timestamp: '2019-12-02__02-13',
 *     paths: {
 *       srcDir: './test',
 *       destDir: './backups/test',
 *       destFile: './backups/test/2019-12-02__02-13__Test-File-1.zip'
 *     }
 *   }
 * ]
 * uploadFiles(files);
 */
export const uploadFiles = (filesToUpload) => {
    return new Promise((resolve, reject) => {
        
        filesToUpload.forEach((currentFile, index) => {
            // Retrieve file info
            const file = {
                ...fs.statSync(currentFile.paths.destFile), 
                content: fs.createReadStream(filesToUpload[index].paths.destFile)
            }

            const destination = currentFile.directoryId;

            queue.addItem(() => uploadFile({dest: destination, title: `${currentFile.zipName}.zip`, file, contents: file.content}));
        
        });

        // Inititate the queue & handle success / failure
        queue.initQueue()
        .then(() => resolve())
        .catch((error) => reject(error));
    });
}