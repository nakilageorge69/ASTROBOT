module.exports.config = {
  name: "antiout",
  version: "1.0.0"
};
module.exports.handleEvent = async ({
  event,
  api
}) => {
  if (event.logMessageData?.leftParticipantFbId === api.getCurrentUserID()) return;
  if (event.logMessageData?.leftParticipantFbId) {
    const info = await api.getUserInfo(event.logMessageData?.leftParticipantFbId);
    const {
      name
    } = info[event.logMessageData?.leftParticipantFbId];
    api.addUserToGroup(event.logMessageData?.leftParticipantFbId, event.threadID, (error) => {
      if (error) {
        api.sendMessage(`Unable to re-add member ${name} to the group!`, event.threadID);
      } else {
        api.sendMessage(`✧✧🎀 𝗚𝗖𝗛𝗔𝗧 𝗕𝗢𝗧 🎀✧✧\n━━━━━━━━━━━━━━━━━━\nOppsss..! ${name} wag kang umalis mamiss ka namin.\n━━━━━━━━━━━━━━━━━━\n💕 ғʀᴏᴍ: ᴀᴅᴍɪɴ ɢᴇᴏʀᴀʏ 💕`, event.threadID);
      }
    });
  }
};
