const { OnChat, font } = require('chatbox-utility');

module.exports["config"] = {
    name: "rules",
    aliases: ["rule"],
    isPrefix: false,
    info: "BOT GC RULES AND SIMPLE RULES",
    credits: "GeoDevz69",
    cd: 5
};

module.exports["run"] = async ({ api, event }) => {
    const chat = new OnChat(api, event);
    
if (!event.isGroup) return chat.reply(font.bold("╭─『 𝗚𝗖 𝗥𝗨𝗟𝗘𝗦 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚: Avoid Spamming and Abuse CMDS. to prevent getting banned from chatbot.\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 𝙵𝙾𝚁 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧"));

const rules = `╭─『 𝗚𝗖 𝗥𝗨𝗟𝗘𝗦 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙍𝙚𝙨𝙥𝙤𝙣𝙨𝙚:\n
𝟭. 𝗡𝗼 𝗣𝗼𝗿𝗻𝗼𝗴𝗿𝗮𝗽𝗵𝗶𝗲𝘀: Ang pag sesend ng bastos na larawan o pag-uusap ng kalaswahan ay mahigpit na ipinagbabawal. 

𝟮. 𝗗𝗼𝗻'𝘁 𝗦𝗽𝗮𝗺 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: Mahigpit na ipinagbabawal ang pag eespam ng commands upang maiwasan ang pagkasira ng bot account. 

𝟯. 𝗗𝗼𝗻'𝘁 𝗕𝗲 𝗟𝗮𝘇𝘆: Sa GroupChat na ito open lahat kayong mag tanong pero di ibig sabihin na iasa nyo nalang sa iba yong tungkulin nyo bilang mag aaral dapat active sa pag-aaral bawal tamad. 

𝟰. 𝗡𝗼 𝗕𝗮𝗱𝘄𝗼𝗿𝗱𝘀 & 𝗙𝗹𝗼𝗼𝗱𝗟𝗶𝗸𝗲𝘀: Ipinagbabawal ang pag mumura at pagla-likezone sa gc upang di masipa ng admin o moderator. 

𝟱. 𝗥𝗲𝘀𝗽𝗲𝗰𝘁 𝗘𝘃𝗲𝗿𝘆𝗼𝗻𝗲𝘀 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝘀: Always be kind, humble and respectful. No insults or negative comments. Then huwag tawanan ang anumang tanong sa halip ang magtulungan.\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉ 𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 𝙵𝙾𝚁 𝙰𝙳𝙼𝙸𝙽 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`;
chat.reply({ body: font.thin(rules), attachment: await chat.stream("https://i.imgur.com/qWY2oxw.gif") });
};
