const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')
const scrape = require("../scraper/index");

async function downloader (tikURL,dname) {
  const url = await scrape(tikURL);
  const path = dname + '/input/input.mp4';
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

module.exports = downloader