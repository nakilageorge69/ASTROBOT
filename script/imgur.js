const axios = require('axios');

module.exports.config = {
	name: "imgur",
	version: "1.0.0",
	role: 0,
	hasPrefix: false,
	credits: "GeoDevz69", //from fca 
	description: "upload to imgur",
	usages: "imgur reply image,video,png,jpg",
	cooldown: 0,
};

class Imgur {
	constructor() {
		this.clientId = "fc9369e9aea767c";
		this.client = axios.create({
			baseURL: "https://api.imgur.com/3/",
			headers: {
				Authorization: `Client-ID ${this.clientId}`
			}
		});
	}
	async uploadImage(url) {
		try {
			const response = await this.client.post("image", { image: url });
			return response.data.data.link;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to upload image to Imgur");
		}
	}
}

module.exports.run = async function ({ api, event }) {
	const imgur = new Imgur();
	const array = [];

	if (event.type !== "message_reply" || event.messageReply.attachments.length === 0) {
		return api.sendMessage("Please reply with the photo/video/gif that you need to upload", event.threadID, event.messageID);
	}

	for (const { url } of event.messageReply.attachments) {
		try {
			const res = await imgur.uploadImage(url);
			array.push(res);
		} catch (err) {
			console.error(err);
		}
	}

	return api.sendMessage(`╭─『 𝗜𝗠𝗚/𝗟𝗜𝗡𝗞 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n✧ Success Uploads: ${array.length}\n✧ Failed Uploads: ${event.messageReply.attachments.length - array.length}\n✧ Image link Here: \n${array.join("\n")}\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`, event.threadID, event.messageID);
};
