let fs = require('fs')

// Database
let dbUser = require('../../database/user.json')
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

const cooldowns = (shann) => {
    setInterval(() => {
        Object.keys(dbUser).forEach((i) => {
            if (i === null) return
            if (Date.now() >= dbUser[i].rpg.cd.claim) dbUser[i].rpg.cd.claim = 0
            if (Date.now() >= dbUser[i].rpg.cd.daily) dbUser[i].rpg.cd.daily = 0
            if (Date.now() >= dbUser[i].rpg.cd.weekly) dbUser[i].rpg.cd.weekly = 0
            if (Date.now() >= dbUser[i].rpg.cd.mulung) dbUser[i].rpg.cd.mulung = 0
            if (Date.now() >= dbUser[i].rpg.cd.adventure) dbUser[i].rpg.cd.adventure = 0

            fs.writeFileSync('./database/user.json', JSON.stringify(dbUser))
        })

        Object.keys(caklontong).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= caklontong[i].waktu && !caklontong[i].benar) {
                    shann.sendText(caklontong[i].id, `Waktu habis\n\nJawaban: ${caklontong[i].jawaban}\nDeskripsi: ${caklontong[i].deskripsi}`)
                    caklontong.splice(i, 1)
                } else if (caklontong[i].benar) {
                    caklontong.splice(i, 1)
                }
            }

            fs.writeFileSync('./database/games/caklontong.json', JSON.stringify(caklontong))
        })

        Object.keys(tebaklagu).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= tebaklagu[i].waktu && !tebaklagu[i].benar) {
                    shann.sendText(tebaklagu[i].id, `Waktu habis\n\nJawaban: ${tebaklagu[i].jawaban}`)
                    tebaklagu.splice(i, 1)
                } else if (tebaklagu[i].benar) {
                    tebaklagu.splice(i, 1)
                }
            }

            fs.writeFileSync('./database/games/tebaklagu.json', JSON.stringify(tebaklagu))
        })
        
        Object.keys(asahotak).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= asahotak[i].waktu && !asahotak[i].benar) {
                    shann.sendText(asahotak[i].id, `Waktu habis\n\nJawaban: ${asahotak[i].jawaban}`)
                    asahotak.splice(i, 1)
                } else if (asahotak[i].benar) {
                    asahotak.splice(i, 1)
                }
            }

            fs.writeFileSync('./database/games/asahotak.json', JSON.stringify(asahotak))
        })
        
        Object.keys(tebakbendera).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= tebakbendera[i].waktu && !tebakbendera[i].benar) {
                    shann.sendText(tebakbendera[i].id, `Waktu habis\n\nJawaban: ${tebakbendera[i].jawaban}`)
                    tebakbendera.splice(i, 1)
                } else if (tebakbendera[i].benar) {
                    tebakbendera.splice(i, 1)
                }
            }

            fs.writeFileSync('./database/games/tebakbendera.json', JSON.stringify(tebakbendera))
        })
        
        Object.keys(siapaaku).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= siapaaku[i].waktu && !siapaaku[i].benar) {
                    shann.sendText(siapaaku[i].id, `Waktu habis\n\nJawaban: ${siapaaku[i].jawaban}`)
                    siapaaku.splice(i, 1)
                } else if (siapaaku[i].benar) {
                    siapaaku.splice(i, 1)
                }
            }
            
            fs.writeFileSync('./database/games/siapaaku.json', JSON.stringify(siapaaku))
        })
        
        Object.keys(kuismath).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= kuismath[i].waktu && !kuismath[i].benar) {
                    shann.sendText(kuismath[i].id, `Waktu habis\n\nJawaban: ${kuismath[i].jawaban}`)
                    kuismath.splice(i, 1)
                } else if (kuismath[i].benar) {
                    kuismath.splice(i, 1)
                }
            }
            
            fs.writeFileSync('./database/games/kuismath.json', JSON.stringify(kuismath))
        })
        
        Object.keys(tebakgambar).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= tebakgambar[i].waktu && !tebakgambar[i].benar) {
                    shann.sendText(tebakgambar[i].id, `Waktu habis\n\nJawaban: ${tebakgambar[i].jawaban}`)
                    tebakgambar.splice(i, 1)
                } else if (tebakgambar[i].benar) {
                    tebakgambar.splice(i, 1)
                }
            }
            
            fs.writeFileSync('./database/games/tebakgambar.json', JSON.stringify(tebakgambar))
        })
        
        Object.keys(tebakkata).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= tebakkata[i].waktu && !tebakkata[i].benar) {
                    shann.sendText(tebakkata[i].id, `Waktu habis\n\nJawaban: ${tebakkata[i].jawaban}`)
                    tebakkata.splice(i, 1)
                } else if (tebakkata[i].benar) {
                    tebakkata.splice(i, 1)
                }
            }
            
            fs.writeFileSync('./database/games/tebakkata.json', JSON.stringify(tebakkata))
        })
        
        Object.keys(tebakkalimat).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= tebakkalimat[i].waktu && !tebakkalimat[i].benar) {
                    shann.sendText(tebakkalimat[i].id, `Waktu habis\n\nJawaban: ${tebakkalimat[i].jawaban}`)
                    tebakkalimat.splice(i, 1)
                } else if (tebakkalimat[i].benar) {
                    tebakkalimat.splice(i, 1)
                }
            }
            
            fs.writeFileSync('./database/games/tebakkalimat.json', JSON.stringify(tebakkalimat))
        })
        
        Object.keys(tebaklirik).forEach((i) => {
            if (i !== null) {
                if (Date.now() >= tebaklirik[i].waktu && !tebaklirik[i].benar) {
                    shann.sendText(tebaklirik[i].id, `Waktu habis\n\nJawaban: ${tebaklirik[i].jawaban}`)
                    tebaklirik.splice(i, 1)
                } else if (tebaklirik[i].benar) {
                    tebaklirik.splice(i, 1)
                }
            }
            

            fs.writeFileSync('./database/games/tebaklirik.json', JSON.stringify(tebaklirik))
        })
    }, 1000);
}

const gamesCheck = (shann, m) => {
    var budy = (typeof m.text == 'string' ? m.text : '')
    let adaGame = {game: false, jawaban: false}

    if (caklontong.find((user) => user.id == m.chat)) {
        let cekCak = caklontong.find((user) => user.id == m.chat)

        jawaban = cekCak.jawaban.toLowerCase()
        deskripsi = cekCak.deskripsi

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekCak.benar = true
            fs.writeFileSync('./database/games/caklontong.json', JSON.stringify(caklontong))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (tebaklagu.find((user) => user.id == m.chat)) {
        let cekSong = tebaklagu.find((user) => user.id == m.chat)

        jawaban = cekSong.jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekSong.benar = true
            fs.writeFileSync('./database/games/tebaklagu.json', JSON.stringify(tebaklagu))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (asahotak.find((user) => user.id == m.chat)) {
        let cekOtak = asahotak.find((user) => user.id == m.chat)

        jawaban = cekOtak.jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekOtak.benar = true
            fs.writeFileSync('./database/games/asahotak.json', JSON.stringify(asahotak))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (tebakbendera.find((user) => user.id == m.chat)) {
        let cekBendera = tebakbendera.find((user) => user.id == m.chat)
        jawaban = cekBendera.jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekBendera.benar = true
            fs.writeFileSync('./database/games/tebakbendera.json', JSON.stringify(tebakbendera))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (siapaaku.find((user) => user.id == m.chat)) {
        let cekAku = siapaaku.find((user) => user.id == m.chat)
        jawaban = cekAku.jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekAku.benar = true
            fs.writeFileSync('./database/games/siapaaku.json', JSON.stringify(siapaaku))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (kuismath.find((user) => user.id == m.chat)) {
        let cekMath = kuismath.find((user) => user.id == m.chat)
        jawaban = cekMath.jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekMath.benar = true
            fs.writeFileSync('./database/games/kuismath.json', JSON.stringify(kuismath))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (tebakgambar.find((user) => user.id == m.chat)) {
        let cekGambar = tebakgambar.find((user) => user.id == m.chat)
        jawaban = cekGambar.jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekGambar.benar = true
            fs.writeFileSync('./database/games/tebakgambar.json', JSON.stringify(tebakgambar))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (tebakkata.find((user) => user.id == m.chat)) {
        let cekKata = tebakkata.find((user) => user.id == m.chat)
        jawaban = cekKata.jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekKata.benar = true
            fs.writeFileSync('./database/games/tebakkata.json', JSON.stringify(tebakkata))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (tebakkalimat.find((user) => user.id == m.chat)) {
        let cekKalimat = tebakkalimat.find((user) => user.id == m.chat)
        jawaban = cekKalimat.jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekKalimat.benar = true
            fs.writeFileSync('./database/games/tebakkalimat.json', JSON.stringify(tebakkalimat))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    } else if (tebaklirik.find((user) => user.id == m.chat)) {
        let cekLirik = tebaklirik.find((user) => user.id == m.chat)
        jawaban = cekLirik.jawaban.toLowerCase()

        if (budy.toLowerCase() == jawaban) {
            adaGame = {game: true, jawaban: true}

            cekLirik.benar = true
            fs.writeFileSync('./database/games/tebaklirik.json', JSON.stringify(tebaklirik))
        } else {
            adaGame = {game: true, jawaban: false}
        }
    }

    return adaGame
}

module.exports = {cooldowns, gamesCheck}