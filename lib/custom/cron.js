let fs = require('fs')

// Database
let asahotak = require('../../database/games/asahotak.json')
let caklontong = require('../../database/games/caklontong.json')
let kuismath = require('../../database/games/kuismath.json')
let siapaaku = require('../../database/games/siapaaku.json')
let tebakbendera = require('../../database/games/tebakbendera.json')
let tebakgambar = require('../../database/games/tebakgambar.json')
let tebakkalimat = require('../../database/games/tebakkalimat.json')
let tebakkata = require('../../database/games/tebakkata.json')
let tebaklagu = require('../../database/games/tebaklagu.json')
let tebaklirik = require('../../database/games/tebaklirik.json')

const gamesCheck = (shann, m) => {
    var budy = (typeof m.text == 'string' ? m.text : '')
    let adaGame = {game: false, jawaban: false}

    if (('caklontong'+m.chat in caklontong)) {
        jawaban = caklontong['caklontong'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete caklontong['caklontong'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (('tebaklagu'+m.chat in tebaklagu)) {
        jawaban = tebaklagu['tebaklagu'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete tebaklagu['tebaklagu'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (('asahotak'+m.chat in asahotak)) {
        jawaban = asahotak['asahotak'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete asahotak['asahotak'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (('tebakbendera'+m.chat in tebakbendera)) {
        jawaban = tebakbendera['tebakbendera'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete tebakbendera['tebakbendera'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (('siapaaku'+m.chat in siapaaku)) {
        jawaban = siapaaku['siapaaku'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete siapaaku['siapaaku'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (('kuismath'+m.chat in kuismath)) {
        jawaban = kuismath['kuismath'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete kuismath['kuismath'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (('tebakgambar'+m.chat in tebakgambar)) {
        jawaban = tebakgambar['tebakgambar'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete tebakgambar['tebakgambar'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (('tebakkata'+m.chat in tebakkata)) {
        jawaban = tebakkata['tebakkata'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete tebakkata['tebakkata'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (('tebakkalimat'+m.chat in tebakkalimat)) {
        jawaban = tebakkalimat['tebakkalimat'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete tebakkalimat['tebakkalimat'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (('tebaklirik'+m.chat in tebaklirik)) {
        jawaban = tebaklirik['tebaklirik'+m.chat].jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}
            delete tebaklirik['tebaklirik'+m.chat]
        } else {
            adaGame = {game: true, jawaban: false}
        }
    }

    return adaGame
}

module.exports = {gamesCheck}