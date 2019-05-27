/* Dependencies */
import { createArchives } from "./modules/createArchives";
import { cleanUp } from "./modules/cleanUp";
import { logToConsole } from "./helpers/logToConsole";

/* Controllers */
import { controller as dropboxController } from "./clients/dropbox/controller";
import { controller as googleController } from "./clients/google/controller";

/* config */
import config from "./config";

/**
 * Initiates the application and chooses desired controller.
 * @function
 * @private
 */
const init = () => {
    logToConsole("Starting Archive");

    createArchives({ 
        sourceDir: config.app.srcDir, 
        destDir: config.app.destDir 
    })
    .then((filesToUpload) => {
        switch (config.use) {
            
            case "dropbox":
                dropboxController(filesToUpload)
                .then(() => finish());
                break;

            case "google":
                googleController(filesToUpload)
                .then(() => finish());
                break;
        
            default:
                console.log("****** Error: No Controller Specified In Config (prop: use). ******")
                break;
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

/**
 * Fires once all the upoads are complete.
 * @function
 * @private
 */
const finish = () => {
    logToConsole("All Files Uploaded");
                
    // remove app dest folder if required
    if(config.app.cleanUp) {
        cleanUp(config.app.destDir);
    }
}

init();

// TODO
// Add check for file counts
// Delete files > 5 that are old. Only keeep latest 5