/**
 * Used to create a featured log in the console.
 * @function
 * @param {String|Object} text - The item to be logged.
 * @example
 * logToConsole("Hello World");
 * // ==================
 * // Hello World
 * // ==================
 */
export const logToConsole = (text) => {
    console.log("==================");
    console.log(text);
    console.log("==================");
}