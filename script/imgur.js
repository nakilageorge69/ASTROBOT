const axios = require('axios');

module.exports.config = {
    name: "imgur",
    version: "1.0.0",
    role: 1,
    hasPrefix: false,
    credits: "cliff", //from fca 
    description: "upload to imgur",
    usages: "imgur reply image, video, png, jpg",
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
            throw new Error(error.message || "SOMETHING WENT WRONG!");
        }
    }

    async fetchImgurLink(linkanh) {
        const { data } = await axios.get(`https://sampleapi-mraikero-01.vercel.app/get/imgur?url=${encodeURIComponent(linkanh)}`);
        return data.result.link;
    }
}

module.exports.run = async function ({ api, event }) {
    const imgur = new Imgur();
    const array = [];

    if (event.type !== "message_reply" || event.messageReply.attachments.length === 0) {
        return api.sendMessage("Please reply this command to the gif/photo you wanted to convert.", event.threadID, event.messageID);
    }

    for (const { url } of event.messageReply.attachments) {
        try {
            // Fetching the imgur link via the new method
            const imgurLink = await imgur.fetchImgurLink(url);
            array.push(imgurLink);
        } catch (err) {
            console.error(err);
        }
    }

    return api.sendMessage(`╭─『 𝗜𝗠𝗚/𝗟𝗜𝗡𝗞 』✧✧✧
╰✧✧✧───────────✧
╭✧✧✧───────────✧
✅ Success Uploads: ${array.length}
❌ Failed Uploads: ${event.messageReply.attachments.length - array.length}
🏷️ Image link:
${array.join("\n")}
╰─────────────✧✧✧
◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.
◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!
╭✧✧✧───────────✧
    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«
https://www.facebook.com/geotechph.net
╰─────────────✧✧✧`, event.threadID, event.messageID);
};
