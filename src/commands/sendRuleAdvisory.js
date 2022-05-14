const { MessageEmbed, Permissions } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName('sendruleadvisory').setDescription('Send the prompt into the rules channel for the users to know what to do'),
  async execute(interaction) {
    // check for permission
    if(interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      const embed = new MessageEmbed()
      .setTitle("Schreibe ```/rules``` um dir die Regeln anzeigen zu lassen.")
      .setColor('GREEN')
      const channel = interaction.guild.channels.cache.get('793205320305344562');
      channel.send({embeds: [embed]});
    } else {
      interaction.reply('Dazu hast du keine Rechte :(');
    }
  }
}