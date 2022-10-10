const fs = require('fs')
const chalk = require('chalk')

// Website Api
global.APIs = {
	zenz: 'https://zenzapis.xyz',
	lolhuman: 'https://api.lolhuman.xyz/api'
}

// Apikey Website Api
global.APIKeys = {
	'https://zenzapis.xyz': '0e92565522',
	'https://api.lolhuman.xyz/api': 'SHANNBot-APIKEY'
}

// Other
global.owner = ['6285781183473', '6287872629912', '6288809276695']
global.ownernomer = "6285781183473"
global.premium = ['6287872629912']
global.ikhsan77 = ['6285781183473']
global.packname = 'Fajarara'
global.author = '@Raasand_'
global.sessionName = 'shanndev'
global.prefa = ['','!','.','#','&']
global.sp = ''
global.mess = {
    success: 'Done',
    admin: 'Admin Only',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    premime: 'Fitur Khusus Premium Kalo Mau Daftar Ketik Sewa',
    owner: 'Owner Only',
    group: 'Group Only',
    private: 'Private Chat Only',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: 'Wait',
    endLimit: 'Limit habis',
}
global.limitawal = {
    premium: "Infinity",
    free: "Infinity"
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
