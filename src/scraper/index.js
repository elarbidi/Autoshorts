const puppeteer = require("puppeteer");

async function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 } 

async function scrape(url)
{
    var browser = await puppeteer.launch({headless : true})
    const page = await browser.newPage();
    await page.goto("https://tiktokdownload.online/");
    await delay(2000);
    await page.waitForSelector("#main_page_text");
    await page.type("#main_page_text",url);
    await page.click("#submit");
    await page.waitForSelector('[class="pure-button pure-button-primary is-center u-bl dl-button download_link without_watermark_direct"]')
    var url = await page.evaluate(()=>{
        return document.querySelector('[class="pure-button pure-button-primary is-center u-bl dl-button download_link without_watermark_direct"]').href
    })
    await browser.close();
    return url
}

module.exports = scrape