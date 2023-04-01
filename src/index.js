const setup = require("./setup/index");
const log = require("./tools/printWithColors");
const downloader = require("./videoDownloader/index");
const editor = require("./editing/index");
const tiktokUrls = require("./scraper/getUrls");
const process = require('process');



(async()=>{
    const url = process.argv[2];
    log(`GET THE TIKTOK FROM THE PROFILE`,"yellow");
    const urls = await tiktokUrls(url);
    for(i = 0;i < urls.length ; i++){
       // const rand = Math.floor(Math.random() * 10)
        log("INIT THE SETUP #......", "yellow");
        const dname = await setup(__dirname);
        log("SETUP COMPLETE [V]", "green");
        log("DOWLOAD THE BASE VIDEO ##........","yellow");
        log(`PROCESS ${urls[i]}`,"yellow");
        await downloader(urls[i],dname);
        log("VIDEO IS DOWLOADED SUCCESSFULLY [V]", "green");
        await editor(dname,2,1,i);
    }
})()