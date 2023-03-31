const fs = require("fs");
const path = require("path");


async function setup(dname){
    const tmpFoulder = path.resolve(dname,"../tmp");
    fs.mkdirSync(tmpFoulder);
    fs.mkdirSync(tmpFoulder + "/raws");
    fs.mkdirSync(tmpFoulder + "/edited");
    fs.mkdirSync(tmpFoulder + "/input");
    return tmpFoulder;
}

module.exports = setup;