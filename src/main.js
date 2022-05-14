require("dotenv").config()
const fs = require("fs")
const { Client, Collection, Intents } = require("discord.js")

const client = new Client({ intents:[Intents.FLAGS.GUILDS] })
client.commands = new Collection() 
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 



commandFiles.forEach((commandFile) => {
	const command = require(`./commands/${commandFile}`);
	client.commands.set(command.data.name, command);
})

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

client.on('guildMemberAdd', () => {
  
});

client.login(process.env.BOT_TOKEN)