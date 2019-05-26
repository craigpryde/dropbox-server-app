/* Dependencies */ 
import { drive } from "../auth/client";

/* Config */
import config from "../../../config";

/**
 * Lists all files within a drive directory. 
 * @function
 * @param {String} baseDir - Optional base DIR for Drive. (Default *)
 * @returns {Promise} - Returns a promise.
 * @example
 * listAllDirectories()
 * .then((files) => console.log(files))
 * .catch(error) => console.log(error);
 */
export const listAllDirectories = (baseDir) => {
    return new Promise((resolve, reject) => {
        const params = {
            pageSize: 10,
            q: `${(baseDir) ? "trashed = false and '" + baseDir + "' in parents" : 'trashed = false'}`
        };
    
        drive.files.list({
            ...params
        }, (error, response) => {
            if(error) {
               reject(error);
               return; 
            }

            resolve(response.data.files);
        });
    });
}

/**
 * Creates Directory within Google Drive.
 * @function
 * @param {Object} param0 - Options for the function passed as object.
 * @param {String} param0.title - Title of directory to be created.
 * @returns {Promise} - Returns a promise.
 * @example
 * createDirectory("Hello")
 * .then((directoryID) => console.log(directoryID))
 * .catch((error) => console.log(error));
 */
export const createDirectory = ({title}) => {
    return new Promise((resolve, reject) => {
    
        const fileMeta = {
            name: title,
            parents: [config.google.baseDir],
            mimeType: "application/vnd.google-apps.folder"
        }
        
        drive.files.create({
            resource: fileMeta,
            fields: 'id',
        }, (error, response) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(response.data.id);
        });
    });
}