/* Dependencies */ 
import dropbox from "../auth/client";

/** 
 * Retrieves Directory Listing In Dropbox.
 * @function
 * @example
 * listAllDirectories()
 * .then((listing) => console.log(listing))
 * .catch((error) => console.log(error));
 */
export const listAllDirectories = () => {
    return new Promise((resolve, reject) => {
        dropbox.filesListFolder({path: ''})
        .then(response => {
            resolve(response.entries);
        })
        .catch(error => reject(error));
    })
}

/**
 * Creates Directories In Dropbox.
 * @function
 * @param {Array} foldersToCreate - Array of directory strings to be created.
 * @example
 * createDirectories(["/test", "/test2"]);
 */
export const createDirectories = (foldersToCreate) => {
    return new Promise((resolve, reject) => {
        dropbox.filesCreateFolderBatch({paths: foldersToCreate})
        .then(() => {
            resolve();
        })
        .catch((error) => reject(error));
    });
}