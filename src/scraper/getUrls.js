const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const autoScroll = require("./scrollDown");

async function tiktokUrls(url){
    const browser = await puppeteer.launch({headless : true});
    const page = await browser.newPage();
    await page.goto(url)
    await autoScroll(page);
    var urls = await page.evaluate(()=>{
        const res = []
        var t = document.querySelectorAll('[role="button"]  [tabindex="-1"]')
        t.forEach((k)=>{res.push(k.href)});
        return res

    })
    await browser.close();
    return (urls);
}

module.exports = tiktokUrls