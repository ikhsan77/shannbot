let conf = require('./config.json')

const { default: shannConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState(`./${conf.sessionName}.json`)
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const _ = require('lodash')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/converter/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in conf.api ? conf.api[name].url : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: conf.api[name].apikey } : {}) })) : '')

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

async function shannStart() {
    const shann = shannConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['SHANNBot-MD', 'Safari', '1.0.0'],
        auth: state
    })

    store.bind(shann.ev)

    shann.ws.on('CB:call', async (json) => {
        const callerId = json.content[0].attrs['call-creator']
        if (json.content[0].tag == 'offer') {
            let shannCaller  = await shann.sendContact(callerId, conf.owner.creator)
            shann.sendMessage(callerId, { text: `Jangan menelepon!` }, { quoted: shannCaller })

            await sleep(8000)
            await shann.updateBlockStatus(callerId, "block")
        }
    })

    shann.ev.on('messages.upsert', async chatUpdate => {
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return

            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message

            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return

            m = smsg(shann, mek, store)
            require("./handler")(shann, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

    shann.ev.on('groups.update', async pea => {
        try {
            ppgc = await shann.profilePictureUrl(pea[0].id, 'image')
        } catch {
            ppgc = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
        }

        let profileGroup = { url: ppgc }

        if (pea[0].announce == true) {
            shann.send5ButImg(pea[0].id, `「 *Group Settings Change* 」\n\nGroup telah ditutup oleh admin, Sekarang hanya admin yang dapat mengirim pesan !`, `Group Settings Change Message by IKHSAN77`, profileGroup, [])
        } else if (pea[0].announce == false) {
            shann.send5ButImg(pea[0].id, `「 *Group Settings Change* 」\n\nGroup telah dibuka oleh admin, Sekarang peserta dapat mengirim pesan !`, `Group Settings Change Message by IKHSAN77`, profileGroup, [])
        } else if (pea[0].restrict == true) {
            shann.send5ButImg(pea[0].id, `「 *Group Settings Change* 」\n\nInfo group telah dibatasi, Sekarang hanya admin yang dapat mengedit info group !`, `Group Settings Change Message by IKHSAN77`, profileGroup, [])
        } else if (pea[0].restrict == false) {
            shann.send5ButImg(pea[0].id, `「 *Group Settings Change* 」\n\nInfo group telah dibuka, Sekarang peserta dapat mengedit info group !`, `Group Settings Change Message by IKHSAN77`, profileGroup, [])
        } else {
            shann.send5ButImg(pea[0].id, `「 *Group Settings Change* 」\n\nGroup Subject telah diganti menjadi *${pea[0].subject}*`, `Group Settings Change Message by IKHSAN77`, profileGroup, [])
        }
    })

    shann.ev.on('group-participants.update', async (anu) => {
        try {
            let metadata = await shann.groupMetadata(anu.id)
            let participants = anu.participants

            for (let num of participants) {
                // Get Profile User
                try {
                    ppuser = await shann.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

                // Get Profile Group
                try {
                    ppgroup = await shann.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

                if (anu.action == 'add') {
                    shann.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `Welcome to ${metadata.subject} @${num.split("@")[0]}` })
                } else if (anu.action == 'remove') {
                    shann.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `@${num.split("@")[0]} Leaving to ${metadata.subject}` })
                }
            }
        } catch (err) {
            console.log(err)
        }
    })

    // Setting
    shann.decodeJid = (jid) => {
        if (!jid) return jid

        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    shann.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = shann.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    shann.getName = (jid, withoutContact = false) => {
        id = shann.decodeJid(jid)
        withoutContact = shann.withoutContact || withoutContact
        let v

        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = shann.groupMetadata(id) || {}

            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === shann.decodeJid(shann.user.id) ? shann.user : (store.contacts[id] || {})

        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    shann.sendContact = async (jid, kon, quoted = '', opts = {}) => {
        let list = []
        for (let i of kon) {
            list.push({
                displayName: await shann.getName(i + '@s.whatsapp.net'),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await shann.getName(i + '@s.whatsapp.net')}\nFN:${await shann.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:shannbot@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/raasand_\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
            })
        }

        shann.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }

    shann.setStatus = (status) => {
        shann.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })

        return status
    }

    shann.serializeM = (m) => smsg(shann, m, store)

    shann.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update

        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode

            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); shann.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); shannStart(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); shannStart(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); shann.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); shann.logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); shannStart(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); shannStart(); }
            else shann.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }

        console.log('Connected...', update)
    })

    shann.ev.on('creds.update', saveState)

    // Add Other

    /**
    *
    * @param {*} jid
    * @param {*} url
    * @param {*} caption
    * @param {*} quoted
    * @param {*} options
    */
    shann.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
        let mime = '';
        let res = await axios.head(url)
        mime = res.headers['content-type']

        if (mime.split("/")[1] === "gif") {
            return shann.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
        }

        let type = mime.split("/")[0] + "Message"

        if (mime === "application/pdf") {
            return shann.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
        }

        if (mime.split("/")[0] === "image") {
            return shann.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
        }

        if (mime.split("/")[0] === "video") {
            return shann.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
        }

        if (mime.split("/")[0] === "audio") {
            return shann.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
        }
    }

    /** Send List Messaage
    *
    *@param {*} jid
    *@param {*} text
    *@param {*} footer
    *@param {*} title
    *@param {*} butText
    *@param [*] sections
    *@param {*} quoted
    */
    shann.sendListMsg = (jid, text = '', footer = '', title = '', butText = '', sects = [], quoted) => {
        let sections = sects
        var listMes = {
            text: text,
            footer: footer,
            title: title,
            buttonText: butText,
            sections
        }

        shann.sendMessage(jid, listMes, { quoted: quoted })
    }

    /** Send Button 5 Message
    * 
    * @param {*} jid
    * @param {*} text
    * @param {*} footer
    * @param {*} button
    * @returns 
    */
    shann.send5ButMsg = (jid, text = '', footer = '', but = []) => {
        let templateButtons = but
        var templateMessage = {
            text: text,
            footer: footer,
            templateButtons: templateButtons
        }

        shann.sendMessage(jid, templateMessage)
    }

    /** Send Button 5 Image
    *
    * @param {*} jid
    * @param {*} text
    * @param {*} footer
    * @param {*} image
    * @param [*] button
    * @param {*} options
    * @returns
    */
    shann.send5ButImg = async (jid, text = '', footer = '', img, but = [], options = {}) => {
        let message = await prepareWAMessageMedia({ image: img }, { upload: shann.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
            templateMessage: {
                hydratedTemplate: {
                    imageMessage: message.imageMessage,
                    "hydratedContentText": text,
                    "hydratedFooterText": footer,
                    "hydratedButtons": but
                }
            }
        }), options)

        shann.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /** Send Button 5 Video
    *
    * @param {*} jid
    * @param {*} text
    * @param {*} footer
    * @param {*} Video
    * @param [*] button
    * @param {*} options
    * @returns
    */
    shann.send5ButVid = async (jid, text = '', footer = '', vid, but = [], options = {}) => {
        let message = await prepareWAMessageMedia({ video: vid }, { upload: shann.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
            templateMessage: {
                hydratedTemplate: {
                    videoMessage: message.videoMessage,
                    "hydratedContentText": text,
                    "hydratedFooterText": footer,
                    "hydratedButtons": but
                }
            }
        }), options)

        shann.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /** Send Button 5 Gif
    *
    * @param {*} jid
    * @param {*} text
    * @param {*} footer
    * @param {*} Gif
    * @param [*] button
    * @param {*} options
    * @returns
    */
    shann.send5ButGif = async (jid, text = '', footer = '', gif, but = [], options = {}) => {
        let message = await prepareWAMessageMedia({ video: gif, gifPlayback: true }, { upload: shann.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
            templateMessage: {
                hydratedTemplate: {
                    videoMessage: message.videoMessage,
                    "hydratedContentText": text,
                    "hydratedFooterText": footer,
                    "hydratedButtons": but
                }
            }
        }), options)

        shann.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /**
    * 
    * @param {*} jid 
    * @param {*} buttons 
    * @param {*} caption 
    * @param {*} footer 
    * @param {*} quoted 
    * @param {*} options 
    */
    shann.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }

        shann.sendMessage(jid, buttonMessage, { quoted, ...options })
    }

    /**
    * 
    * @param {*} jid 
    * @param {*} text 
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
    shann.sendText = (jid, text, quoted = '', options) => shann.sendMessage(jid, { text: text, ...options }, { quoted })

    /**
    * 
    * @param {*} jid 
    * @param {*} path 
    * @param {*} caption 
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
    shann.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)

        return await shann.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    /**
    * 
    * @param {*} jid 
    * @param {*} path 
    * @param {*} caption 
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
    shann.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)

        return await shann.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    /**
    * 
    * @param {*} jid 
    * @param {*} path 
    * @param {*} quoted 
    * @param {*} mime 
    * @param {*} options 
    * @returns 
    */
    shann.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)

        return await shann.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    /**
    * 
    * @param {*} jid 
    * @param {*} text 
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
    shann.sendTextWithMentions = async (jid, text, quoted, options = {}) => shann.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    /**
    * 
    * @param {*} jid 
    * @param {*} path 
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
    shann.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer

        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await shann.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
    * 
    * @param {*} jid 
    * @param {*} path 
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
    shann.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer

        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await shann.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
    * 
    * @param {*} message 
    * @param {*} filename 
    * @param {*} attachExtension 
    * @returns 
    */
    shann.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]

        const stream = await downloadContentFromMessage(quoted, messageType)

        let buffer = Buffer.from([])

        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename

        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    shann.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]

        const stream = await downloadContentFromMessage(message, messageType)

        let buffer = Buffer.from([])

        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }

    /**
    * 
    * @param {*} jid 
    * @param {*} path 
    * @param {*} filename
    * @param {*} caption
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
    shann.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await shann.getFile(path, true)
        let { mime, ext, res, data, filename } = types

        if (res && res.status !== 200 || file.length <= 65536) {
            try { throw { json: JSON.parse(file.toString()) } }
            catch (e) { if (e.json) throw e.json }
        }

        let type = '', mimetype = mime, pathFile = filename

        if (options.asDocument) type = 'document'
        if (options.asSticker || /webp/.test(mime)) {
            let { writeExif } = require('./lib/exif')
            let media = { mimetype: mime, data }

            pathFile = await writeExif(media, { packname: options.packname ? options.packname : conf.sticker.packname, author: options.author ? options.author : conf.sticker.packname, categories: options.categories ? options.categories : [] })
            await fs.promises.unlink(filename)

            type = 'sticker'
            mimetype = 'image/webp'
        }
        else if (/image/.test(mime)) type = 'image'
        else if (/video/.test(mime)) type = 'video'
        else if (/audio/.test(mime)) type = 'audio'
        else type = 'document'

        await shann.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
        return fs.promises.unlink(pathFile)
    }

    /**
    * 
    * @param {*} jid 
    * @param {*} message 
    * @param {*} forceForward 
    * @param {*} options 
    * @returns 
    */
    shann.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype

        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}

        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }

        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})

        await shann.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
        return waMessage
    }

    shann.cMod = (jid, copy, text = '', sender = shann.user.id, options = {}) => {
        let mtype = Object.keys(copy.message)[0]
        let isEphemeral = mtype === 'ephemeralMessage'

        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }

        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
        let content = msg[mtype]

        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text

        if (typeof content !== 'string') msg[mtype] = {
            ...content,
            ...options
        }

        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant

        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid

        copy.key.remoteJid = jid
        copy.key.fromMe = sender === shann.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }


    /**
    * 
    * @param {*} path 
    * @returns 
    */
    shann.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }

        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)

        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
            size: await getSizeMedia(data),
            ...type,
            data
        }
    }
    return shann
}

shannStart()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})