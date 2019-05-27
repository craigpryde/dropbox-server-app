/* Dependencies */ 
import { drive } from "../auth/client";

/**
 * Deletes files within google drive Asynchronously.
 * @function
 * @private
 * @param {Array} files - Array of objects containing the path of each file in google drive.
 * @returns {Promsie} - Promise, Resolves if success and rejects if error.
 * @example
 * deleteFiles([ { path: "/test/test.txt"} ])
 * .then((response) => console.log("File deleted", response))
 * .catch((error) => console.log(error));
 */
export async function deleteFiles(files) {
    for(const file of files) {
        await drive.files.delete({
            'fileId': file.fileId
        })
        .then((response) => {
            return response;
        })
        .catch((error) => { 
            throw Error(error)
        });
    }
}