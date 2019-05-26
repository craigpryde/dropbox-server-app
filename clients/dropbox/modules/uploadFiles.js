/* Depenedencies */
import fs from "fs"; 
import { uploadLargeFile, uploadSmallFile } from "../helpers/uploads";
import { Queue } from "../../../classes/Queue";

import config from "../../../config";

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
        
        // Split file sizes to allow small upload priority.
        const smallFiles = [];
        const bigFiles = [];


        filesToUpload.forEach((currentFile, index) => {
            
            // Retrieve file info
            const file = {
                ...fs.statSync(currentFile.paths.destFile), 
                content: fs.readFileSync(filesToUpload[index].paths.destFile)
            }

            // Location for file within drop box
            const destination = `/${currentFile.title}/${currentFile.zipName}`;

            // Handle files smaller than 150mb
            if(file.size < config.dropbox.maxUploadSize) {
                smallFiles.push(() => uploadSmallFile({dest: destination, title: currentFile.title, contents: file.content }));
            }
            else {
                bigFiles.push(() => uploadLargeFile({dest: destination, title: currentFile.title, file, contents: file.contents}));
            }

        });
        
        // Add items to a queue
        queue.addItems([...smallFiles, ...bigFiles]);

        // Inititate the queue & handle success / failure
        queue.initQueue()
        .then(() => resolve())
        .catch((error) => reject(error));
    });
}