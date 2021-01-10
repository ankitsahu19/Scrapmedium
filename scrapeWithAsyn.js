const async = require('async');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

let urlPool = [], processedUrls = [];

let processedIndex = 0;

const writeUrlsToCsv = () => {
    const write = function () {
        if (index == processedIndex) return;
        fs.appendFile('scrape.csv', `${urlPool[index]}\n`, (error) => {
            if (error) console.log('File Error: ', error);
            else {
                index++;
                write();
            }
        });
    };
    let index = 0;
    write();
};

const getUrls = (url, callback) => {
    processedIndex++;
    processedUrls.push(url);
    request.get(url, (error, response, html) => {
        if (!error) {
            const $ = cheerio.load(html);

            $('a').each(function () {
                let href = $(this).attr('href');
                const pat = /^https?:\/\//i;
                if (!pat.test(href)) {
                    href = `https://www.medium.com${href}`;
                }
                if (processedUrls.indexOf(href) < 0) {
                    urlPool.push(href);
                }
            });
            scrape();
            callback();
        }
    })
};

const scrape = () => {
    const currentProcessing = urlPool.slice(processedIndex);
    if (currentProcessing.length <= 0) {

        writeUrlsToCsv();
    } else {
        async.eachLimit(currentProcessing, 5, getUrls);
        writeUrlsToCsv();
    }
};

const scrapeWithAsync = () => {
    urlPool.push("https://medium.com/");
    scrape();
};

module.exports = scrapeWithAsync;