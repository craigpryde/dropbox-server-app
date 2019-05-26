/**
 * Queue - Used to form a queue of items and execute one at a time.
 * @class
 * @example
 * const queue = new Queue();
 * 
 * queue.add(()=> {
 *     return new Promise((resolve) => {
 *         console.log("Hello World");
 *         resolve(); 
 *     });
 * });
 * 
 * queue.initQueue()
 * .then(() => console.log("Queue Executed"));
 */
export class Queue {
    /**
     * Initiates the queue instance
     * @constructor
     * @memberof Queue
     */
    constructor() {
        this.queue = [];
    }

    /**
     * Adds a single item to the queue.
     * @method
     * @memberof Queue
     * @param {Function} item - The function to be executed within the queue. 
     */
    addItem(item) {
        this.queue.push(item);
    }

    /**
     * Adds multiple items to the queue.
     * @method
     * @memberof Queue
     * @param {Array} items - Array of functions to be added to the queue.
     */
    addItems(items) {
        this.queue.push(...items);
    }

    /**
     * Async function used to execute all items in the queue.
     * @method 
     * @memberof Queue
     */
    async initQueue() { 
        for(const item of this.queue) {
            await item()
            .catch((error) => console.log(error));
        }
    }
}