/* Dependencies */ 
import fs from "fs";
import archiver from "archiver";
import { createTimestamp } from "./createTimestamp";

/**
 * Takes a source path and returns an array of top level directories.
 * @function
 * @param {string} sourcePath - The source path.
 * @returns {Array} - Array of top level directories.
 * @example
 * console.log(listAllDirectories("./")); // ["Test 1", "Test 2"] 
 */
export const listAllDirectories = (sourcePath) => {
    // return all top level directories within source path/
    return fs.readdirSync(sourcePath).filter((currentItem) => fs.statSync(`${sourcePath}/${currentItem}`).isDirectory());
}

/**
 * Takes array of directories and returns an array of formatted objects.
 * @function
 * @param {Array} arrayDir - Array of directory names as strings.
 * @returns {Array} - Array of objects.
 * @example 
 * formatDirectories(retrieveFolderListing(__dirname));
 */
export const formatDirectories = ({sourceDir, destDir, arrayDir}) => {
    const timestamp = createTimestamp();
    return arrayDir.map((currentItem) => {
        return {
            title: currentItem,
            zipName: `${timestamp}__${currentItem}`,
            timestamp,
            paths: {
                srcDir: `${sourceDir}/${currentItem}`,
                destDir: `${destDir}/${currentItem}`,
                destFile: `${destDir}/${currentItem}/${timestamp}__${currentItem}.zip`
            }
        }
    });
}

/**
 * Creates local directory if not present.
 * @function
 * @param {String} desiredPath - The desired path for the folder.
 * @example
 * createDirectory("./test");
 */
export const createDirectory = (desiredPath) => {
    if(!fs.existsSync(desiredPath)) {
        fs.mkdirSync(desiredPath);
    }
}

/**
 * Archives directory and outputs to desired directory.
 * @function
 * @param {String} src - source directory path. 
 * @param {String} dest - The destination path for the zipped folder.
 * @example
 * compressDirectory({ src: "./test", title: "Test", dest: "./backup/test"});
 */
export const compressDirectory = ({src, title, dest}) => {
    return new Promise((resolve, reject) => {
        // Create file stream to archive the data to
        const output = fs.createWriteStream(`${dest}/${title}.zip`);
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        // Handle the archiver events
        // On close log the total size for the archive
        output.on("close", () => {
            console.log(`${title} Archive Complete: ${archive.pointer()} total bytes`);
            resolve();
        });

        // Handle error gracefully
        archive.on("error", (error) => {
            reject(error);
        });

        // Set the output stream for the archive.
        archive.pipe(output);

        // Loop through each stream and add the directory to the archive.
        archive.directory(src, false);

        // Finish archiving
        archive.finalize();
    });
}