const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('rules').setDescription('Zeige dir die Regeln an').setDefaultMemberPermissions(Permissions.FLAGS.SEND_MESSAGES),
  async execute(interaction) {
    var embed = new MessageEmbed()
    .setTitle('Regeln dieses Servers:')
    .setColor('GREEN')
    .addFields([
      {
        name: 'Regel 1',
        value: 'Keine leeren Nicknames',
      },
      {
        name: 'Regel 2',
        value: 'Keine unangemessenen Nicknames',
      },
      {
        name: 'Regel 3',
        value: 'Keine sexuellen Nicknames',
      },
      {
        name: 'Regel 4',
        value: 'Keine Nicknames mit ungewöhnlichen oder unlesbaren Wörtern',
      },
      {
        name: 'Regel 5',
        value: 'Keine blanke Profilbilder',
      },
      {
        name: 'Regel 6',
        value: 'Keine unangemessenen Profilbilder',
      },
      {
        name: 'Regel 7',
        value: 'Keine sexuelle Profilbilder',
      },
      {
        name: 'Regel 8',
        value: 'Moderatoren behalten sich das Recht vor, Nicknames zu ändern.',
      },
      {
        name: 'Regel 9',
        value: 'Moderatoren behalten sich das Recht vor, ungeachtet einer Regel nach eigenem Ermessen zu handeln.',
      },
      {
        name: 'Regel 10',
        value: 'Keine Ausnutzung von Lücken in den Regeln (bitte melden).',
      },
      {
        name: 'Regel 11',
        value: 'Kein DMing anderer Mitglieder des Servers.',
      },
      {
        name: 'Regel 12',
        value: 'Keine Beleidigungen.',
      },
      {
        name: 'Regel 13',
        value: 'Regeln gelten für das DMen anderer Mitglieder des Servers.',
      },
      {
        name: 'Regel 14',
        value: 'Keine einladenden inoffizieller Bots.',
      },
      {
        name: 'Regel 15',
        value: 'Keine einladenden offiziellen Bots.',
      },
      {
        name: 'Regel 16',
        value: 'Keine bugs, exploits, glitches, hacks, bugs, etc.'
      }
    ])
    .setFooter('Diese Regeln gelten für alle Mitglieder des Servers. Wenn du einverstanden bist klicke den grünen Haken');

    const ruleChannel = interaction.channel;

    const emoji = '✅';

    const sentMessage = await ruleChannel.send({embeds: [embed], ephimeral: true});
    await sentMessage.react(emoji);

    interaction.reply('**Lese dir die Regeln bitte einmal durch ;)**')
    interaction.deleteReply();
  }
}
