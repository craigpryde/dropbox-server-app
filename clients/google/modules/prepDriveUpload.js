/* Dependencies */ 
import { createDirectory, listAllDirectories } from "../helpers/directories";

/* Config */
import config from "../../../config";

/**
 * Creates a directory within drive and returns the folder id.
 * @function
 * @async
 * @private
 * @param {Object} param0 - Function parameters as an object.
 * @param {Array} param0.foldersToCreate - Array of items to be created.
 * @param {Function} param0.callback - Function to fire once all folders are created.
 * @example
 * createDirectories({
 *    foldersToCreate: [{
 *    title: "test",
 *    zipName: "28-04-19(16:04:68)__test",
 *    timestamp: "28-04-19(16:04:68)",
 *    paths: {
 *        srcDir: `./apps/test`,
 *        destDir: "./backups/test/",
 *        destFile: "./backups/test/28-04-19(16:04:68)__test.zip"
 *    }
 *    }],
 *    callback: () => {
 *        console.log("Folder Created");
 *    } 
 * }) 
 */
async function createDirectories({foldersToCreate, callback}) {
    for(const item of foldersToCreate) {
        await createDirectory({ title: item.title })
        .then((id) => item.directoryId = id)
    }
    callback();
}

/**
 * Used to prepare drive for the file uploads. Scans directories and creates required folders.
 * @function
 * @private
 * @param {Array} filesToUpload - Array of file objects to be uploaded.
 * @returns {Promise} - Promise with resolve/reject methods.
 * @example
 * prepDriveUpload([
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
 * ])
 * .then((files) => console.log(files)) // Files ready for upload.
 * .catch((error) => console.log(error));
 */
export const prepDriveUpload = (filesToUpload) => {
    return new Promise((resolve, reject) => {
        
        const foldersToCreate = [];

        // Retreves a diorectory listing from drive.
        listAllDirectories(config.google.baseDir)
        .then((directories) => {
            
            const foldersToCreate = [];

            // Determin which files dont have a directory within drive.
            filesToUpload.forEach((currentFile) => {
                const isFound = directories.filter((currentDirectory) => currentDirectory.name === currentFile.title);
                if(isFound.length < 1) { 
                    foldersToCreate.push(currentFile)
                }
                else {
                    currentFile.directoryId = isFound[0].id
                };
            });

            // Create the missing directories
            if(foldersToCreate.length < 0) {
                resolve(filesToUpload);
            }
            else {
                createDirectories({ 
                    foldersToCreate, 
                    callback: () => { 
                        resolve(filesToUpload);
                    }
                });
            }
        });
    })
}