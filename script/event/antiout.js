let antiOutEnabled = true;

const { OnChat, font } = require('chatbox-utility');

module.exports["config"] = {
    name: "antiout",
    aliases: ["antiout"],
    info: "Prevents user or members from leaving the group.",
    version: "1.0.1",
    credits: "GeoDevz69",
    usage: "[on/off]",
};

const fs = require("fs").promises;
const filePath = './data/history.json';

module.exports["handleEvent"] = async ({ event, api }) => {
    const chat = new OnChat(api, event);
    var mono = txt => font.monospace(txt);

    if (!antiOutEnabled) return;

    var nagleft = event.logMessageData?.leftParticipantFbId;

    if (!nagleft) return;

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const bots = JSON.parse(data);
        const botIDs = bots.map(bot => bot.userid);
        const threadInfo = await chat.threadInfo(event.threadID);

        if (botIDs.includes(nagleft) || nagleft === api.getCurrentUserID()) {
            return;
        }

        const info = await api.getUserInfo(event.logMessageData.leftParticipantFbId);
        const userInfo = info[event.logMessageData.leftParticipantFbId];
        if (!userInfo) {
            console.error("User info not found for left participant.");
            return;
        }
        const { name } = userInfo;
        const attachment = await chat.stream("https://i.imgur.com/oTcMvWV.gif");

        api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error) => {
            if (error) {
                api.sendMessage(mono(`╭─『 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Unable Unable to re-add member ${name} to the group!\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`, event), event.threadID);
            } else {
                api.sendMessage({ body: mono(`╭─『 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Unable Active anti-out mode, ${name} has been re-added to the group successfully!\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`, event), attachment }, event.threadID);
            }
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports["run"] = async ({ args, api, event }) => {
    const chat = new OnChat(api, event);
    var mono = txt => font.monospace(txt);
    const command = args.join(" ").trim().toLowerCase();

    if (command === "on") {
        antiOutEnabled = true;
        chat.reply(mono("╭─『 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Unable Anti out mode is now enabled.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧"));
    } else if (command === "off") {
        antiOutEnabled = false;
        chat.reply(mono("╭─『 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Unable Anti out mode is now disabled.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧"));
    } else {
        chat.reply(mono("╭─『 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Unable Type 'on' to enable anti out mode or 'off' to disable it.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧"));
    }
};
