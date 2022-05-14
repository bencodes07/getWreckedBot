require("dotenv").config()
const fs = require("fs")
const { Client, Collection, Intents, MessageEmbed } = require("discord.js")

const client = new Client({ intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] })
client.commands = new Collection() 

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));


commandFiles.forEach((commandFile) => {
	const command = require(`./commands/${commandFile}`);
	client.commands.set(command.data.name, command);
})

eventFiles.forEach(eventFile => {
  const event = require(`./events/${eventFile}`);
  client.on(event.name, (...args) => event.execute(...args));
});

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`)
  client.user.setActivity({name: "mit dem Code", type: "PLAYING"})
})

client.on("interactionCreate", async (interaction) => {

  if(!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if(command) {

    try {
      //Wir führen den Command aus
      await command.execute(interaction);
    } catch (error) {

      console.error(error);

      if(interaction.deferred || interaction.replied) {
          interaction.editReply('There was an error while executing this command!')
      } else {
          interaction.reply('There was an error while executing this command!')
      }
    }
  }
})


client.login(process.env.BOT_TOKEN)