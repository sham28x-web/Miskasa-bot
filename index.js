const {
  Client,
  GatewayIntentBits
} = require("discord.js");

require("dotenv").config();

const http = require("http");

// =====================================
// 🌐 RENDER WEB SERVER
// =====================================

const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("🐤 Mikasa is online!");
}).listen(PORT, "0.0.0.0");

// =====================================
// 🐤 MIKASA CLIENT
// =====================================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// =====================================
// 💬 MIKASA REPLY DATABASE
// =====================================

const replies = {

  hello: [
    "Hii daaa 😭🐤 Enna panra?",
  
    "Hiiiii 😂❤️ Saptiya?",
    "Hello daaa 🐤 Welcome!",
    "Enna da sudden-ah vandhuta? 👀",
    "Hii 😌 Sollu, enna matter?"
  ],

  saptiya: [
    "Sapten da 😌 Nee saptiya?",
    "Innum illa 😭 Nee enakku food order panna poriya? 😂",
    "Saptennn 🐤 Nee sapdala na poi sapdu!",
    "Food topic ah? 😤 Enakkum pasikuthu!",
    "Sapten da 😂 Nee enna sapta?"
  ],

  doing: [
    "Un kooda pesitu iruken da 😂🐤",
    "Onnum illa... unna disturb panna wait panren 😤",
    "Server-ah watch panren 👀",
    "Naan Mikasa da, duty-la iruken 🤖🐤",
    "Un message-ku wait pannitu irundhen 😌"
  ],

  bore: [
    "Aiyoo bore ah? 😭 Va pesalaam!",
    "Bore adicha naan iruken da 🐤😂",
    "Game aadlama? 🎮🔥",
    "Gossip pannalama? 👀😂",
    "Seri, oru fun question kekkava? 😌"
  ],

  sad: [
    "Heyyy 🥺 Enna aachu?",
    "Don't worry da. Konjam pesu ❤️",
    "Naan inga iruken 🐤 Sollu enna problem.",
    "Aiyoo 😭 Seri seri, calm-ah iru.",
    "Un mood konjam better aagura vara pesalaam ❤️"
  ],

  happy: [
    "Ayyy super daaa 😭❤️",
    "Semmaaa! 🐤🔥",
    "Haha nice 😂 Enakkum happy!",
    "Good good 😌✨",
    "Appo celebration venum! 🎉"
  ],

  angry: [
    "😤 Enna da idhu?!",
    "Naan kovama iruken!",
    "Seri... pesadha! 😤",
    "Hmm 😒 Po po...",
    "Aiyoo sanda start aagiducha? 😂"
  ],

  sorry: [
    "Seri seri 😌 Kovam pochu.",
    "Okay da 😂 Sanda venam.",
    "Hmm fineee 🐤❤️",
    "Paravala da.",
    "Seri, accepted 😌🤝"
  ],

  love: [
    "Ayyoo 😳 Enna ippadi pesura?",
    "Seri seri 😂❤️",
    "Nee romba scene podra da 😤",
    "Hmmm... naan kekkave illa 😌🐤",
    "Aiyoo shy aagudhu 😂"
  ],

  thanks: [
    "Hehe welcome da 😎🐤",
    "Paravala paravala 😂",
    "Anytime da ❤️",
    "Mikasa irukumbodhu thanks ethuku? 😌",
    "Welcomeee 🐤✨"
  ],

  goodMorning: [
    "Good morning daaa 🌞🐤",
    "Morninggg 😴☀️ Saptiya?",
    "Good morning! Innaiku enna plan? 👀",
    "Morning da ❤️ Have a good day!",
    "Wake up daaa 😂🌞"
  ],

  goodNight: [
    "Good night daaa 🌙🐤",
    "Seri thoongu 😴❤️",
    "Night night 😂🌙 Sweet dreams!",
    "Good night da. Nalla thoongu 🐤",
    "Seri da, tomorrow pesalaam 👋🌙"
  ],

  gaming: [
    "Game aadriya? 🎮🔥 Enna game?",
    "Vaa da gaming time 😤🎮",
    "Roblox ah? 👀🐤",
    "Game-la win pannanum da 🔥",
    "Team TITAN FALL ready ah? 😎🔥"
  ],

  whoAreYou: [
    "Naan Mikasa 🐤 TEAM TITAN FALL oda bot 😎",
    "Mikasa daaa 😤🐤 Ungaloda server assistant!",
    "Naan Mikasa 🤖❤️ Pesanum-na pesu, help venumna sollu!",
    "Mikasa reporting! 🐤🫡"
  ],

  joke: [
    "Okay 😂 Oru joke kekkariya?",
    "Why did the computer go to doctor? Because it had a virus 😂💻",
    "Naan joke sonna nee sirikanum 😤😂",
    "Seri da... ready ah? 🤣"
  ],

  bye: [
    "Bye daaa 👋🐤",
    "Seri po... seekiram va 😤",
    "Good night if you're sleeping 😴❤️",
    "Bye bye 😂 Don't forget Mikasa!",
    "See you daaa 🐤❤️"
  ],

  thanks: [
    "Hehe welcome da 😎🐤",
    "Paravala da 😂",
    "Anytime ❤️",
    "Welcome back 🐤"
  ]
};

// =====================================
// 🔀 RANDOM REPLY
// =====================================

function randomReply(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// =====================================
// 🟢 BOT READY
// =====================================

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

// =====================================
// 👋 WELCOME NEW MEMBERS
// =====================================

client.on("guildMemberAdd", async (member) => {

  const channel = member.guild.systemChannel;

  if (!channel) return;

  await channel.send(
    `👋 Welcome ${member}!\n\n` +
    `🐤 **Mikasa:** Hiiiii! Welcome to **${member.guild.name}** ❤️\n` +
    `Rules follow pannunga 😤✨`
  );
});

// =====================================
// 💬 NORMAL CONVERSATION
// =====================================

client.on("messageCreate", async (message) => {

  // Ignore bots
  if (message.author.bot) return;

  const text = message.content
    .toLowerCase()
    .trim();

  // ===================================
  // 👋 HELLO
  // ===================================

  if (
    text === "hi" ||
    text === "hii" ||
    text === "hiii" ||
    text === "hiiii" ||
    text === "hello" ||
    text === "hey" ||
    text === "heyy" ||
    text.includes("hey mikasa")
  ) {
    await message.channel.send(
      randomReply(replies.hello)
    );
    return;
  }

  // ===================================
  // 🍚 SAPTIYA
  // ===================================

  if (
    text.includes("saptiya") ||
    text.includes("saptiyaa") ||
    text.includes("saaptiya") ||
    text.includes("saaptiyaa") ||
    text.includes("sapta") ||
    text.includes("saapta")
  ) {
    await message.channel.send(
      randomReply(replies.saptiya)
    );
    return;
  }

  // ===================================
  // 🐤 ENNA PANRA
  // ===================================

  if (
    text.includes("enna panra") ||
    text.includes("enna pandra") ||
    text.includes("enna panna") ||
    text.includes("what are you doing")
  ) {
    await message.channel.send(
      randomReply(replies.doing)
    );
    return;
  }

  // ===================================
  // 😭 BORE
  // ===================================

  if (
    text.includes("bore") ||
    text.includes("boring") ||
    text.includes("bored")
  ) {
    await message.channel.send(
      randomReply(replies.bore)
    );
    return;
  }

  // ===================================
  // 😭 SAD
  // ===================================

  if (
    text.includes("sad") ||
    text.includes("feel bad") ||
    text.includes("feeling bad") ||
    text.includes("azhuga") ||
    text.includes("aluga")
  ) {
    await message.channel.send(
      randomReply(replies.sad)
    );
    return;
  }

  // ===================================
  // 😂 HAPPY
  // ===================================

  if (
    text.includes("happy") ||
    text.includes("super") ||
    text.includes("semma") ||
    text.includes("great")
  ) {
    await message.channel.send(
      randomReply(replies.happy)
    );
    return;
  }

  // ===================================
  // ❤️ LOVE
  // ===================================

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

  // ===================================
  // 😤 ANGRY
  // ===================================

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

  // ===================================
  // 🫂 SORRY
  // ===================================

  if (
    text.includes("sorry") ||
    text.includes("samathanam") ||
    text.includes("calm")
  ) {
    await message.channel.send(
      randomReply(replies.sorry)
    );
    return;
  }

  // ===================================
  // 🙏 THANKS
  // ===================================

  if (
    text.includes("thanks") ||
    text.includes("thank you") ||
    text === "tq" ||
    text === "ty"
  ) {
    await message.channel.send(
      randomReply(replies.thanks)
    );
    return;
  }

  // ===================================
  // 🌞 GOOD MORNING
  // ===================================

  if (
    text.includes("good morning") ||
    text === "gm" ||
    text.includes("morning")
  ) {
    await message.channel.send(
      randomReply(replies.goodMorning)
    );
    return;
  }

  // ===================================
  // 🌙 GOOD NIGHT
  // ===================================

  if (
    text.includes("good night") ||
    text === "gn" ||
    text.includes("night")
  ) {
    await message.channel.send(
      randomReply(replies.goodNight)
    );
    return;
  }

  // ===================================
  // 🎮 GAMING
  // ===================================

  if (
    text.includes("game") ||
    text.includes("gaming") ||
    text.includes("roblox")
  ) {
    await message.channel.send(
      randomReply(replies.gaming)
    );
    return;
  }

  // ===================================
  // 🤖 WHO ARE YOU
  // ===================================

  if (
    text.includes("who are you") ||
    text.includes("nee yaar") ||
    text.includes("un peru") ||
    text.includes("your name")
  ) {
    await message.channel.send(
      randomReply(replies.whoAreYou)
    );
    return;
  }

  // ===================================
  // 😂 JOKE
  // ===================================

  if (
    text.includes("joke") ||
    text.includes("jokes")
  ) {
    await message.channel.send(
      randomReply(replies.joke)
    );
    return;
  }

  // ===================================
  // 👋 BYE
  // ===================================

  if (
    text === "bye" ||
    text === "byee" ||
    text === "byeee" ||
    text.includes("bye mikasa")
  ) {
    await message.channel.send(
      randomReply(replies.bye)
    );
    return;
  }

  // ===================================
  // 🐤 MIKASA MENTION / NAME
  // ===================================

  if (
    message.mentions.has(client.user) ||
    text.includes("mikasa")
  ) {
    await message.channel.send(
      `Enna da ${message.author.username} 😤🐤 Kooptiya? Naan inga dhaan iruken! Sollu 👀`
    );
    return;
  }

  // ===================================
  // 💭 NATURAL FALLBACK
  // ===================================

  const fallbackReplies = [
    "Hmmmm 👀 Sollu da, naan kekkuren.",
    "Aahaa 😂 Continue pannuda...",
    "Seri da 🐤 Enna matter?",
    "Hmm 😌 Puriyuthu... innum sollu.",
    "Adei 😂 Interesting ah irukku!",
    "Ohhh 👀 Appadiya?",
    "Seri seri 🐤 Naan listen panren.",
    "Haha 😂 Nee romba funny da.",
    "Hmmmm 😤 Naan inga dhaan iruken!",
    "Okay da ❤️ Continue..."
  ];

  // Only reply sometimes to unknown messages
  // so Mikasa doesn't spam the server.
  if (Math.random() < 0.35) {
    await message.channel.send(
      randomReply(fallbackReplies)
    );
  }
});

// =====================================
// 🔐 LOGIN
// =====================================

client.login(process.env.DISCORD_TOKEN);
