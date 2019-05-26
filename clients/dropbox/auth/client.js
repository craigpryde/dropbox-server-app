/* Dependencies */ 
import fetch from "isomorphic-fetch";
import { Dropbox } from "dropbox";

import config from "../../../config";

/**
 * Create a new dropbox instance
 * @returns {Object} - the created dropbox instance.
 */
const dbx = () => {
    return new Dropbox({
        accessToken: config.dropbox.accessToken,
        fetch: fetch
    });
}

export default dbx();