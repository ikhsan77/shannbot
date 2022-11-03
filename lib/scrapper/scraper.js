const axios = require('axios')
const cheerio = require('cheerio')

function pinterest(querry) {
    return new Promise(async (resolve, reject) => {
        axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
            headers: {
                "cookie": "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
            }
        })
        
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const ress = [];
            const hasil = {
                status: true,
                message: 'success',
                result: []
            }

            $('div > a').get().map(b => {
                const link = $(b).find('img').attr('src')
                ress.push(link)
            });
            ress.forEach(v => {
                if (v == undefined) return
                hasil.result.push(v.replace(/236/g, '736'))
            })
            hasil.result.shift();

            if (!hasil.result[0]) {
                hasil.status = false
                hasil.message = 'image not found'
                hasil.result = {}
            }
            
            resolve(hasil)
        })
        .catch((err) => {
            let hasil = {
                status: false,
                message: 'failed to get data',
                result: {}
            }
        })
    })
}

function wallpaper(title, page = '1') {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = {
                status: true,
                message: 'success',
                result: []
            }

            $('div.grid-item').each(function (a, b) {
                hasil.result.push({
                    title: $(b).find('div.info > a > h3').text(),
                    image: $(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src')
                })
            })

            if (!hasil.result[0]) {
                hasil.status = false
                hasil.message = 'image not found'
            }

            resolve(hasil)
        })
        .catch((err) => {
            let hasil = {
                status: false,
                message: 'failed to get data',
                result: {}
            }
        })
    })
}

function wikimedia(title) {
    return new Promise((resolve, reject) => {
        axios.get(`https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`)
            .then((res) => {
                let $ = cheerio.load(res.data)
                let hasil = {
                    status: true,
                    message: 'success',
                    result: []
                }
                $('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
                    hasil.result.push({
                        title: $(b).find('img').attr('alt'),
                        source: $(b).attr('href'),
                        image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
                    })
                })

                if (!hasil.result[0]) {
                    hasil.status = false
                    hasil.message = 'data not found'
                    hasil.result = {}
                }

                resolve(hasil)
            })
            .catch ((err) => {
                let hasil = {
                    status: false,
                    message: 'failed to get data',
                    result: {}
                }
                
                resolve(hasil)
            })
    })
}

function quotesAnime() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 184)
        axios.get('https://otakotaku.com/quote/feed/' + page)
            .then(({ data }) => {
            const $ = cheerio.load(data)
            const hasil = {
                status: true,
                message: 'success',
                result: []
            }

            $('div.kotodama-list').each(function (l, h) {
                hasil.result.push({
                    karakter: $(h).find('div.char-name').text().trim(),
                    anime: $(h).find('div.anime-title').text().trim(),
                    episode: $(h).find('div.meta').text(),
                    quotes: $(h).find('div.quote').text().trim()
                })
            })

            if (!hasil.result[0]) {
                hasil.status = false
                hasil.message = 'data not found'
                hasil.result = {}
            }
            
            resolve(hasil)
        }).catch((err) => {
            let hasil = {
                status: false,
                message: 'failed to get data',
                result: {}
            }

            resolve(hasil)
        })
    })
}

function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text=' + teks)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = {
                status: true,
                message: 'success',
                result: []
            }

            $('table > tbody > tr').each(function (a, b) {
                hasil.result.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })
            })

            if (!hasil.result[0]) {
                hasil.status = false
                hasil.message = 'failed'
                hasil.result = {}
            }

            resolve(hasil)
        }).catch((err) => {
            let hasil = {
                status: false,
                message: 'failed to get data',
                result: {}
            }
        })
    })
}

module.exports = { pinterest, wallpaper, wikimedia, quotesAnime, styletext }
