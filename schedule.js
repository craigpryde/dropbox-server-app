/* Dependencies */ 
const Shell = require("./classes/Shell").Shell;

const shell = new Shell();

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