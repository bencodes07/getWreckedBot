const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  /*
   * @param {Message} message
   */
  async execute(message) {
    if(message.channel.type === 'dm' || message.author.bot) return;

    const logChannel = message.guild.channels.cache.get('793206879454363748');
    let words = ['hurensohn', 'bastard', 'huan', 'reichsgenosse', 'schwarzen', 'opfer', 'assi', 'penis', 'blyat', 'hartmann', 'porn', 'porno', 'scheisse', 'scheiße', 'dick', 'shit', 'hs', 'scheiss', 'scheiß', 'yarak', 'jarak', 'transe', 'fotze', 'nuttensohn', 'nutte', 'ficken', 'hure', 'huren', 'ficksohn', 'nuttenficker', 'verfickt', 'bastardsohn', 'hitlerd'];

    let foundInText = false;
    for(let i in words) {
      if(message.content.toLowerCase().includes(words[i])) {
        foundInText = true;
      }
    }

    if(foundInText) {
      const logEmbed = new MessageEmbed()
      .setDescription(`**<@${message.author.id}> said a bad word!**`)
      .addField('Message:', message.content)
      .addField('Channel:', message.guild.channels.cache.get(message.channel.id).toString())
      .setColor('RED')
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp();
      logChannel.send({ embeds: [logEmbed]});


      const embed = new MessageEmbed()
      .setTitle('Das ist hier nicht erlaubt!')
      .setColor('RED')
      .setTimestamp();

      let msg = await message.channel.send({ embeds: [embed]});
      message.delete();
      setTimeout(() => {
        msg.delete({ timeout: 3500 });
      }, 3500);
    }
  }
}