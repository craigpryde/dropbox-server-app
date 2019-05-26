/* Dependencies */ 
import rimraf from "rimraf";

/**
 * Cleans up files by removing the directory.
 * @function
 * @param {String} directory - The directory to be removed.
 * @example
 * cleanUp("./backups");
 */
export const cleanUp = (directory) => {
    rimraf(directory, (error) => {
        if(error) {
           console.log(error);
           return false; 
        }
        console.log("Clean Up Complete");
    });
}