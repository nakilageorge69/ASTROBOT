module.exports.config = {
    name: "owner",
    version: "1.0.0",
    credits: "GeoDevz69",
    description: "Share Contact",
    hasPrefix: true,
    usage: "[id/reply/mention]",
    accessableby: 0
};

module.exports.run = async function ({ api, event, args }) {
    const { messageReply, senderID, threadID, mentions } = event;

    if (senderID == api.getCurrentUserID()) return;

    try {
        let userID;

        if (Object.keys(mentions).length > 0) {
            userID = Object.keys(mentions)[0];
        } else if (args.length > 0) {
            userID = args[0];
        } else if (messageReply) {
            userID = messageReply.senderID;
        } else {
            userID = senderID;
        }

        api.shareContact("", userID, threadID);
    } catch (e) {
        api.sendMessage(e.message, threadID, event.messageID);
    }
};
