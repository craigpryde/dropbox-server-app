/**
 * Shell Class - Handles all shell commands.
 * @class
 */
class Shell {
    
    /**
     * Constructor for instance.
     * @constructor
     * @memberof Shell 
     */
    constructor() {}
    
    /**
     * Executes commands in series.
     * @method
     * @memberof Shell
     * @param {Array} cmds - Array of commands to fire.
     * @param {Function} cb - Callback to fire once complete or on error.
     */
    series(cmds, cb) {
        const execNext = function(){
            exports.exec(cmds.shift(), function(error){
                if (error) {
                    cb(error);
                } else {
                    if (cmds.length) {
                        execNext();
                    }
                    else {
                        cb(null);
                    }
                }
            });
        };
        execNext();
    }
}

module.exports.Shell = Shell;