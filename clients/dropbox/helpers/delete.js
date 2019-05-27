/* Dependencies */ 
import dropbox from "../auth/client";

/**
 * Deletes files within dropbox Asynchronously.
 * @function
 * @private
 * @param {Array} files - Array of objects containing the path of each file in dropbox.
 * @returns {Promsie} - Promise, Resolves if success and rejects if error.
 * @example
 * deleteFiles([ { path: "/test/test.txt"} ])
 * .then((response) => console.log("Async Job ID: ", response))
 * .catch((error) => console.log(error));
 */
export const deleteFiles = (files) => {
    return new Promise((resolve, reject) => {
        dropbox.filesDeleteBatch({entries: files})
        .then((response) => {
            resolve(response.entries);
        })
        .catch((error) => reject(error))
    });
}