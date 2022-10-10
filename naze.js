require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const os = require('os')
const util = require('util')
const path = require('path')
const hx = require('hxz-api')
const axios = require('axios')
const chalk = require('chalk')
const yts = require('yt-search')
const xfar = require('xfarr-api')
const google = require('google-it')
const { exec, spawn, execSync } = require("child_process")
const moment = require('moment-timezone')
const { JSDOM } = require('jsdom')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { Primbon } = require('scrape-primbon')
const scrappers = require('@bochilteam/scraper')
const primbon = new Primbon()
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunc')
const { normalize } = require('path')

const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const barat = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const tengah = moment.tz('Asia/Makassar').format('HH:mm:ss')
const timur = moment.tz('Asia/Jayapura').format('HH:mm:ss')
const ini_mark = `0@s.whatsapp.net`

const shannMark = ('© IKHSAN77')

// Waktu
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(time2 < "23:59:00"){
    var ucapanWaktu = 'Selamat malam'
}
if(time2 < "19:00:00"){
    var ucapanWaktu = 'Selamat sore'
}
if(time2 < "18:00:00"){
    var ucapanWaktu = 'Selamat sore'
}
if(time2 < "15:00:00"){
    var ucapanWaktu = 'Selamat siang'
}
if(time2 < "11:00:00"){
    var ucapanWaktu = 'Selamat pagi'
}
if(time2 < "05:00:00"){
    var ucapanWaktu = 'Selamat pagi'
} 

// read database
let tebaklagu = db.data.game.tebaklagu = []
let _family100 = db.data.game.family100 = []
let kuismath = db.data.game.math = []
let tebakgambar = db.data.game.tebakgambar = []
let tebakkata = db.data.game.tebakkata = []
let caklontong = db.data.game.lontong = []
let caklontong_desk = db.data.game.lontong_desk = []
let tebakkalimat = db.data.game.kalimat = []
let tebaklirik = db.data.game.lirik = []
let tebaktebakan = db.data.game.tebakan = []
let vote = db.data.others.vote = []

module.exports = shann = async (shann, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await shann.decodeJid(shann.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)
        const sender = m.isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid

        // Group
        const groupMetadata = m.isGroup ? await shann.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false

        try {
            let isNumber = x => typeof x === 'number' && !isNaN(x)
            let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
            
            let user = global.db.data.users[m.sender]
            if (typeof user !== 'object') global.db.data.users[m.sender] = {}

            if (user) {
                if (!isNumber(user.afkTime)) user.afkTime = -1
                if (!('afkReason' in user)) user.afkReason = ''
                if (!isNumber(user.limit)) user.limit = limitUser
            } else global.db.data.users[m.sender] = {
                afkTime: -1,
                afkReason: '',
                limit: limitUser
            }

            let chats = global.db.data.chats[m.chat]
            if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}

            if (chats) {
                if (!('mute' in chats)) chats.mute = false
                if (!('antilink' in chats)) chats.antilink = false
            } else global.db.data.chats[m.chat] = {
                mute: false,
                antilink: false
            }

            let setting = global.db.data.settings[botNumber]
            if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}

            if (setting) {
                if (!isNumber(setting.status)) setting.status = 0
                if (!('autobio' in setting)) setting.autobio = false
                if (!('templateImage' in setting)) setting.templateImage = true
                if (!('templateVideo' in setting)) setting.templateVideo = false
                if (!('templateGif' in setting)) setting.templateGif = false
                if (!('templateMsg' in setting)) setting.templateMsg = false	
            } else global.db.data.settings[botNumber] = {
                status: 0,
                autobio: false,
                templateImage: true,
                templateVideo: false,
                templateGif: false,
                templateMsg: false,
            }
        } catch (err) {
            console.error(err)
        }

        if (!shann.public) {
            if (!m.key.fromMe) return
        }

        if (m.message) {
            shann.readMessages([m.key])
        }

        // reset limit every 12 hours
        let cron = require('node-cron')
        cron.schedule('00 12 * * *', () => {
            let user = Object.keys(global.db.data.users)
            let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
            for (let jid of user) global.db.data.users[jid].limit = limitUser
            console.log('Reseted Limit')
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })

        // total hit
        global.hit = {}
        if (isCmd) {
            data = await fetchJson('https://api.countapi.xyz/hit/shann/visits')
            jumlahcmd = `${data.value}`
            dataa = await fetchJson(`https://api.countapi.xyz/hit/shann${moment.tz('Asia/Jakarta').format('DDMMYYYY')}/visits`)
            jumlahharian = `${dataa.value}`
        }

        // auto set bio
        if (db.data.settings[botNumber].autobio) {
            let setting = global.db.data.settings[botNumber]

            if (new Date() * 1 - setting.status > 1000) {
                let uptime = await runtime(process.uptime())
                await shann.setStatus(`${shann.user.name} | Runtime : ${runtime(uptime)}`)
                setting.status = new Date() * 1
            }
        }

        // Antilink
        if (db.data.chats[m.chat].antilink) {
            if (budy.match(`chat.whatsapp.com`)) {
                m.reply(`「 *ANTI LINK* 」\n\n*Kamu terdeteksi mengirim link group*, *maaf kamu akan di kick‼️,yang mau juga silahkan kirim link‼️*`)
                if (!isBotAdmins) return m.reply(`*Bot aja bukan admin anj*`)
                let gclink = (`https://chat.whatsapp.com/`+await shann.groupInviteCode(m.chat))
                let isLinkThisGc = new RegExp(gclink, 'i')
                let isgclink = isLinkThisGc.test(m.text)
                if (isgclink) return m.reply(`*maaf gak jadi, karena kamu ngirim link group ini*`)
                if (isAdmins) return m.reply(`*maaf kamu admin*`)
                if (isCreator) return m.reply(`*maaf kamu owner bot ku*`)
                shann.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }
        }

        // Mute Chat
        if (db.data.chats[m.chat].mute && !isAdmins && !isCreator) {
            return
        }

        // Respon Cmd with media
        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
            let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
            let { text, mentionedJid } = hash
            let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
                userJid: shann.user.id,
                quoted: m.quoted && m.quoted.fakeObj
            })

            messages.key.fromMe = areJidsSameUser(m.sender, shann.user.id)
            messages.key.id = m.key.id
            messages.pushName = m.pushName

            if (m.isGroup) messages.participant = m.sender

            let msg = {
                ...chatUpdate,
                messages: [proto.WebMessageInfo.fromObject(messages)],
                type: 'append'
            }
            shann.ev.emit('messages.upsert', msg)
        }

        if (('family100'+m.chat in _family100) && isCmd) {
            kuis = true
            let room = _family100['family100'+m.chat]
            let teks = budy.toLowerCase().replace(/[^\w\s\-]+/, '')
            let isSurender = /^((me)?nyerah|surr?ender)$/i.test(m.text)

            if (!isSurender) {
                let index = room.jawaban.findIndex(v => v.toLowerCase().replace(/[^\w\s\-]+/, '') === teks)
                if (room.terjawab[index]) return !0
                room.terjawab[index] = `@${pushname}`
            }

            let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
            let caption = `Jawablah Pertanyaan Berikut :\n${room.soal}\n\n\nTerdapat ${room.jawaban.length} Jawaban ${room.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}
${isWin ? `Semua Jawaban Terjawab` : isSurender ? 'Menyerah!' : ''}
${Array.from(room.jawaban, (jawaban, index) => {
                return isSurender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? room.terjawab[index] : ''}`.trim() : false
            }).filter(v => v).join('\n')}
            ${isSurender ? '' : ``}`.trim()
        
            shann.sendText(m.chat, caption, m, { contextInfo: { mentionedJid: parseMention(caption) }}).then(mes => { return _family100['family100'+m.chat].pesan = mesg }).catch(_ => _)
            if (isWin || isSurender) delete _family100['family100'+m.chat]
        }

        if (('caklontong'+m.chat in caklontong) && isCmd) {
            kuis = true
            jawaban = caklontong['caklontong'+m.chat]
            deskripsi = caklontong_desk['caklontong'+m.chat]

            if (budy.toLowerCase() == jawaban) {
                await m.reply('*Benar!*')
                delete caklontong['caklontong'+m.chat]
                delete caklontong_desk['caklontong'+m.chat]
            } else {
                m.reply('*Salah!*')
            }
        }

        if (('tebaklagu'+m.chat in tebaklagu) && isCmd) {
            kuis = true
            jawaban = tebaklagu['tebaklagu'+m.chat]

            if (budy.toLowerCase() == jawaban) {
                await m.reply(`*Benar!*`)
                delete tebaklagu['tebaklagu'+m.chat]
            } else {
                m.reply('*Salah!*')
            } 
        }

        if (kuismath.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = kuismath[m.sender.split('@')[0]]

            if (budy.toLowerCase() == jawaban) {
                await m.reply(`*Benar!*`)
                delete kuismath[m.sender.split('@')[0]]
            } else {
                m.reply('*Salah!*')
            }
        }

        if (tebakgambar.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebakgambar[m.sender.split('@')[0]]

            if (budy.toLowerCase() == jawaban) {
                await m.reply(`*Benar!*`)
                delete tebakgambar[m.sender.split('@')[0]]
            } else {
                m.reply('*Salah!*')
            }
        }

        if (tebakkata.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebakkata[m.sender.split('@')[0]]

            if (budy.toLowerCase() == jawaban) {
                await m.reply(`*Benar!*`)
                delete tebakkata[m.sender.split('@')[0]]
            } else {
                m.reply('*Salah!*')
            }
        }

        if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebakkalimat[m.sender.split('@')[0]]

            if (budy.toLowerCase() == jawaban) {
                await m.reply(`*Benar!*`)
                delete tebakkalimat[m.sender.split('@')[0]]
            } else {
                m.reply('*Salah!*')
            }
        }

        if (tebaklirik.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebaklirik[m.sender.split('@')[0]]

            if (budy.toLowerCase() == jawaban) {
                await m.reply(`*Benar!*`)
                delete tebaklirik[m.sender.split('@')[0]]
            } else {
                m.reply('*Salah!*')
            }
        }
	    
	    if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebaktebakan[m.sender.split('@')[0]]

            if (budy.toLowerCase() == jawaban) {
                await m.reply(`*Benar!*`)
                delete tebaktebakan[m.sender.split('@')[0]]
            } else {
                m.reply('*Jawaban Salah!*')
            }
        }

        // TTT
	    this.game = this.game ? this.game : {}
	    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
	    
        if (room) {
            let ok
            let isWin = !1
            let isTie = !1
            let isSurrender = !1

            // m.reply(`[DEBUG]\n${parseInt(m.text)}`)
            if (!/^([1-9]|(me)?nyerah|surr?ender|off|skip)$/i.test(m.text)) return
            isSurrender = !/^[1-9]$/.test(m.text)

            if (m.sender !== room.game.currentTurn) { // nek wayahku
                if (!isSurrender) return !0
            }
            
            if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
                m.reply({
                    '-3': 'Game telah berakhir',
                    '-2': 'Invalid',
                    '-1': 'Posisi Invalid',
                    0: 'Posisi Invalid',
                }[ok])
                    return !0
            }

            if (m.sender === room.game.winner) isWin = true
            else if (room.game.board === 511) isTie = true

            let arr = room.game.render().map(v => {
                return {
                    X: '❌',
                    O: '⭕',
                    1: '1️⃣',
                    2: '2️⃣',
                    3: '3️⃣',
                    4: '4️⃣',
                    5: '5️⃣',
                    6: '6️⃣',
                    7: '7️⃣',
                    8: '8️⃣',
                    9: '9️⃣',
                }[v]
            })
            
            if (isSurrender) {
                room.game._currentTurn = m.sender === room.game.playerX
                isWin = true
            }

            let winner = isSurrender ? room.game.currentTurn : room.game.winner
            let str = `Room ID: ${room.id}
            ${arr.slice(0, 3).join('')}
            ${arr.slice(3, 6).join('')}
            ${arr.slice(6).join('')}
            ${isWin ? `@${winner.split('@')[0]} Menang!` : isTie ? `Game berakhir` : `Giliran ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
            ❌: @${room.game.playerX.split('@')[0]}
            ⭕: @${room.game.playerO.split('@')[0]}
            Ketik *nyerah* untuk menyerah dan mengakui kekalahan`

            if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
            room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat

            if (room.x !== room.o) await shann.sendText(room.x, str, m, { mentions: parseMention(str) } )
            await shann.sendText(room.o, str, m, { mentions: parseMention(str) } )
            
            if (isTie || isWin) {
                delete this.game[room.id]
            }
	    }

        // Suit PvP
	    this.suit = this.suit ? this.suit : {}
	    let roof = Object.values(this.suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender))
	    
        if (roof) {
            let win = ''
            let tie = false

            if (m.sender == roof.p2 && /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(m.text) && m.isGroup && roof.status == 'wait') {
                if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text)) {
                    shann.sendTextWithMentions(m.chat, `@${roof.p2.split`@`[0]} menolak suit, suit dibatalkan`, m)
                    delete this.suit[roof.id]
                    return !0
                }

                roof.status = 'play'
                roof.asal = m.chat
                clearTimeout(roof.waktu)

                //delete roof[roof.id].waktu
                shann.sendText(m.chat, `Suit telah dikirimkan ke chat
                @${roof.p.split`@`[0]} dan 
                @${roof.p2.split`@`[0]}
                Silahkan pilih suit di chat masing"
                klik https://wa.me/${botNumber.split`@`[0]}`, m, { mentions: [roof.p, roof.p2] })

                if (!roof.pilih) shann.sendText(roof.p, `Silahkan pilih \n\nBatu\nKertas\nGunting`, m)
                if (!roof.pilih2) shann.sendText(roof.p2, `Silahkan pilih \n\nBatu\nKertas\nGunting`, m)

                roof.waktu_milih = setTimeout(() => {
                    if (!roof.pilih && !roof.pilih2) shann.sendText(m.chat, `Kedua pemain tidak niat main,\nSuit dibatalkan`)
                    else if (!roof.pilih || !roof.pilih2) {
                        win = !roof.pilih ? roof.p2 : roof.p
                        shann.sendTextWithMentions(m.chat, `@${(roof.pilih ? roof.p2 : roof.p).split`@`[0]} tidak memilih suit, game berakhir`, m)
                    }

                    delete this.suit[roof.id]
                    return !0
                }, roof.timeout)
            }

            let jwb = m.sender == roof.p
            let jwb2 = m.sender == roof.p2
            let g = /gunting/i
            let b = /batu/i
            let k = /kertas/i
            let reg = /^(gunting|batu|kertas)/i

            if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
                roof.pilih = reg.exec(m.text.toLowerCase())[0]
                roof.text = m.text
                m.reply(`Kamu telah memilih ${m.text} ${!roof.pilih2 ? `\n\nMenunggu lawan memilih` : ''}`)

                if (!roof.pilih2) shann.sendText(roof.p2, '_Lawan sudah memilih_\nSekarang giliran kamu', 0)
            }

            if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
                roof.pilih2 = reg.exec(m.text.toLowerCase())[0]
                roof.text2 = m.text
                m.reply(`Kamu telah memilih ${m.text} ${!roof.pilih ? `\n\nMenunggu lawan memilih` : ''}`)

                if (!roof.pilih) shann.sendText(roof.p, '_Lawan sudah memilih_\nSekarang giliran kamu', 0)
            }

            let stage = roof.pilih
            let stage2 = roof.pilih2

            if (roof.pilih && roof.pilih2) {
                clearTimeout(roof.waktu_milih)
                if (b.test(stage) && g.test(stage2)) win = roof.p
                else if (b.test(stage) && k.test(stage2)) win = roof.p2
                else if (g.test(stage) && k.test(stage2)) win = roof.p
                else if (g.test(stage) && b.test(stage2)) win = roof.p2
                else if (k.test(stage) && b.test(stage2)) win = roof.p
                else if (k.test(stage) && g.test(stage2)) win = roof.p2
                else if (stage == stage2) tie = true

                shann.sendText(roof.asal, `_*Hasil Suit*_${tie ? '\nSERI' : ''}
                @${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? ` Menang \n` : ` Kalah \n`}
                @${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? ` Menang \n` : ` Kalah \n`}
                `.trim(), m, { mentions: [roof.p, roof.p2] })
                delete this.suit[roof.id]
            }
	    }

        let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
	    for (let jid of mentionUser) {
            let user = global.db.data.users[jid]

            if (!user) continue
            let afkTime = user.afkTime

            if (!afkTime || afkTime < 0) continue
            let reason = user.afkReason || ''

            m.reply(`Jangan tag dia!\nDia sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}\nSelama ${clockString(new Date - afkTime)}`.trim())
        }

        if (db.data.users[m.sender].afkTime > -1) {
            let user = global.db.data.users[m.sender]
            m.reply(`Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}\nSelama ${clockString(new Date - user.afkTime)}`.trim())
            user.afkTime = -1
            user.afkReason = ''
        }

        switch (command) {
            case 'test': {
                m.reply('ok')
            }
            break
	    
            case 'afk': {
                let user = global.db.data.users[m.sender]
                user.afkTime = + new Date
                user.afkReason = text
                m.reply(`${m.pushName} *Telah Afk*${text ? ': ' + text : ''}`)
            }
            break

            case 'ttc': case 'ttt': case 'tictactoe': {
                if (!m.isGroup) return m.reply(mess.group)
                let TicTacToe = require("./lib/tictactoe")
                this.game = this.game ? this.game : {}

                if (Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return m.reply('Kamu masih didalam game')
                let room = Object.values(this.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
                
                if (room) {
                    m.reply('Partner ditemukan!')
                    room.o = m.chat
                    room.game.playerO = m.sender
                    room.state = 'PLAYING'
                    let arr = room.game.render().map(v => {
                    return {
                    X: '❌',
                    O: '⭕',
                    1: '1️⃣',
                    2: '2️⃣',
                    3: '3️⃣',
                    4: '4️⃣',
                    5: '5️⃣',
                    6: '6️⃣',
                    7: '7️⃣',
                    8: '8️⃣',
                    9: '9️⃣',
                    }[v]
                    })
                    let str = `Room ID: ${room.id}
                    ${arr.slice(0, 3).join('')}
                    ${arr.slice(3, 6).join('')}
                    ${arr.slice(6).join('')}
                    Menunggu @${room.game.currentTurn.split('@')[0]}
                    Ketik *nyerah* untuk menyerah dan mengakui kekalahan`

                    if (room.x !== room.o) await shann.sendText(room.x, str, m, { mentions: parseMention(str) } )
                    await shann.sendText(room.o, str, m, { mentions: parseMention(str) } )
                } else {
                    room = {
                        id: 'tictactoe-' + (+new Date),
                        x: m.chat,
                        o: '',
                        game: new TicTacToe(m.sender, 'o'),
                        state: 'WAITING'
                    }

                    if (text) room.name = text

                    m.reply('Menunggu partner' + (text ? ` mengetik command dibawah ini ${prefix}${command} ${text}` : ''))
                    this.game[room.id] = room
                }
            }
            break

            case 'delttc': case 'delttt': {
                this.game = this.game ? this.game : {}
                try {
                    if (this.game) {
                        delete this.game
                        shann.sendText(m.chat, `Berhasil delete session TicTacToe`, m)
                    } else if (!this.game) {
                        m.reply(`Session TicTacToe🎮 tidak ada`)
                    } else {
                        m.reply('?')
                    }
                } catch (e) {
                    m.reply('rusak')
                }
            }
            break

            case 'suitpvp': case 'suit': {
                this.suit = this.suit ? this.suit : {}
                let poin = 10
                let poin_lose = 10
                let timeout = 60000

                if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) m.reply(`Selesaikan suit mu yang sebelumnya`)
                if (m.mentionedJid[0] === m.sender) return m.reply(`Tidak bisa bermain dengan diri sendiri !`)
                if (!m.mentionedJid[0]) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya..\n\nContoh : ${prefix}suit @${owner[1]}`, m.chat, { mentions: [owner[1] + '@s.whatsapp.net'] })
                if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) return m.reply(`Orang yang kamu tantang sedang bermain suit bersama orang lain :(`)
                
                let id = 'suit_' + new Date() * 1
                let caption = `_*SUIT PvP*_
                @${m.sender.split`@`[0]} *menantang* @${m.mentionedJid[0].split`@`[0]} *untuk bermain suit*
                *Silahkan* @${m.mentionedJid[0].split`@`[0]} *untuk ketik terima/tolak*`
                
                this.suit[id] = {
                    chat: await shann.sendText(m.chat, caption, m, { mentions: parseMention(caption) }),
                    id: id,
                    p: m.sender,
                    p2: m.mentionedJid[0],
                    status: 'wait',
                    waktu: setTimeout(() => {
                        if (this.suit[id]) shann.sendText(m.chat, `_Waktu suit habis_`, m)

                        delete this.suit[id]
                    }, 60000), poin, poin_lose, timeout
                }
            }
            break

            case 'family100': {
                if ('family100'+m.chat in _family100) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')

                let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')
                let random = anu[Math.floor(Math.random() * anu.length)]
                let hasil = `*Jawablah Pertanyaan Berikut :*\n${random.soal}\n\nTerdapat *${random.jawaban.length}* Jawaban ${random.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}`.trim()

                _family100['family100'+m.chat] = {
                    id: 'family100'+m.chat,
                    pesan: await shann.sendText(m.chat, hasil, m),
                    ...random,
                    terjawab: Array.from(random.jawaban, () => false),
                    hadiah: 6,
                }
            }
            break

            case 'caklontong': {
                if ('caklontong'+m.chat in caklontong) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')

                let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')
                let result = anu[Math.floor(Math.random() * anu.length)]

                shann.sendText(m.chat, `${result.soal}*\n\nWaktu : 2 Menit`, m).then(() => {
                    caklontong['caklontong'+m.chat] = result.jawaban.toLowerCase()
                    caklontong_desk['caklontong'+m.chat] = result.deskripsi
                })

                await sleep(120000)
                if ('caklontong'+m.chat) {
                    shann.sendText(m.chat, `*Waktu Habis*\n\nJawaban:  ${caklontong['caklontong'+m.chat]}\nDeskripsi : ${caklontong_desk['caklontong'+m.chat]}`, m)
                    delete caklontong['caklontong'+m.chat]
                    delete caklontong_desk['caklontong'+m.chat]
                }
            }

            case 'halah': case 'hilih': case 'huluh': case 'heleh': case 'holoh': {
                if (!m.quoted && !text) return m.reply(`Kirim/reply text dengan caption ${prefix + command}`)

                ter = command[1].toLowerCase()
                tex = m.quoted ? m.quoted.text ? m.quoted.text : q ? q : m.text : q ? q : m.text
                m.reply(tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
            }
            break

            case 'tebak': {
                if (!text) return m.reply(`Example : ${prefix + command} gamber\n\nOption : \n1. lagu\n2. gambar\n3. kata\n4. kalimat\n5. lirik`)

                if (args[0] === "lagu") {
                    if ('tebaklagu'+m.chat in tebaklagu) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
    
                    let anu = await fetchJson('https://fatiharridho.github.io/tebaklagu.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    let msg = await shann.sendMessage(m.chat, { audio: { url: result.link_song }, mimetype: 'audio/mpeg' }, { quoted: m })
    
                    shann.sendText(m.chat, `Lagu Tersebut Adalah Lagu dari?\n\nArtist : ${result.artist}\nWaktu : 2 Menit`, msg).then(() => {
                        tebaklagu['tebaklagu'+m.chat] = result.jawaban.toLowerCase()
                    })
    
                    await sleep(120000)
                    if ('tebaklagu'+m.chat) {
                        shann.sendText(m.chat, `*Waktu Habis*\n\nJawaban:  ${tebaklagu['tebaklagu'+m.chat]}`, m)
                        delete tebaklagu['tebaklagu'+m.chat]
                    }
                } else if (args[0] === 'gambar') {
                    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')

                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]

                    shann.sendImage(m.chat, result.img, `Silahkan Jawab Soal Di Atas Ini\n\nDeskripsi : ${result.deskripsi}\nWaktu : 2 Menit`, m).then(() => {
                        tebakgambar[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })

                    await sleep(120000)
                    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) {
                        console.log("Jawaban: " + result.jawaban)
                        shann.sendText(m.chat, `*Waktu Habis*\n\nJawaban:  ${tebakgambar[m.sender.split('@')[0]]}`, m)
                        delete tebakgambar[m.sender.split('@')[0]]
                    }
                } else if (args[0] === 'kata') {
                    if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')

                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]

                    shann.sendText(m.chat, `${result.soal}\n\nWaktu : 2 Menit`, m).then(() => {
                        tebakkata[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })

                    await sleep(120000)
                    if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) {
                        console.log("Jawaban: " + result.jawaban)
                        shann.sendText(m.chat, `*Waktu Habis*\n\nJawaban:  ${tebakkata[m.sender.split('@')[0]]}`, m)
                        delete tebakkata[m.sender.split('@')[0]]
                    }
                } else if (args[0] === 'kalimat') {
                    if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')

                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]

                    shann.sendText(m.chat, `${result.soal}\n\nWaktu : 2 Menit`, m).then(() => {
                        tebakkalimat[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })

                    await sleep(120000)
                    if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) {
                        console.log("Jawaban: " + result.jawaban)
                        shann.sendText(m.chat, `*Waktu Habis*\n\nJawaban:  ${tebakkalimat[m.sender.split('@')[0]]}`, m)
                        delete tebakkalimat[m.sender.split('@')[0]]
                    }
                } else if (args[0] === 'lirik') {
                    if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')

                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]

                    shann.sendText(m.chat, `Ini Adalah Lirik Dari Lagu? : *${result.soal}*?\nWaktu : 2 Menit`, m).then(() => {
                        tebaklirik[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })

                    await sleep(120000)
                    if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) {
                        console.log("Jawaban: " + result.jawaban)
                        shann.sendText(m.chat, `*Waktu Habis*\n\nJawaban:  ${tebaklirik[m.sender.split('@')[0]]}`, m)
                        delete tebaklirik[m.sender.split('@')[0]]
                    }
                }
            }
            break

            case 'kuismath': case 'math': {
                if (kuismath.hasOwnProperty(m.sender.split('@')[0])) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')

                let { genMath, modes } = require('./src/math')
                if (!text) return m.reply(`Mode: ${Object.keys(modes).join(' | ')}\nContoh penggunaan: ${prefix}math medium`)

                let result = await genMath(text.toLowerCase())
                shann.sendText(m.chat, `*Berapa hasil dari: ${result.soal.toLowerCase()}*?\n\nWaktu: ${(result.waktu / 1000).toFixed(2)} detik`, m).then(() => {
                    kuismath[m.sender.split('@')[0]] = result.jawaban
                })

                await sleep(result.waktu)
                if (kuismath.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    m.reply("Waktu Habis\nJawaban: " + kuismath[m.sender.split('@')[0]])
                    delete kuismath[m.sender.split('@')[0]]
                }
            }
            break

            case 'jodohku': {
                if (!m.isGroup) return m.reply(mess.group)

                let member = participants.map(u => u.id)
                let me = m.sender
                let jodoh = member[Math.floor(Math.random() * member.length)]
                let jawab = `👫Jodoh mu adalah
@${me.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`

                let ments = [me, jodoh]
                let buttons = [
                    { buttonId: 'jodohku', buttonText: { displayText: 'Jodohku' }, type: 1 }
                ]
                await shann.sendButtonText(m.chat, buttons, jawab, shann.user.name, m, {mentions: ments})
            }
            break

            case 'jadian': {
                if (!m.isGroup) return m.reply(mess.group)
                let member = participants.map(u => u.id)
                let orang = member[Math.floor(Math.random() * member.length)]
                let jodoh = member[Math.floor(Math.random() * member.length)]
                
                let jawab = `Ciee yang Jadian💖*
@${orang.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`
                
                let menst = [orang, jodoh]
                let buttons = [
                    { buttonId: 'jadian', buttonText: { displayText: 'Jadian' }, type: 1 }
                ]
                await shann.sendButtonText(m.chat, buttons, jawab, shann.user.name, m, {mentions: menst})
            }
            break

            case 'style': case 'styletext': {
                let { styletext } = require('./lib/scraper')
                if (!text) return m.reply('Masukkan Query text!')

                let anu = await styletext(text)
                let teks = `Srtle Text From ${text}\n\n`

                for (let i of anu) {
                    teks += `⭔ *${i.name}* : ${i.result}\n\n`
                }

                m.reply(teks)
            }
            break

            case 'vote': {
                if (!m.isGroup) return m.reply(mess.group)
                if (m.chat in vote) return m.reply(`_Masih ada vote di chat ini!_\n\n*${prefix}hapusvote* - untuk menghapus vote`)
                if (!text) return m.reply(`Masukkan Alasan Melakukan Vote, Example: *${prefix + command} Owner Ganteng*`)

                vote[m.chat] = [q, [], []]
                
                await sleep(1000)
                upvote = vote[m.chat][1]
                devote = vote[m.chat][2]
                teks_vote = `*「 VOTE 」*
*Alasan:* ${vote[m.chat][0]}
┌〔 SETUJU 〕
│ 
├ Total: ${vote[m.chat][1].length}
│
│ 
└────
┌〔 TIDAK SETUJU 〕
│ 
├ Total: ${vote[m.chat][2].length}
│
│ 
└────
*${prefix}hapusvote* - untuk menghapus vote`

                let buttonsVote = [
                    {buttonId: `${prefix}upvote`, buttonText: {displayText: 'SETUJU'}, type: 1},
                    {buttonId: `${prefix}devote`, buttonText: {displayText: 'TIDAK SETUJU'}, type: 1}
                ]
    
                let buttonMessageVote = {
                    text: teks_vote,
                    footer: shann.user.name,
                    buttons: buttonsVote,
                    headerType: 1
                }
                shann.sendMessage(m.chat, buttonMessageVote)
            }
            break

            case 'upvote': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!(m.chat in vote)) return m.reply(`_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`)

                isVote = vote[m.chat][1].concat(vote[m.chat][2])
                wasVote = isVote.includes(m.sender)
                
                if (wasVote) return m.reply('Kamu Sudah Vote')
                vote[m.chat][1].push(m.sender)
                menvote = vote[m.chat][1].concat(vote[m.chat][2])
                teks_vote = `*「 VOTE 」*
*Alasan:* ${vote[m.chat][0]}
┌〔 SETUJU 〕
│ 
├ Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────
┌〔 TIDAK SETUJU 〕
│ 
├ Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────
*${prefix}hapusvote* - untuk menghapus vote`

                let buttonsUpvote = [
                    {buttonId: `${prefix}upvote`, buttonText: {displayText: 'SETUJU'}, type: 1},
                    {buttonId: `${prefix}devote`, buttonText: {displayText: 'TIDAK SETUJU'}, type: 1}
                ]
    
                let buttonMessageUpvote = {
                    text: teks_vote,
                    footer: shann.user.name,
                    buttons: buttonsUpvote,
                    headerType: 1,
                    mentions: menvote
                 }
                shann.sendMessage(m.chat, buttonMessageUpvote)
            }
            break

            case 'devote': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!(m.chat in vote)) return m.reply(`_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`)

                isVote = vote[m.chat][1].concat(vote[m.chat][2])
                wasVote = isVote.includes(m.sender)

                if (wasVote) return m.reply('Kamu Sudah Vote')
                
                vote[m.chat][2].push(m.sender)
                menvote = vote[m.chat][1].concat(vote[m.chat][2])
                teks_vote = `*「 VOTE 」*
*Alasan:* ${vote[m.chat][0]}
┌〔 SETUJU 〕
│ 
├ Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────
┌〔 TIDAK SETUJU 〕
│ 
├ Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────
*${prefix}hapusvote* - untuk menghapus vote`

                let buttonsDevote = [
                    {buttonId: `${prefix}upvote`, buttonText: {displayText: 'SETUJU'}, type: 1},
                    {buttonId: `${prefix}devote`, buttonText: {displayText: 'TIDAK SETUJU'}, type: 1}
                ]
    
                let buttonMessageDevote = {
                    text: teks_vote,
                    footer: shann.user.name,
                    buttons: buttonsDevote,
                    headerType: 1,
                    mentions: menvote
                }
                shann.sendMessage(m.chat, buttonMessageDevote)
            }
            break
                     
            case 'cekvote': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!(m.chat in vote)) return m.reply(`_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`)
                teks_vote = `*「 VOTE 」*
*Alasan:* ${vote[m.chat][0]}
┌〔 SETUJU 〕
│ 
├ Total: ${upvote.length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────
┌〔 TIDAK SETUJU 〕
│ 
├ Total: ${devote.length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────
*${prefix}hapusvote* - untuk menghapus vote
©${shann.user.id}
`
            shann.sendTextWithMentions(m.chat, teks_vote, m)
            }
            break

            case 'deletevote': case'delvote': case 'hapusvote': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!(m.chat in vote)) return m.reply(`_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`)
                delete vote[m.chat]
                m.reply('Berhasil Menghapus Sesi Vote Di Grup Ini')
            }
            break

            case 'listonline': case 'liston': {
                let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                let online = [...Object.keys(store.presences[id]), botNumber]
             
                shann.sendText(m.chat, 'List Online:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
            }
            break

            case 'sticker': case 's': case 'stickergif': case 'sgif': {
                if (!quoted) return m.reply(`*Balas Video/Image Dengan Caption* ${prefix + command}`)
                
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await shann.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                    await fs.unlinkSync(encmedia)
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return m.reply('*Maksimal 10 detik!*')
                    let media = await quoted.download()
                    let encmedia = await shann.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                    await fs.unlinkSync(encmedia)
                } else {
                    m.reply(`*Kirim Gambar/Video Dengan Caption* ${prefix + command}\nDurasi *Video 1-9 Detik*`)
                }
            }
            break

            case 'ebinary': {
                if (!text) return m.reply(`Example : ${prefix + command} text`)

                let { eBinary } = require('./lib/binary')
                let eb = await eBinary(text)
                m.reply(eb)
            }
            break
            
            case 'dbinary': {
                if (!text) return m.reply(`Example : ${prefix + command} text`)
                let { dBinary } = require('./lib/binary')
                let db = await dBinary(text)
                m.reply(db)
            }
            break

            case 'emojimix': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return m.reply(`Example : ${prefix + command} 😅+🤔`)
                if (!emoji2) return m.reply(`Example : ${prefix + command} 😅+🤔`)
                
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await shann.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
                    await fs.unlinkSync(encmedia)
                }
            }
            break

            case 'ttp': {
                if (!text) return m.reply(`Example : ${prefix + command} text`)
                await shann.sendMedia(m.chat, `https://shannbot.herokuapp.com/api/creator/ttp2?apikey=your_apikey&text=${text}`, 'shann', 'morou', m, {asSticker: true})
            }
            break
			
	        case 'attp': {
                if (!text) return m.reply(`Example : ${prefix + command} text`)
                await shann.sendMedia(m.chat, `https://shannbot.herokuapp.com/api/creator/attp?apikey=your_apikey&text=${text}`, 'shann', 'morou', m, {asSticker: true})
            }
            break

            case 'smeme': case 'stickmeme': case 'stikmeme': case 'stickermeme': case 'stikermeme': {
                let respond = `Kirim/reply image/sticker dengan caption ${prefix + command} text1|text2`
                if (!/image/.test(mime)) return m.reply(respond)
                if (!text) return m.reply(respond)

                atas = text.split('|')[0] ? text.split('|')[0] : '-'
                bawah = text.split('|')[1] ? text.split('|')[1] : '-'
                
                let { TelegraPh } = require('./lib/uploader')
                let mee = await shann.downloadAndSaveMediaMessage(quoted)
                let mem = await TelegraPh(mee)
                let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem}`
                let awikwok = await shann.sendImageAsSticker(m.chat, smeme, m, { packname: global.packname, author: global.auhor })
                await fs.unlinkSync(awikwok)
            }
            break
            
            case 'toimage': case 'toimg': {
                if (!quoted) return m.reply('Reply Image')
                if (!/webp/.test(mime)) return m.reply(`balas sticker dengan caption *${prefix + command}*`)
            
                let media = await shann.downloadAndSaveMediaMessage(quoted)
                let ran = await getRandom('.png')
            
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return m.reply(err)
                    let buffer = fs.readFileSync(ran)
                    shann.sendMessage(m.chat, { image: buffer }, { quoted: m })
                    fs.unlinkSync(ran)
                })
            }
            break

            case 'tomp4': case 'tovideo': {
                if (!quoted) return m.reply('Reply Image')
                if (!/webp/.test(mime)) return m.reply(`balas sticker dengan caption *${prefix + command}*`)
                
                let { webp2mp4File } = require('./lib/uploader')
                let media = await shann.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                
                await shann.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
                await fs.unlinkSync(media)
            }
            break
            
            case 'toaud': case 'toaudio': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
                if (!quoted) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
                
                
                let media = await quoted.download()
                let { toAudio } = require('./lib/converter')
                let audio = await toAudio(media, 'mp4')
                
                shann.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
            }
            break

            case 'tomp3': {
                if (/document/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
                if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
                if (!quoted) return m.reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
            
                let media = await quoted.download()
                let { toAudio } = require('./lib/converter')
                let audio = await toAudio(media, 'mp4')
            
                shann.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert By ${shann.user.name}.mp3`}, { quoted : m })
            }
            break

            case 'tovn': case 'toptt': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)
                if (!quoted) return m.reply(`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)
            
                let media = await quoted.download()
                let { toPTT } = require('./lib/converter')
                let audio = await toPTT(media, 'mp4')
            
                shann.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
            }
            break

            case 'togif': {
                if (!quoted) return m.reply('Reply Image')
                if (!/webp/.test(mime)) return m.reply(`balas stiker dengan caption *${prefix + command}*`)
		        
                let { webp2mp4File } = require('./lib/uploader')
                let media = await shann.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
            
                await shann.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
                await fs.unlinkSync(media)
            }
            break
            
	        case 'tourl': {
                let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
                let media = await shann.downloadAndSaveMediaMessage(quoted)
                
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    m.reply(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    m.reply(util.format(anu))
                }
                
                await fs.unlinkSync(media)
            }
            break

            case 'yts': case 'ytsearch': {
                if (!text) return m.reply(`Example : ${prefix + command} story wa anime`)
                
                let yts = require("yt-search")
                let search = await yts(text)
                let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
                let no = 1
                
                for (let i of search.all) {
                    teks += `⭔ No : ${no++}\n⭔ Type : ${i.type}\n⭔ Video ID : ${i.videoId}\n⭔ Title : ${i.title}\n⭔ Views : ${i.views}\n⭔ Duration : ${i.timestamp}\n⭔ Upload At : ${i.ago}\n⭔ Author : ${i.author.name}\n⭔ Url : ${i.url}\n\n─────────────────\n\n`
                }
                
                shann.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })
            }
            break

            case 'gimage': {
                if (!text) return m.reply(`Example : ${prefix + command} kaori cicak`)
                
                anu = await fetchJson(`https://api.akuari.my.id/search/googleimage?query=${text}`)
                n = anu.result
                images = n[Math.floor(Math.random() * n.length)]
                
                let buttons = [
                    {buttonId: `gimage ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}
                ]
                
                let buttonMessage = {
                    image: { url: images },
                    caption: `*-------「 GIMAGE SEARCH 」-------*
🤠 *Query* : ${text}
🔗 *Media Url* : ${images}`,
                    footer: shann.user.name,
                    buttons: buttons,
                    headerType: 4
                }
                
                shann.sendMessage(m.chat, buttonMessage, { quoted: m })
            }
            break

            case 'google': {
                if (!text) return m.reply(`Example : ${prefix + command} fatih arridho`)
                let google = require('google-it')

                google({'query': text}).then(res => {
                    let teks = `Google Search From : ${text}\n\n`
                    
                    for (let g of res) {
                        teks += `⭔ *Title* : ${g.title}\n`
                        teks += `⭔ *Description* : ${g.snippet}\n`
                        teks += `⭔ *Link* : ${g.link}\n\n────────────────────────\n\n`
                    } 

                    m.reply(teks)
                })
            }
            break

            case 'play': case 'ytplay': {
                if (!text) return m.reply(`Example : ${prefix + command} story wa anime`)

                let yts = require("yt-search")
                let search = await yts(text)
                let anu = search.videos[Math.floor(Math.random() * search.videos.length)]

                let buttons = [
                    {buttonId: `ytmp3 ${anu.url}`, buttonText: {displayText: '♫ Audio'}, type: 1},
                    {buttonId: `ytmp4 ${anu.url}`, buttonText: {displayText: '► Video'}, type: 1}
                ]

                let buttonMessage = {
                    image: { url: anu.thumbnail },
                    caption: `
⭔ Title : ${anu.title}
⭔ Ext : Search
⭔ ID : ${anu.videoId}
⭔ Duration : ${anu.timestamp}
⭔ Viewers : ${anu.views}
⭔ Upload At : ${anu.ago}
⭔ Author : ${anu.author.name}
⭔ Channel : ${anu.author.url}
⭔ Description : ${anu.description}
⭔ Url : ${anu.url}`,
                    footer: shann.user.name,
                    buttons: buttons,
                    headerType: 4
                }

                shann.sendMessage(m.chat, buttonMessage, { quoted: m })
            }
            break

            case 'pinterest': {
		        
                let { pinterest } = require('./lib/scraper')
                
                anu = await pinterest(text)
                result = anu[Math.floor(Math.random() * anu.length)]
                shann.sendMessage(m.chat, { image: { url: result }, caption: '⭔ Media Url : '+result }, { quoted: m })
            }
            break

            case 'couple': {
            
                let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
                let random = anu[Math.floor(Math.random() * anu.length)]
            
                shann.sendMessage(m.chat, { image: { url: random.male }, caption: `Couple Male` }, { quoted: m })
                shann.sendMessage(m.chat, { image: { url: random.female }, caption: `Couple Female` }, { quoted: m })
            }
	        break

            case 'tt': case 'tiktok': case 'tiktoknowm': {
                if (!text) return m.reply('Masukkan Query Link!')

                xfar.downloader.tiktok(text)
                .then(data => {
                    shann.sendMessage(m.chat, {video: {url: data.media[1].url}, caption: 'Done'}, { quoted: m })
                })
                .catch(err => {
                    m.reply('Server dalam perbaikkan')
                })
            }
            break

            case 'fbdl': case 'fb': case 'facebook': {
                if (!text) return m.reply('Masukkan Query Link!')

                xfar.downloader.facebook(text)
                .then(data => {
                    shann.sendMessage(m.chat, {video: {url: data.hd}, caption: 'Done'}, {quoted: m})
                })
                .catch(err => {
                    m.reply('Server dalam perbaikkan')
                })
            }
            break

            case 'ttmp3': case 'tiktokmp3': case 'tiktokaudio': {
                if (!text) return m.reply('Masukkan Query Link!')
                
                xfar.downloader.tiktok(text)
                .then(data => {
                    shann.sendMessage(m.chat, {audio: {url: data.media[1].url}, mimetype: 'audio/mpeg'}, { quoted: m })
                })
                .catch(err => {
                    m.reply('Server dalam perbaikkan')
                })
            }
            break

            case 'joox': case 'jooxdl': {
                if (!text) return m.reply('No Query Title')

                
                let anu = await fetchJson(api('lolhuman', '/jooxplay', { query: text }, 'apikey'))
                
                shann.sendMessage(m.chat, { audio: { url: anu.result.audio[0].link }, mimetype: 'audio/mpeg', fileName: anu.result.info.song+'.m4a' }, { quoted: m })
            }
            break

            case 'instagram': case 'ig': case 'igdl': {
                if (!text) return m.reply('No Query Url!')


                xfar.downloader.instagram(text)
                .then(data => {
                    for (let media of data.media) shann.sendFileUrl(m.chat, media.url, `Done`, m)
                })
                .catch(err => {
                    m.reply('Server dalam perbaikkan')
                })
            }
            break

            // OWNER ONLY
            case 'react': {
                if (!isCreator) return m.reply(mess.owner)
                reactionMessage = {
                    react: {
                        text: args[0],
                        key: { remoteJid: m.chat, fromMe: true, id: quoted.id }
                    }
                }

                shann.sendMessage(m.chat, reactionMessage)
            }
            break

            case 'join': {
                if (!isCreator) return m.reply(mess.owner)
                if (!text) return m.reply('Masukkan Link Group!')
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return m.reply('Link invalid!')
                
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await shann.groupAcceptInvite(result).then((res) => m.reply('Done')).catch((err) => m.reply(jsonformat(err)))
            }
            break

            case 'leave': {
                if (!isCreator) return m.reply(mess.owner)
                await shann.groupLeave(m.chat)
            }
            break

            case 'setexif': {
                if (!isCreator) return m.reply(mess.owner)
                if (!text) return m.reply(`Example : ${prefix + command} packname|author`)

                global.packname = text.split("|")[0]
                global.author = text.split("|")[1]
                m.reply(`Exif berhasil diubah`)
            }
            break

            case 'block': {
                if (!isCreator) return m.reply(mess.owner)

                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await shann.updateBlockStatus(users, 'block').then((res) => m.reply('Done')).catch((err) => m.reply('Failed'))
            }
            break

            case 'unblock': {
                if (!isCreator) return m.reply(mess.owner)

                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await shann.updateBlockStatus(users, 'unblock').then((res) => m.reply('Done')).catch((err) => m.reply('Failed'))
            }
            break

            case 'setppbot': {
                if (!isCreator) return m.reply(mess.owner)
                if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
                if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
                if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
                
                let media = await shann.downloadAndSaveMediaMessage(quoted)
                await shann.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
                m.reply(mess.success)
            }
            break

            case 'delete': case 'del': {
                if (!m.quoted) return m.reply('false')
                let { chat, fromMe, id, isBaileys } = m.quoted
                if (!isBaileys) return m.reply('Pesan tersebut bukan dikirim oleh bot!')
                if (!isCreator) return m.reply(mess.owner)

                shann.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break

            // ADMIN GROUP ONLY
            case 'group': case 'grup': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)

                if (args[0] === 'close'){
                    await shann.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`*Sukses Menutup Group*`)).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'open'){
                    await shann.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`*Sukses Membuka Group*`)).catch((err) => m.reply(jsonformat(err)))
                }
            }
            break

            case 'antilink': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)

                if (args[0] === "on") {
                    if (db.data.chats[m.chat].antilink) return m.reply(`*Sudah Aktif kak Sebelumnya*`)
                    db.data.chats[m.chat].antilink = true
                    m.reply(`*Antilink Sekarang Aktif !*`)
                } else if (args[0] === "off") {
                    if (!db.data.chats[m.chat].antilink) return m.reply(`*Sudah Tidak Aktif Sebelumnya*`)
                    db.data.chats[m.chat].antilink = false
                    m.reply(`*Antilink Sekarang Tidak Aktif !*`)
                }
            }
            break

            case 'mute': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)

                if (args[0] === "on") {
                    if (db.data.chats[m.chat].mute) return m.reply(`Sudah Aktif Sebelumnya`)
                    db.data.chats[m.chat].mute = true
                    m.reply(`${shann.user.name} telah di mute di group ini !`)
                } else if (args[0] === "off") {
                    if (!db.data.chats[m.chat].mute) return m.reply(`Sudah Tidak Aktif Sebelumnya`)
                    db.data.chats[m.chat].mute = false
                    m.reply(`${shann.user.name} telah di unmute di group ini !`)
                }
            }
            break

            case 'linkgroup': case 'linkgc': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)

                let response = await shann.groupInviteCode(m.chat)
                shann.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\n👾Link Group : ${groupMetadata.subject}`, m, { detectLink: true })
            }
            break

            case 'tagall': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)

                let teks = `══✪〘 *👥 Tag All* 〙✪══\n\n➲ *Pesan : ${q ? q : 'kosong'}*\n\n`
                for (let mem of participants) {
                   teks += `⭔ @${mem.id.split('@')[0]}\n`
                }

                shann.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
            }
            break

            case 'hidetag': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)

                shann.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
            }
            break

            case 'setppgroup': case 'setppgrup': case 'setppgc': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isAdmins) return m.reply(mess.admin)
                if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
                if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
                if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)

                let media = await shann.downloadAndSaveMediaMessage(quoted)
                await shann.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
                m.reply(mess.success)
            }
            break

            case 'setname': case 'setsubject': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)
                if (!text) return m.reply('Text ?')

                await shann.groupUpdateSubject(m.chat, text).then((res) => m.reply('Done')).catch((err) => m.reply('Failed'))
            }
            break

            case 'setdesc': case 'setdesk': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)
                if (!text) return m.reply('Text ?')

                await shann.groupUpdateDescription(m.chat, text).then((res) => m.reply('Done')).catch((err) => m.reply('Failed'))
            }
            break

            case 'kick': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)

                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await shann.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply('Done')).catch((err) => m.reply('Failed'))
            }
            break

            case 'add': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)
                
                let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await shann.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply('Done')).catch((err) => m.reply('Failed'))
            }
            break

            case 'promote': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)

                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await shann.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('Done')).catch((err) => m.reply('Failed'))
            }
            break

            case 'demote': {
                if (!m.isGroup) return m.reply(mess.group)
                if (!isBotAdmins) return m.reply(mess.botAdmin)
                if (!isAdmins) return m.reply(mess.admin)

                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await shann.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('Done')).catch((err) => m.reply('Failed'))
            }
            break

            // CONTACT OWNER
            case 'creator': {
                shann.sendContact(m.chat, global.ikhsan77, m)
            }

            // MENU BOT
            case 'list': case 'help': case 'menu': case 'p': {
                let shannBtn = [{ buttonId: 'creator', buttonText: {displayText: 'Creator'}, type: 1}]
	        	let shannMsg = `*${ucapanWaktu} Kak ${pushname}*!\n▻►▻►▻►▻►▻►▻►▻►▻►

╭──❍「 *INFO BOT* 」
│
│⭔ *Nama Bot* : ${shann.user.name}
│⭔ *Mode* : Public
│⭔ *Prefix* :「 MULTI-PREFIX 」
│⭔ *Total Hit* : ${jumlahcmd}
│⭔ *Total Hit Today* : ${jumlahharian}
│
╰──❍

╭──❍「 *OWNER MENU* 」
│
│⭔ ${prefix}react [emoji]
│⭔ ${prefix}join [link]
│⭔ ${prefix}leave
│⭔ ${prefix}block @user
│⭔ ${prefix}unblock @user
│⭔ ${prefix}setppbot [image]
│⭔ ${prefix}setexif
│
╰──❍

╭──❍「 *CONVER MENU* 」
│
│⭔ ${prefix}toimg
│⭔ ${prefix}emojimix
│⭔ ${prefix}tomp4
│⭔ ${prefix}togif
│⭔ ${prefix}tourl
│⭔ ${prefix}tovn
│⭔ ${prefix}tomp3
│⭔ ${prefix}toaudio
│⭔ ${prefix}ebinary
│⭔ ${prefix}dbinary
│⭔ ${prefix}styletext
│
╰──❍

╭──❍「 *DOWNLOADER MENU* 」
│
│⭔ ${prefix}fb [url]
│⭔ ${prefix}ig [url]
│⭔ ${prefix}tt [url]
│⭔ ${prefix}ttmp3 [url]
│
╰──❍

╭──❍「 *FUN MENU* 」
│
│⭔ ${prefix}caklontong
│⭔ ${prefix}jadian
│⭔ ${prefix}jodohku
│⭔ ${prefix}delttt
│⭔ ${prefix}tictactoe
│⭔ ${prefix}family100
│⭔ ${prefix}tebak [option]
│⭔ ${prefix}math [mode]
│⭔ ${prefix}suitpvp [@tag]
│
╰──❍

╭──❍「 *GROUP MENU* 」
│
│⭔ ${prefix}linkgroup
│⭔ ${prefix}setppgc [image]
│⭔ ${prefix}setname [text]
│⭔ ${prefix}setdesc [text]
│⭔ ${prefix}group [option]
│⭔ ${prefix}add @user
│⭔ ${prefix}kick @user
│⭔ ${prefix}hidetag [text]
│⭔ ${prefix}tagall [text]
│⭔ ${prefix}antilink [on/off]
│⭔ ${prefix}mute [on/off]
│⭔ ${prefix}promote @user
│⭔ ${prefix}demote @user
│⭔ ${prefix}vote [text]
│⭔ ${prefix}cekvote
│⭔ ${prefix}hapusvote
│
╰──❍

╭──❍「 *SEARCH MENU* 」
│
│⭔ ${prefix}play [query]
│⭔ ${prefix}yts [query]
│⭔ ${prefix}joox [query]
│⭔ ${prefix}google [query]
│⭔ ${prefix}gimage [query]
│⭔ ${prefix}pinterest [query]
│⭔ ${prefix}ytsearch [query]
│
╰──❍

╭──❍「 *STICKER MENU* 」
│
│⭔ ${prefix}attp
│⭔ ${prefix}smeme
│⭔ ${prefix}sticker
│⭔ ${prefix}ttp
│
╰──❍

╭──❍「 *VOKAL MENU* 」
│
│⭔ ${prefix}halah
│⭔ ${prefix}hilih
│⭔ ${prefix}huluh
│⭔ ${prefix}heleh
│⭔ ${prefix}holoh
│
╰──❍`

                await shann.sendButtonText(m.chat, shannBtn, shannMsg, shannMark, m)
            }
            break

            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return m.reply(bang)
                    }

                    try {
                        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await m.reply(evaled)
                    } catch (err) {
                        await m.reply(String(err))
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator) return m.reply(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if(err) return m.reply(err)
                        if (stdout) return m.reply(stdout)
                    })
                }
			
		        if (m.chat.endsWith('@s.whatsapp.net') && isCmd) {
                    this.anonymous = this.anonymous ? this.anonymous : {}
                    let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
                    
                    if (room) {
                        if (/^.*(next|leave|start)/.test(m.text)) return
                        if (['.next', '.leave', '.stop', '.start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(m.text)) return
                        let other = [room.a, room.b].find(user => user !== m.sender)
                        m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
                            contextInfo: {
                                ...m.msg.contextInfo,
                                forwardingScore: 0,
                                isForwarded: true,
                                participant: other
                            }
                        } : {})
                    }
                    return !0
                }
			
		        if (isCmd && budy.toLowerCase() != undefined) {
                    if (m.chat.endsWith('broadcast')) return
                    if (m.isBaileys) return
                    
                    let msgs = global.db.data.database
                    
                    if (!(budy.toLowerCase() in msgs)) return
                    
                    shann.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
		        }
        }
    } catch (err) {
        console.log(err)
        m.reply('Something error')
    }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})