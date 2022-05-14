require("dotenv").config();
const fs = require("fs");
const { Client, Collection, Intents, MessageEmbed, Interaction } = require("discord.js");

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection() ;

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

const { ruleChannel, ruleInteraction, sentMessage } = require("../src/commands/rules.js");

commandFiles.forEach((commandFile) => {
	const command = require(`./commands/${commandFile}`);
	client.commands.set(command.data.name, command);
})

eventFiles.forEach(eventFile => {
  const event = require(`./events/${eventFile}`);
  client.on(event.name, (...args) => event.execute(...args));
});

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`);
  client.user.setActivity({name: "mit dem Code", type: "PLAYING"});
})

client.on("interactionCreate", async (interaction) => {

  if(!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if(command) {
    try {

      await command.execute(interaction);
    } catch (error) {

      console.error(error);

      if(interaction.deferred || interaction.replied) {
          interaction.editReply('There was an error while executing this command!');
      } else {
          interaction.reply('There was an error while executing this command!');
      }
    }
  }
})

// Rule Channel

let botReacted = false;

client.on("messageReactionAdd", async (reaction, user) => {  
  if(reaction.message.channel.id === '793205320305344562') {
    if(botReacted === true) {
      const member = reaction.message.guild.members.cache.get(user.id);
      member.roles.add("793202658977775636");
      console.log('🔴 Role received! 🔴');

      reaction.message.delete();
      botReacted = false;
    } else {
      botReacted = true;
    }
  } else {
    console.log('Not Rule Channel!');
  }
});

client.login(process.env.BOT_TOKEN);