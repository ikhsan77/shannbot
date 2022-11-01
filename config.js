const fs = require('fs')
const chalk = require('chalk')

// REST APIs
global.APIs = {
	lolhuman: 'https://api.lolhuman.xyz/api'
}

// Apikey REST APIs
global.APIKeys = {
	'https://api.lolhuman.xyz/api': 'SHANNBot-APIKEY'
}

// Owner
global.owner = ['6285781183473', '6287872629912', '6288809276695']
global.ownernomer = "6285781183473"
global.ikhsan77 = ['6285781183473']

// Sticker
global.packname = 'Fajarara'
global.author = '@shannbot.ofc'

// Session
global.sessionName = 'shanndev'

// Prefix
global.prefa = ['','!','.','#','&']
global.sp = ''

// Error Message
global.mess = {
    success: 'Done',
    admin: 'Admin Only',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    premium: 'Fitur Khusus Premium Kalo Mau Daftar Ketik Sewa',
    owner: 'Owner Only',
    group: 'Group Only',
    private: 'Private Chat Only',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: '_wait a minute_',
}

global.thumb = fs.readFileSync('./lib/hisoka-moro.png')
global.vaze = { url: 'https://telegra.ph/file/15209657f9d4f59c7ca1e.mp4' }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
