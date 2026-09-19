const {
  Client,
  GatewayIntentBits,
  PermissionsBitField
} = require("discord.js");

require("dotenv").config();
const http = require("http");

const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Mikasa is online 🐤");
}).listen(PORT, "0.0.0.0");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// ===============================
// 🐤 MIKASA SETTINGS
// ===============================

const warnings = new Map();

const BAD_WORDS = [
  "badword1",
  "badword2",
  "badword3"
];

// ===============================
// 💬 MIKASA REPLIES
// ===============================

const replies = {
  hello: [
    "Hii daaa 😭🐤 Enna panra?",
    "Heyyy 😤 Naan inga dhaan iruken!",
    "Hiiiii 😂❤️ Saptiya?",
    "Enna da sudden-ah vandhuta? 👀"
  ],

  saptiya: [
    "Sapten da 😌 Nee saptiya?",
    "Innum illa 😭 Nee enakku food order panna poriya? 😂",
    "Saptennn 🐤 Nee sapdala na poi sapdu!",
    "Food topic ah? 😤 Enakkum pasikuthu!"
  ],

  ennaPanra: [
    "Un kooda pesitu iruken da 😂",
    "Onnum illa... unna disturb panna wait panren 😤🐤",
    "Server-ah watch panren 👀",
    "Naan Mikasa da, duty-la iruken 🤖🐤"
  ],

  love: [
    "Ayyoo 😳 Enna ippadi pesura?",
    "Seri seri 😂❤️",
    "Nee romba scene podra da 😤",
    "Hmmm... naan kekkave illa 😌🐤"
  ],

  angry: [
    "😤😤 Enna da idhu?!",
    "Naan kovama iruken! 😭",
    "Seri... pesadha! 😤",
    "Hmm 😒 po po..."
  ],

  calm: [
    "Seri seri 😌 Kovam pochu.",
    "Okay da 😂 Sanda venam.",
    "Hmm fineee 🐤❤️",
    "Va da, peace ✌️😂"
  ],

  thanks: [
    "Hehe welcome da 😎🐤",
    "Paravala paravala 😂",
    "Anytime da ❤️",
    "Mikasa irukumbodhu thanks ethuku? 😌"
  ],

  bye: [
    "Bye daaa 👋🐤",
    "Seri po... seekiram va 😤",
    "Good night if you're sleeping 😴❤️",
    "Bye bye 😂 Don't forget Mikasa!"
  ]
};

// ===============================
// 🎲 RANDOM REPLY
// ===============================

function randomReply(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// ===============================
// ⚠️ WARNING SYSTEM
// ===============================

async function addWarning(message, reason) {
  const userId = message.author.id;

  const current = warnings.get(userId) || 0;
  const total = current + 1;

  warnings.set(userId, total);

  await message.channel.send(
    `⚠️ ${message.author}, warning **${total}/3**!\nReason: ${reason}\n— Mikasa 🐤`
  );

  // 3 warnings = timeout
  if (total >= 3) {
    if (
      message.member &&
      message.member.moderatable
    ) {
      await message.member.timeout(
        10 * 60 * 1000,
        "Mikasa automatic moderation"
      ).catch(() => {});
      
      await message.channel.send(
        `😤 ${message.author} 3 warnings complete!\n10 minutes timeout. 🐤`
      );
    }

    warnings.set(userId, 0);
  }
}

// ===============================
// 🤖 BOT READY
// ===============================

client.once("ready", () => {
  console.log("================================");
  console.log(`🐤 Mikasa online as ${client.user.tag}`);
  console.log("================================");

  client.user.setPresence({
    activities: [
      {
        name: "TEAM TITAN FALL 🐤",
        type: 0
      }
    ],
    status: "online"
  });
});

// ===============================
// 👋 WELCOME MESSAGE
// ===============================

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.systemChannel;

  if (!channel) return;

  channel.send(
    `👋 Welcome ${member}!\n\n` +
    `🐤 **Mikasa:** Hiiiii! Welcome to **${member.guild.name}** ❤️\n` +
    `Rules follow pannunga 😤✨`
  );
});

// ===============================
// 💬 MESSAGE SYSTEM
// ===============================

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const text = message.content.toLowerCase().trim();

  // ===============================
  // 🚫 BAD WORD DETECTION
  // ===============================

  const hasBadWord = BAD_WORDS.some((word) =>
    text.includes(word.toLowerCase())
  );

  if (hasBadWord) {
    await message.delete().catch(() => {});

    await addWarning(
      message,
      "Bad words use pannirukka."
    );

    return;
  }

  // ===============================
  // 👋 HELLO
  // ===============================

  if (
    text === "hi" ||
    text === "hii" ||
    text === "hello" ||
    text.includes("hey mikasa")
  ) {
    await message.channel.send(
      randomReply(replies.hello)
    );
    return;
  }

  // ===============================
  // 🍚 SAPTIYA
  // ===============================

  if (
    text.includes("saptiya") ||
    text.includes("saaptiya") ||
    text.includes("saptiyaa")
  ) {
    await message.channel.send(
      randomReply(replies.saptiya)
    );
    return;
  }

  // ===============================
  // 🤔 ENNA PANRA
  // ===============================

  if (
    text.includes("enna panra") ||
    text.includes("enna pandra") ||
    text.includes("what are you doing")
  ) {
    await message.channel.send(
      randomReply(replies.ennaPanra)
    );
    return;
  }

  // ===============================
  // ❤️ LOVE
  // ===============================

  if (
    text.includes("love you") ||
    text.includes("luv you") ||
    text.includes("miss you")
  ) {
    await message.channel.send(
      randomReply(replies.love)
    );
    return;
  }

  // ===============================
  // 😤 ANGRY
  // ===============================

  if (
    text.includes("kovama") ||
    text.includes("angry") ||
    text.includes("sanda")
  ) {
    await message.channel.send(
      randomReply(replies.angry)
    );
    return;
  }

  // ===============================
  // 😌 CALM
  // ===============================

  if (
    text.includes("sorry") ||
    text.includes("samathanam") ||
    text.includes("calm")
  ) {
    await message.channel.send(
      randomReply(replies.calm)
    );
    return;
  }

  // ===============================
  // 🙏 THANKS
  // ===============================

  if (
    text.includes("thanks") ||
    text.includes("thank you")
  ) {
    await message.channel.send(
      randomReply(replies.thanks)
    );
    return;
  }

  // ===============================
  // 👋 BYE
  // ===============================

  if (
    text === "bye" ||
    text.includes("good night")
  ) {
    await message.channel.send(
      randomReply(replies.bye)
    );
    return;
  }

  // ===============================
  // 🐤 MIKASA CALL
  // ===============================

  if (text.includes("mikasa")) {
    await message.channel.send(
      `Enna da ${message.author.username} 😤🐤 Kooptiya? Naan inga dhaan iruken!`
    );
  }
});

// ===============================
// 🔐 LOGIN
// ===============================

client.login(process.env.DISCORD_TOKEN);
