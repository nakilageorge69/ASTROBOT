const os = require('os');
const pidusage = require('pidusage');

module.exports.config = {
		name: "monitor",
		version: "1.0.2",
		role: 0,
	        hasPermission: 1,
		credits: "GeoDevz69",
		description: "uptime",
		hasPrefix: true,
		cooldowns: 5,
		aliases: ["monitor"]
};

function byte2mb(bytes) {
		const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		let l = 0, n = parseInt(bytes, 10) || 0;
		while (n >= 1024 && ++l) n = n / 1024;
		return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

function getUptime(uptime) {
		const days = Math.floor(uptime / (3600 * 24));
		const hours = Math.floor((uptime % (3600 * 24)) / 3600);
		const mins = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);
		const cores = `Cores: ${os.cpus().length}`;

		return `Uptime: ${days} days, ${hours} hours, ${mins} minutes, and ${seconds} seconds`;
}

module.exports.run = async ({ api, event }) => {
		const time = process.uptime();
		const hours = Math.floor(time / (60 * 60));
		const minutes = Math.floor((time % (60 * 60)) / 60);
		const seconds = Math.floor(time % 60);

		const usage = await pidusage(process.pid);

		const osInfo = {
				platform: os.platform(),
				architecture: os.arch()
		};

		const timeStart = Date.now();
		const returnResult = `╭─『 𝗠𝗢𝗡𝗜𝗧𝗢𝗥 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n│ 𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Hello Master! GeoDevz69, I am still alive of about \n│ ✧ ${hours} hour(s) \n│ ✧ ${minutes} minute(s) \n│ ✧ ${seconds} second(s).\n│ ✧ CPU Usage: ${usage.cpu.toFixed(1)}%\n│ ✧ RAM Usage: ${byte2mb(usage.memory)}\n│ ✧ Cores: ${os.cpus().length}\n│ ✧ Ping: ${Date.now() - timeStart}ms\n│ ✧ Operating System Platform: ${osInfo.platform}\n│ ✧ System CPU Architecture: ${osInfo.architecture}\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 𝙵𝙾𝚁 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`;

		return api.sendMessage(returnResult, event.threadID, event.messageID);
};
