const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
    name: "removebg",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Jonell Magallanes",
    description: "Remove background from an image",
    usePrefix: false,
    commandCategory: "Image Processing",
    cooldowns: 2,
};

module.exports.run = async function ({ api, event }) {
    const { threadID, messageID, messageReply } = event;
    const pathie = './cmds/cache/removed_bg.png';

    // Get photo link from the replied message or args
    const photoLink = messageReply?.attachments?.[0]?.url || args.join(" ");

    if (!photoLink) {
        return api.sendMessage("❎ | Please reply to a photo or provide an image URL.", threadID, messageID);
    }

    try {
        api.sendMessage("⏳ Removing...", threadID, messageID);

        const response = await axios.get(`https://jonellccapisprojectv2-a62001f39859.herokuapp.com/api/rbg?imageUrl=${encodeURIComponent(photoLink)}`);
        const removedBgImageUrl = response.data.image_data;

        const imgResponse = await axios.get(removedBgImageUrl, { responseType: "stream" });

        const writeStream = fs.createWriteStream(pathie);
        imgResponse.data.pipe(writeStream);

        writeStream.on('finish', () => {
            api.sendMessage({
                body: "✅ | Background removed successfully.",
                attachment: fs.createReadStream(pathie)
            }, threadID, () => fs.unlinkSync(pathie), messageID);
        });
    } catch (error) {
        console.error('Error removing background:', error);
        api.sendMessage(`❎ | Error removing background: ${error.message}`, threadID, messageID);
    }
};
