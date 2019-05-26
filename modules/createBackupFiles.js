/* Dependencies */
import { compressDirectory, listAllDirectories, formatDirectories, createDirectory } from "../helpers/directories";

/**
 * Creates a backup of all diorectories within a desired location.
 * @function
 * @param {String} param0.sourceDir - The source directory path.
 * @param {String} param0.destDir - The destination directory path.
 * @returns {Promise} - Promise with resolve/reject methods. 
 * @example
 * createBackupFiles({ sourceDir: "./apps", destDir: "./backups" });
 */
export const createBackupFiles = ({sourceDir, destDir}) => {
    return new Promise((resolve, reject) => {
        
        const directories = formatDirectories({sourceDir, destDir, arrayDir: listAllDirectories(sourceDir)});

        if(directories.length < 1) {
          reject("No Directories Found");
          return false; 
        }
      
        // Create backups folder
        createDirectory(destDir);
          
        let count = 0;
        
        // Loop through each directiory and backup the contents.
        directories.forEach((currentItem) => {

            createDirectory(`${currentItem.paths.destDir}`);
                        
            compressDirectory({ src: currentItem.paths.srcDir, title: `${currentItem.zipName}`, dest: `${currentItem.paths.destDir}` })
            .then(() => {
                count++;
                if(count === directories.length) {
                    resolve(directories);
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    })
}