const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
  /** 
   * @param {Interaction} interaction 
   */
  async execute(interaction) {
    if(!interaction.memberPermissions.has("SEND_MESSAGES")) return;
    await interaction.reply(`Pong! Latency: ${interaction.client.ws.ping}ms`);
  }
}