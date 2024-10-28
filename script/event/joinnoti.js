const { OnChat, font } = require('chatbox-utility');

let joinNotificationEnabled = true;

module.exports["config"] = {
    name: "joinnoti",
    info: "Enables or disables join notifications for new members joining the group.",
    credits: "GeoDevz69",
    version: "1.0.0 still beta",
    usage: "[on/off]",
};

module.exports["handleEvent"] = async ({
    event, api, prefix
}) => {
    const chat = new OnChat(api, event);
    try {
        const mono = txt => font.monospace(txt);

        if (!joinNotificationEnabled) return;

        const getOrdinalSuffix = number => {
            const lastDigit = number % 10;
            const lastTwoDigits = number % 100;
            if (lastDigit === 1 && lastTwoDigits !== 11) return "st";
            if (lastDigit === 2 && lastTwoDigits !== 12) return "nd";
            if (lastDigit === 3 && lastTwoDigits !== 13) return "rd";
            return "th";
        };

        const groupInfo = await chat.threadInfo(event.threadID);
        if (!groupInfo) {
            console.error("Error: groupInfo is undefined");
            return;
        }

        const { logMessageType, logMessageData } = event;

        if (logMessageType === "log:subscribe") {
            const joinedUserId = logMessageData?.addedParticipants?.[0]?.userFbId;
            if (!joinedUserId) return;

            if (joinedUserId === chat.botID()) {
            
                await chat.contact(mono(`╭─『 𝗝𝗢𝗜𝗡 𝗡𝗢𝗪 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Bot connected successfully to ${groupInfo?.name || "Group Chat"}\n\nGet started with "HELP" to see more commands.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`));
                await chat.nickname(`${font.bold("Meta AI")} ${mono(`> [${prefix || "No Prefix"}]`)}`, chat.botID());
            } else {
                const name = await chat.userName(joinedUserId);
                const memberCount = groupInfo?.participantIDs?.length || event?.participantIDs?.length;

                const message = memberCount !== undefined && memberCount !== null
                    ? `╭─『 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Welcome ${name || "facebook user"} to ${groupInfo?.name || "Our Group"}! You're the ${memberCount}${getOrdinalSuffix(memberCount)} member.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`
                    : `╭─『 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Welcome ${name || "facebook user"} to our group! Please enjoy your stay.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`;

                chat.reply({ body: message, attachment: await chat.stream("https://i.imgur.com/oEvEpyN.gif")
                });
            }
        } else if (logMessageType === "log:unsubscribe") {
            const leftParticipantFbId = logMessageData?.leftParticipantFbId;
            if (!leftParticipantFbId) return;

            const name = await chat.userName(leftParticipantFbId);
            const type = event.author === leftParticipantFbId ? "left by itself" : "has been kicked by the administrator";
            chat.contact(mono(`╭─『 𝗚𝗢𝗢𝗗𝗕𝗬𝗘 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Oops! ${name || "facebook user"} ${type}. We'll miss you.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`), leftParticipantFbId);
        }
    } catch (error) {
        console.error("Error handling event:", error);
    }
};

module.exports["run"] = async ({
    args, event
}) => {
    const chat = new OnChat(api, event);
    const mono = txt => font.monospace(txt);
    const command = args.join(" ").trim().toLowerCase();

    if (command === "on" || command === "off") {
        joinNotificationEnabled = command === "on";
        await chat.reply(mono(`Join notifications are now ${joinNotificationEnabled ? "enabled" : "disabled"}`));
    } else {
        await chat.reply(mono("Type 'on' to enable join notifications or 'off' to disable them."));
    }
};
