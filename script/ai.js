const axios = require('axios');

module.exports.config = {
    name: 'ai',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: [
              'hi',
              'define',
              'magbigay',
              'ipaliwanag',
              'answer',
              'bro',
              'low',
              'loe',
              'how',
              'identify',
              'give',
              'provide',
              'choose',
              'which',
              'magbigay',
              'make',
              'gumawa',
              'sagutin',
              'evaluate',
              'hello',
              'meta',
              'boss',
              'what',
              'who',
              'where',
              'why',
              'when',
              'ask',
              'arlene',
              'gpt',
              'is',
              'ano',
              'paano',
              'gaano',
              'kailan',
              'saan',
              'sino',
              'tol',
              'bot',
              'guys',
              'yo',
              'george',
              'loy',
              'admin',
              'hoy',
              'kol',
              'hey',],
    description: 'Interact with the Hercai AI',
    usage: 'math [question]',
    credits: 'GeoDevz69',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const question = args.join(' ');

    if (!question) {
        return api.sendMessage('╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙂𝙪𝙞𝙙𝙚: Please provide a question, for example: meta define happiness?\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧', event.threadID, event.messageID);
    }

    const initialMessage = await new Promise((resolve, reject) => {
        api.sendMessage({
            body: '💬 Answering...',
            mentions: [{ tag: event.senderID, id: event.senderID }],
        }, event.threadID, (err, info) => {
            if (err) return reject(err);
            resolve(info);
        }, event.messageID);
    });

    try {
        const response = await axios.get('https://kaiz-apis.gleeze.com/v3/hercai', {
            params: { question }
        });
        const aiResponse = response.data;
        const responseString = aiResponse.reply ? aiResponse.reply : 'No result found.';

        const formattedResponse = `╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝘼𝙣𝙨𝙬𝙚𝙧: ${responseString}\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`;

        await api.editMessage(formattedResponse.trim(), initialMessage.messageID);

    } catch (error) {
        console.error('Error:', error);
        await api.editMessage('╭─『 𝗧𝗘𝗫𝗧𝗦 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\nAn error occurred, please try again later.\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝚃𝙴𝚇𝚃 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧', initialMessage.messageID);
    }
};
