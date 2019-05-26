/* Dependencies */ 
import { drive } from "../auth/client";

/**
 * Uploads file to Google Drive.
 * @function
 * @private
 * @param {Object} param0 - Functyion params as an object.
 * @param {String} param0.title - The title of the file including extension.
 * @param {String} param0.dest - The destination directory for the file (drive folder id).
 * @param {String} param0.contents - The stream read of the file to be uploaded.
 * @returns {Promise} - Returns a promise that resolves with the response.
 * @example
 * uploadFile({
 *     dest: "1_Qh5Y1ZuyFFCCeeaSXhHJJrceWtUbnDG",
 *     title: "Test.zip",
 *     contents:  fs.createReadStream("./test.zip")
 * })
 * .then((response) => console.log(response))
 * .catch((error) => console.log(error));
 */
export const uploadFile = ({dest, title, contents}) => {
    return new Promise((resolve, reject) => {
        console.log(`Starting to upload ${title}`);

        const metaData = {
            name: title,
            parents: [dest]
        };

        const media = {
            mimeType: "application/zip",
            body: contents
        }
   
        drive.files.create({
            resource: metaData,
            media,
            fields: "id"
        }, (error, response) => {
            if(error) {
                reject(error);
                return;
            }
            console.log(`Finished Uploading ${title}`);
            resolve(response.data);            
        });
    })
}