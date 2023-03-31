const timing = require("./getTiming");

function log(str, color) {
    switch (color) {
        case "green":
            console.log(`\x1b[32m ${timing()} => ${str} \x1b[0m`);
            return
        case "red":
            console.error(`\x1b[31m ${timing()} => ${str} \x1b[0m`);
            return
        case "yellow":
            console.log(`\x1b[33m ${timing()} => ${str} \x1b[0m`);
            return
        case "bleu":
            console.log(`\x1b[34m ${timing()} => ${str} \x1b[0m`);
            return
    }
}

module.exports = log;