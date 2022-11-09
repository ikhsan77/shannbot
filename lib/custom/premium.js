const fs = require("fs");
const toMs = require("ms");

const addPremiumUser = (userId, expired, limitYt, limitSp) => {
    const prem = require('../../database/premium.json')
    const cekUser = prem.find((user) => user.id == userId)

    if (cekUser) {
        cekUser.limitYt = cekUser.limitYt + limitYt
        cekUser.limitSp = cekUser.limitSp + limitSp
        cekUser.expired = cekUser.expired + toMs(expired);
    } else {
        const obj = {id: userId, expired: Date.now() + toMs(expired), limitYt, limitSp};
        prem.push(obj);
    }
    
    fs.writeFileSync("./database/premium.json", JSON.stringify(prem));
}

const editLimitUser = (userId, typelimit) => {
    const prem = require('../../database/premium.json')
    const cekUser = prem.find((user) => user.id == userId)
    let hasil

    if (!cekUser) {
        hasil = false
    } else if (cekUser) {
        if (typelimit == 'yt') {
            if (cekUser.limitYt == 0) {
                hasil = false
            } else {
                cekUser.limitYt = cekUser.limitYt - 1
                hasil = true
            }
        } else {
            if (cekUser.limitSp == 0) {
                hasil = false
            } else {
                cekUser.limitSp = cekUser.limitSp - 1
                hasil = true
            }
        }

    }

    fs.writeFileSync("./database/premium.json", JSON.stringify(prem));
    return hasil
}

const getPremiumPosition = (userId) => {
    const prem = require('../../database/premium.json')
    let position = null;
    Object.keys(prem).forEach((i) => {
        if (prem[i].id === userId) {
            position = i;
        }
    })

    if (position !== null) {
        return position;
    }
}

const deletePremiumUser = (userId) => {
    const prem = require('../../database/premium.json')
    let cekUser = prem.find((user) => user.id == userId)
    let hasil = false

    if (cekUser) {
        cekUser.expired = 1
        hasil = true
    }
    
    fs.writeFileSync('./database/premium.json', JSON.stringify(prem))
    return hasil
}

const getPremiumExpired = (userId) => {
    const prem = require('../../database/premium.json')
    let position = null

    Object.keys(prem).forEach((i) => {
        if (prem[i].id === userId) {
            position = i;
        }
    })

    if (position !== null) {
        return prem[position].expired;
    }
}

const checkPremiumUser = (userId) => {
    const prem = require('../../database/premium.json')
    let status = false;

    Object.keys(prem).forEach((i) => {
        if (prem[i].id === userId) {
            status = true
        }
    })

    return status
}

const expiredCheck = (shann, msg) => {
    const prem = require('../../database/premium.json')
    setInterval(() => {
        let position = null;
        
        Object.keys(prem).forEach((i) => {
            if (Date.now() >= prem[i].expired) {
                position = i;
            }
        });
        if (position !== null) {
            idny = prem[position].id;

            prem.splice(position, 1);

            fs.writeFileSync("./database/premium.json", JSON.stringify(prem));

            idny ? shann.sendMessage(idny, { text: "```Premium kamu sudah habis, silahkan menghubungi #creator untuk membeli lagi.```" }) : "";
            idny = false;
        }
    }, 1000);
}

const getAllPremiumUser = () => {
    const prem = require('../../database/premium.json')
    const array = [];

    Object.keys(prem).forEach((i) => {
        array.push(prem[i].id);
    })

    return array
}

module.exports = {addPremiumUser, editLimitUser, deletePremiumUser, getPremiumExpired, getPremiumPosition, expiredCheck, checkPremiumUser, getAllPremiumUser};