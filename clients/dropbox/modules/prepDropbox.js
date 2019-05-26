/* Dependencies */ 
import { createDirectories, listAllDirectories } from "../helpers/directories";

/**
 * Used to prepare dropbox for the file uploads. Scans directories and creates required folders.
 * @function
 * @param {Array} filesToUpload - Array of file objexts to be uploaded.
 * @returns {Promise} - Promise with resolve/reject methods.
 * @example
 * prepDropBox([
 *  {
 *      title: "test",
 *      zipName: "28-04-19(16:04:68)__test",
 *      timestamp: "28-04-19(16:04:68)",
 *      paths: {
 *          srcDir: `./apps/test`,
 *          destDir: "./backups/test/",
 *          destFile: "./backups/test/28-04-19(16:04:68)__test.zip"
 *      }
 *  }
 * ]);
 */
export const prepDropBox = (filesToUpload) => {
    return new Promise((resolve, reject) => {
        const foldersToCreate = [];
        
        listAllDirectories()
        .then((folders) => {
        
            // Check if the folders exist within dropbox, If not add it to the list to be created.
            filesToUpload.forEach((currentFileObj) => {
                const isFound = folders.filter((currentFolder) => currentFolder.name  === currentFileObj.title);

                if(isFound.length === 0) {
                    foldersToCreate.push(currentFileObj);
                }
            });
            
            createDirectories(foldersToCreate.map((currentFolder) => '/' + currentFolder.title))
            .then(() => { 
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    })
}