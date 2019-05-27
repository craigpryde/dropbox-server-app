
/* Dependencies */
import moment from "moment"; 
import { logToConsole } from "../../../helpers/logToConsole";
import { listAllDirectories } from "../helpers/directories";
import { deleteFiles } from "../helpers/delete";
import { Queue } from "../../../classes/Queue";

/* Config */ 
import config from "../../../config";

/**
 * Handles the supplied google drive directories and deletes files asynchronously.
 * @function
 * @private
 * @param {Array} directories - Array of directories within dropbox.
 * @returns {Boolean} - True to signal completion.
 * @example 
 * handleDirectories([
 * { 
 *     '.tag': 'folder',
 *     name: 'test1',
 *     path_lower: '/test1',
 *     path_display: '/test1',
 *     id: 'id:RmbEVhe5RHAAAAAAAAACEA'
 * }
 * ])
 * .then((response) => console.log("successfull"))
 * .catch((error) => console.log(error));
 */
async function handleDirectories(directories) {
    const numToKeep = config.dropbox.numToKeep;
    const queue = new Queue();

    for(const currentDirectory of directories) {
        await listAllDirectories(currentDirectory.id)
        .then((files) => {

            if(files.length < numToKeep) return;
    
            const sortedFiles = files.sort((item1, item2) => new moment(item1.createdTime) - new moment(item2.createdTime)).reverse();
            const itemsToRemove = sortedFiles.slice(numToKeep, sortedFiles.length);
            
            queue.addItem(() => deleteFiles(itemsToRemove.map((item) => { return { fileId: item.id}})));
        });
    }

    await queue.initQueue();
    return true; 
}

/**
 * Removes Legacy files from google drive based on number supplied within config.
 * @function
 * @returns {Promise} - Resolves if successfull, rejects if failure.
 * @example
 * removeLegacyFiles()
 * .then(() => console.log("Files Removed"))
 * .catch((error) => console.log(error));
 */
export const removeLegacyFiles = () => {
    return new Promise((resolve, reject) => {

        listAllDirectories(config.google.baseDir)
        .then((dirListing) => {

            const directories = dirListing.filter((currentDirectory) => currentDirectory.mimeType === "application/vnd.google-apps.folder");

            if(directories.length < 1) {
                resolve();
                return;
            }

            handleDirectories(directories)
            .then(() => { 
                logToConsole("Legacy Files Have Been Cleared.");
                resolve()
            })
            .catch((error) => reject(error));
        }); 
    })
}