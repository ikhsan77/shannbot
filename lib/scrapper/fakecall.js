let fetch = require('node-fetch')
let axios = require('axios')
let fakeUa = require('fake-useragent')
let { JSDOM } = require('jsdom')

function post(number, formdata) {
    return fetch(`https://id.jagreward.com/member/verify-mobile-2/${number}/`, {
        method: 'POST',
        headers: {Accept: "*/*", "Accept-Language": "en-US,en;q=0.9", "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest"},
        body: new URLSearchParams(Object.entries(formdata))
    })
}

module.exports = {post}