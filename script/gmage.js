const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports.config = {
  name: "gmage",
  version: "1.0.0",
  hasPermission: 0,
  aliases: ["gmage"],
  credits: "coffee",
  description: "Search Google Images.",
  commandCategory: "tools",
  usages: "-gmage <search_query>",
  cooldowns: 0,
};

const API_KEY = 'AIzaSyC_gYM4M6Fp1AOYra_K_-USs0SgrFI08V0';
const SEARCH_ENGINE_ID = 'e01c6428089ea4702';
const MAX_IMAGES = 9;

const badWords = new Set(["gay", "add more"]);

module.exports.run = async function ({ api, event, args }) {
  const senderId = event.senderID;
  const searchQuery = args.join(' ').trim();

  if (!searchQuery) {
    return api.sendMessage('📷 | Format: -gmage <search_query>', event.threadID, event.messageID);
  }
  
  if (containsBadWords(searchQuery)) {
    return api.sendMessage('❎ | NSFW Prompt Detected', event.threadID, event.messageID);
  }

  try {
    const imageUrls = await fetchImageUrls(searchQuery);
    if (!imageUrls.length) {
      return api.sendMessage(`📷 | No images found for "${searchQuery}".`, event.threadID, event.messageID);
    }

    for (const url of imageUrls) {
      await sendImage(senderId, url, api);
    }

  } catch {
    api.sendMessage('📷 | Can\'t get your images atm, do try again later...', event.threadID, event.messageID);
  }
};

async function fetchImageUrls(query) {
  const { data } = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
    params: {
      key: API_KEY,
      cx: SEARCH_ENGINE_ID,
      q: query,
      searchType: 'image',
      num: MAX_IMAGES
    }
  });
  return data.items ? data.items.map(item => item.link) : [];
}

async function sendImage(senderId, url, api) {
  return api.sendMessage({ attachment: { type: 'image', payload: { url } } }, senderId);
}

function containsBadWords(query) {
  return [...badWords].some(badWord => query.toLowerCase().includes(badWord));
    }
