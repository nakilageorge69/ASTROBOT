const axios = require('axios');

module.exports.config = {
    name: "imgur",
    version: "1.0.0",
    role: 0,
    hasPrefix: false,
    credits: "GeoDevz69",
    description: "Upload images/videos to Imgur",
    usages: "imgur reply image, video, png, jpg",
    cooldown: 0,
};

class Imgur {
    constructor() {
        this.clientId = "fc9369e9aea767c";
        this.client = axios.create({
            baseURL: "https://api.imgur.com/3/",
            headers: {
                Authorization: `Client-ID ${this.clientId}`,
            },
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
    const uploadedLinks = [];

    if (event.type !== "message_reply" || !event.messageReply.attachments.length) {
        return api.sendMessage("Please reply with the photo/video/gif that you need to upload.", event.threadID, event.messageID);
    }

    for (const attachment of event.messageReply.attachments) {
        const { url } = attachment;

        try {
            const link = await imgur.uploadImage(url);
            uploadedLinks.push(link);
        } catch (err) {
            console.error(err);
        }
    }

    const failedUploads = event.messageReply.attachments.length - uploadedLinks.length;

    return api.sendMessage(`╭─『 𝗜𝗠𝗚/𝗟𝗜𝗡𝗞 』✧✧✧
╰✧✧✧───────────✧
╭✧✧✧───────────✧
✧ Success Uploads: ${uploadedLinks.length}
✧ Failed Uploads: ${failedUploads}
✧ Image Links: 
${uploadedLinks.join("\n") || "No images uploaded."}
╰─────────────✧✧✧
◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.
◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!
╭✧✧✧───────────✧
    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«
https://www.facebook.com/geotechph.net
╰─────────────✧✧✧`, event.threadID, event.messageID);
};
