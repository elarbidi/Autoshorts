const setup = require("./setup/index");
const log = require("./tools/printWithColors");
const downloader = require("./videoDownloader/index");
const editor = require("./editing/index");
var test = "https://www.tiktok.com/@nada_nada877/video/7213428274129538310";
const process = require('process');



(async()=>{
    const url = process.argv[2];
    log("INIT THE SETUP #......", "yellow");
    const dname = await setup(__dirname);
    log("SETUP COMPLETE [V]", "green");
    log("DOWLOAD THE BASE VIDEO ##........","yellow");
    await downloader(url,dname);
    log("VIDEO IS DOWLOADED SUCCESSFULLY [V]", "green");
    await editor(dname,1,1);
})()