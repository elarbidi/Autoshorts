const fs = require("fs")
const fextra = require("fs-extra");  
const util = require("util");
const Jimp = require("jimp");
const checkProgress = require("./progress");
const modifyFram = require("./modifyFrame");
const exec = util.promisify(require("child_process").exec);
const log = require("../tools/printWithColors");



async function editor(dname,audio,filter){

    try{        
        log("DECODING START ###....","yellow");
        await exec(`ffmpeg -i ${dname + "/input/input.mp4"} -vf scale=1080:-1 ${dname + "/raws"}/%d.png`);
        log("DECODING FINISH SUCCESSFULLY [V]","green");
        log("RENDRING START ####...","yellow");
        const frames  = fs.readdirSync(dname + "/raws");
        var f = await Jimp.read(`${dname}/../assets/filters/${filter}.png`);
        var currentprogress = 0;
        for(i = 1 ; i < frames.length ; i++){
            checkProgress(i,frames.length,currentprogress);
            var frame = await Jimp.read(`${dname}/raws/${i}.png`);
            frame = await modifyFram(frame, f);
            await frame.writeAsync(`${dname + "/edited"}/${i}.png`);
        }
        log("RENDRING FINISH SUCCESSFULLY [V]","green");
        log("Encoding START #####..","yellow");
        await exec(`ffmpeg -framerate 45 -i ${dname + "/edited"}/%d.png -c:v libx264 -r 45 ${dname + "/noAUD.mp4"}`);
        await exec(`ffmpeg -i ${dname + "/noAUD.mp4"} -i ${dname}/../assets/audios/${audio}.mp3 -c copy -map 0:v -map 1:a -shortest ${dname + "/../final"}.mp4`);
        log("ENCODING FINISH SUCCESS FULLY [V]");
        log("CLEANING AND CLOSE.\nTHANK YOU FOR USING ME","bleu");
        await fextra.remove(dname);
    }catch(e){
        await fextra.remove(dname);
        console.error("error" + e);
    }
}

module.exports = editor