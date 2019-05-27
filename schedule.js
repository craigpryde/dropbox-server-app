/* Dependencies */ 
const shell = require("shelljs");

// Execute build command using the npm script. - This allows us to run with es6 imports.
shell.exec("npm run build");