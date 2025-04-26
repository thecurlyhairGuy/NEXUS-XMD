const axios = require("axios");
const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "sss1",
  alias: ["screenweb"],
  react: "💫",
  desc: "Download screenshot of a given link.",
  category: "other",
  use: ".ss <link>",
  filename: __filename,
}, 
async (conn, mek, m, {
  from, l, quoted, body, isCmd, command, args, q, isGroup, sender, 
  senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, 
  groupMetadata, groupName, participants, isItzcp, groupAdmins, 
  isBotAdmins, isAdmins, reply 
}) => {
  if (!q) {
    return reply("براہ کرم اسکرین شاٹ لینے کے لیے ایک لنک فراہم کریں۔");
  }

  try {
    const response = await axios.get(`https://api.diioffc.web.id/api/tools/sstab?url=${encodeURIComponent(q)}`);
    console.log(response.data); // API response check karne ke liye

    const screenshotUrl = response.data.result;

    if (!screenshotUrl) {
        console.log("Screenshot URL not found in API response.");
        return reply("اسکرین شاٹ کا URL نہیں ملا۔");
    }

    console.log("Screenshot URL:", screenshotUrl); // Confirm karte hain URL ko

    const imageMessage = {
      image: { url: screenshotUrl },
      caption: "*📸 WEB SCREENSHOT DOWNLOADER*\n\n> *© Powered By 𝐁.𝐌.𝐁-𝐗𝐌𝐃*",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363352087070233@newsletter',
          newsletterName: "𝐁.𝐌.𝐁-𝐗𝐌𝐃",
          serverMessageId: 143,
        },
      },
    };

    await conn.sendMessage(from, imageMessage, { quoted: m });
  } catch (error) {
    console.error("Error:", error);
    reply("اسکرین شاٹ لینے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔");
  }
});
