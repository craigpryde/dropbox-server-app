/* Dependencies */
import dropbox from "../auth/client";

/**
 * Handles a small file upload, Using the filesUploadMethod method of DP SDK.
 * @param {Object} param0 - The config object.
 * @param {String} param0.dest - destination for the file.
 * @param {String} param0.title - The title of the file.
 * @param {String} param0.contents - The file contents to be uploaded.
 * @returns {Promise} - Promise that makes API call and handles response.
 * @example
 * const contents = fs.readFileSync('./test.txt');
 * uploadSmallFile({dest: '/test.txt', title: 'Test', contents });
 */
export const uploadSmallFile = ({dest, title, contents}) => {
    console.log(`Starting to upload ${title}`);
    return new Promise((resolve, reject) => {
        dropbox.filesUpload({path: dest, contents})
        .then(() => {
            console.log(`Finsihed Uploading ${title}`);
            resolve();
        })
        .catch((error) => {
            reject(error);
        })
    });
}

/**
 * Handles a large file upload, Using the filesUploadSessionStart method of DP SDK.
 * @param param0 - The config object.
 * @param {String} param0.dest - destination for the file.
 * @param {String} param0.title - The title of the file.
 * @param {String} param0.file - The file to be uploaded.
 * @returns {Promise} - Promise that makes API call and handles response.
 * @example 
 * const file = {
 *   ...fs.statSync(currentFile.paths.destFile), 
 *   content: fs.readFileSync(filesToUpload[index].paths.destFile)
 * }
 * uploadLargeFile({ dest: '/test.txt', title: 'Test', file, contents: file.contents });
 */
export const uploadLargeFile = ({dest, title, file}) => {
    console.log(`Starting to upload ${title}`);

    return new Promise((resolve, reject) => {
        
        // Set recomended 8MB Chunk Size
        const maxBlob = 8 * 1000 * 1000;
        const workItems = [];
        let offset = 0;

        // Convert file contents to parts
        while(offset < file.size) {
            const chunkSize = Math.min(maxBlob, file.size - offset);
            workItems.push(file.content.slice(offset, offset + chunkSize));
            offset += chunkSize;
        }

        // Define and upload the file parts
        const task = workItems.reduce((acc, blob, index, items) => {
            
            // Start the multipart file upload
            if(index == 0) {
                return acc.then(function() {
                    return dropbox.filesUploadSessionStart({ close: false, contents: blob})
                        .then((response) => response.session_id);
                })
            }

            // Append part to the upload session
            else if(index < items.length - 1) {
                return acc.then(function(sessionId) {
                    const cursor = { session_id: sessionId, offset: index * maxBlob};
                    return dropbox.filesUploadSessionAppendV2({ cursor, close: false, contents: blob})
                        .then(() => sessionId);
                });
            }

            // Transfer Last chunk of data and close session
            else {
                return acc.then(function(sessionId) {
                    var cursor = { session_id: sessionId, offset: file.size - blob.length };
                    const commit = { path: dest, mode: 'add', autorename: true, mute: false };
                    return dropbox.filesUploadSessionFinish({ cursor, commit, contents: blob });
                });
            }

        }, Promise.resolve());

        task.then(() => {
            console.log(`Finished Uploading ${title}`);
            resolve();
        });

        task.catch((error) => {
            reject(error);
        });
    });
}