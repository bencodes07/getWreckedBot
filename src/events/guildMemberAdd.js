const { GuildMember, MessageEmbed } = require('discord.js'); 
const moment = require('moment');

module.exports = {
  name: "guildMemberAdd",
  /*
   * @param {GuildMember} member
   */
  execute(member) {
    const memberCreated = moment(member.user.createdTimestamp).format('DD.MM.YYYY');
    member.guild.channels.cache.get('793200713319972904').send({
      embeds: [
        new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`${member.user.tag}`)
        .setDescription(`Willkommen <@${member.id}> auf **${member.guild.name}**! \n \n Account erstellt: **${memberCreated}** \n \n Aktuelle Anzahl an Membern: **${member.guild.memberCount}**`)
        .setFooter(`ID: ${member.guild.id}`)
        .setColor('AQUA')
      ]
    });
  }
}