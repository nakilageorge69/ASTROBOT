module.exports.config = {
  name: "spamkick",
  eventType: ["log:unsubscribe", "message"],
  version: "1.3.0",
  role: 0,
  description: "Detect and handle spammers",
  cooldowns: 0,
};

let messageCounts = {};
let spamDetectionEnabled = true;
const spamThreshold = 30; // Maximum messages allowed within the interval
const spamInterval = 60000; // 1 minute (in milliseconds)

// Protected user IDs
const protectedUserIDs = ["61565804833303", ""]; 

// Protected usernames
const protectedUsernames = ["", "VIP.User.2"];

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID } = event;

  // Exit if spam detection is disabled
  if (!spamDetectionEnabled) return;

  // Get user info to fetch username
  const userInfo = await api.getUserInfo(senderID);
  const username = userInfo[senderID]?.vanity || null;

  // Check if user is protected by ID or username
  if (protectedUserIDs.includes(senderID.toString()) || protectedUsernames.includes(username)) {
    console.log(`Protected user detected: ${username || senderID}`);
    return;
  }

  // Initialize message counts for the thread
  if (!messageCounts[threadID]) {
    messageCounts[threadID] = {};
  }

  // Initialize message counts for the user
  if (!messageCounts[threadID][senderID]) {
    messageCounts[threadID][senderID] = {
      count: 1,
      timer: setTimeout(() => {
        delete messageCounts[threadID][senderID]; // Reset spam data after interval
      }, spamInterval),
    };
  } else {
    // Increment message count for the user
    messageCounts[threadID][senderID].count++;

    const spamCount = messageCounts[threadID][senderID].count;

    const userName = userInfo[senderID]?.fullName || "User";

    // Send warnings at specific message counts
    if (spamCount === 10 || spamCount === 20) {
      api.sendMessage(
        `⚠️ [𝗪𝗔𝗥𝗡𝗜𝗡𝗚: 𝗦𝗣𝗔𝗠𝗠𝗘𝗥]  
        **𝗬𝗼𝘂 𝗮𝗿𝗲 𝗦𝗘𝗡𝗗𝗜𝗡𝗚 𝗠𝗘𝗦𝗦𝗔𝗚𝗘𝗦 𝗧𝗢𝗢 𝗤𝗨𝗜𝗖𝗞𝗟𝗬, ${userName}! 𝗧𝗵𝗶𝘀 𝗶𝘀 𝘆𝗼𝘂𝗿 𝘄𝗮𝗿𝗻𝗶𝗻𝗴.**  
        **𝗬𝗼𝘂 𝗵𝗮𝘃𝗲 𝘀𝗲𝗻𝘁 ${spamCount} 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀 𝗶𝗻 ${spamInterval / 1000} 𝘀𝗲𝗰𝗼𝗻𝗱𝘀.**  
        **𝗣𝗹𝗲𝗮𝘀𝗲 𝘀𝗹𝗼𝘄 𝗱𝗼𝘄𝗻 𝘁𝗼 𝗮𝘃𝗼𝗶𝗱 𝗯𝗲𝗶𝗻𝗴 𝗿𝗲𝗺𝗼𝘃𝗲𝗱 𝗳𝗿𝗼𝗺 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽.**`,
        threadID,
        messageID
      );
    }

    // Final warning before reaching the spam threshold
    if (spamCount >= 25 && spamCount < spamThreshold) {
      api.sendMessage(
        `⚠️ [𝗙𝗜𝗡𝗔𝗟 𝗪𝗔𝗥𝗡𝗜𝗡𝗚: 𝗦𝗣𝗔𝗠𝗠𝗘𝗥]  
        **𝗬𝗼𝘂 𝗮𝗿𝗲 𝗻𝗲𝗮𝗿𝗶𝗻𝗴 𝘁𝗵𝗲 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝗹𝗶𝗺𝗶𝘁, ${userName}!**  
        **𝗬𝗼𝘂 𝗵𝗮𝘃𝗲 𝘀𝗲𝗻𝘁 ${spamCount} 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀 𝗮𝗻𝗱 𝗮𝗿𝗲 𝗰𝗹𝗼𝘀𝗲 𝘁𝗼 𝗯𝗲𝗶𝗻𝗴 𝗸𝗶𝗰𝗸𝗲𝗱.**  
        **𝗣𝗹𝗲𝗮𝘀𝗲 𝘀𝗹𝗼𝘄 𝗱𝗼𝘄𝗻 𝗻𝗼𝘄.**`,
        threadID,
        messageID
      );
    }

    // Kick user if they exceed the spam threshold
    if (spamCount > spamThreshold) {
      api.removeUserFromGroup(senderID, threadID, (err) => {
        if (err) {
          console.error("Error kicking user:", err);
          return;
        }
        api.sendMessage(
          `⚠️ [𝗦𝗣𝗔𝗠𝗠𝗘𝗥 𝗥𝗘𝗠𝗢𝗩𝗘𝗗]  
          **𝗬𝗼𝘂 𝗵𝗮𝘃𝗲 𝗯𝗲𝗲𝗻 𝗿𝗲𝗺𝗼𝘃𝗲𝗱, ${userName}, 𝗳𝗼𝗿 𝗲𝘅𝗰𝗲𝘀𝘀𝗶𝘃𝗲 𝘀𝗽𝗮𝗺𝗺𝗶𝗻𝗴.**  
          **𝗣𝗹𝗲𝗮𝘀𝗲 𝗳𝗼𝗹𝗹𝗼𝘄 𝗴𝗿𝗼𝘂𝗽 𝗿𝘂𝗹𝗲𝘀.**`,
          threadID
        );
      });

      // Clear user data after being kicked
      clearTimeout(messageCounts[threadID][senderID].timer);
      delete messageCounts[threadID][senderID];
    }
  }
};
