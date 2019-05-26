/* Dependencies */ 
import cron from "node-cron";
import { Shell } from "./classes/Shell";

const shell = new Shell();

/**
 * Schedule task to fire every day at midnight.
 */
cron.schedule("0 0 * * *", function() {
    // Set commands to run
    const commands = [
        "npm run build"
    ];

    // Run the shell commands
    shell.series(commands, function(error) {
        if(error) {
            console.log(error);
            return;
        }
        console.log("Schedule set successfully!");
    });
})