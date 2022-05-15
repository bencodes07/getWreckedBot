const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js")

module.exports = {

    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Zeige informationen über diesen Server oder einen User an')
        .addSubcommand(subCommand=> subCommand.setName("server").setDescription("Informationen über diesen Server ausgeben"))
        .addSubcommand(
            subCommand => subCommand.setName("user").setDescription("Informationen über einen Member ausgeben")
            .addUserOption(option => option.setName("user").setDescription("Der Member").setRequired(true))),


    async execute(interaction) {
    switch(interaction.options.getSubcommand()) {
      case "server": {
        interaction.reply({embeds: [
          new MessageEmbed()
          .setTitle(`Informationen for the server ${interaction.guild.name}`)
          .setColor(0x00AE86)
          .addFields([
            {
              name: "Channels",
              value: `${interaction.guild.channels.cache.size} Channels`,
              inline: true
            },

            {
              name: "Created",
              value: `<t:${Math.round(interaction.guild.createdTimestamp/1000)}>`,
              inline: true
            }
          ])

        ]});
        break;
      }
      case "user": {
        const member = interaction.options.getMember("user")
        interaction.reply({embeds: [
          new MessageEmbed()
          .setTitle(`Information for <@${interaction.user.id}>`)
          .setThumbnail(member.user.avatarURL({dynamic: true}))
          .setColor(member.displayColor)
          .addFields([
            {
              name: "Account created ",
              value: `<t:${Math.round(member.user.createdTimestamp/1000)}>`,
              inline: true
            },

            {
              name: "Joined",
              value: `<t:${Math.round(member.joinedTimestamp/1000)}>`,
              inline: true
            }
          ])

        ]});
        break;
      }
    }
  }
}