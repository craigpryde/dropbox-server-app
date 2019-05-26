/* Dependencies */
import moment from "moment";

/**
 * Returns a timestamp in format YYYY-MM
 * @function
 * @returns {String} - Timestamp
 * @example
 * createTimestamp() // 28-04-19(16:04:68)
 */
export const createTimestamp = () => {
    return moment().format("DD-MM-YY(HH:MM:SS)");
}