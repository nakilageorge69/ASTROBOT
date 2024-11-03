module.exports.config = {
	name: "tiktokg",
	version: "1.0.0",
	role: 1,
	credits: "GeoDevz69",
	description: "Generate a random tiktok video.",
	usages: "[]",
	cooldown: 0,
	hasPrefix: false,
};

module.exports. run = async ({ api, event, args }) => {

	api.setMessageReaction("⏳", event.messageID, (err) => {
		 }, true);
api.sendTypingIndicator(event.threadID, true);

	const { messageID, threadID } = event;
	const fs = require("fs");
	const axios = require("axios");
	const request = require("request");
	const prompt = args.join(" ");

	if (!prompt[0]) { api.sendMessage("Downloading...", threadID, messageID);
		}

 try {
	const response = await axios.post(`https://shoti-srv1.onrender.com/api/v1/get`, { apikey: `$shoti-1hg4gifgnlfdmeslom8` });

	let path = __dirname + `/cache/shoti.mp4`;
	const file = fs.createWriteStream(path);
	const rqs = request(encodeURI(response.data.data.url));
	rqs.pipe(file);
	file.on(`finish`, () => {
		 setTimeout(function() {
			 api.setMessageReaction("✅", event.messageID, (err) => {
					}, true);
			return api.sendMessage({
			body: `╭─『 𝗧𝗜𝗞𝗧𝗢𝗞𝗚 』✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙪𝙡𝙩:\n※ 𝖴𝗌𝖾𝗋𝗇𝖺𝗆𝖾 : @${response.data.data.user.username}\n※ 𝖭𝗂𝖼𝗄𝗇𝖺𝗆𝖾 : ${response.data.data.user.nickname}\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`, 
			attachment: fs.createReadStream(path)
		}, threadID);
			}, 5000);
				});
	file.on(`error`, (err) => {
			api.sendMessage(`Error: ${err}`, threadID, messageID);
	});
	 } catch (err) {
		api.sendMessage(`Error: ${err}`, threadID, messageID);
	};
};
