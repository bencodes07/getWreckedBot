const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  /*
   * @param {Message} message
   */
  async execute(message) {
    if(message.channel.type === 'dm' || message.author.bot) return;

    let words = ['hurensohn', 'bastard', 'huan', 'reichsgenosse', 'schwarzen', 'opfer', 'assi', 'penis', 'blyat', 'hartmann', 'porn', 'porno', 'scheisse', 'scheiße', 'dick', 'shit', 'hs', 'scheiss', 'scheiß', 'yarak', 'jarak', 'transe', 'fotze', 'nuttensohn', 'nutte', 'ficken', 'hure', 'huren', 'ficksohn', 'nuttenficker', 'verfickt', 'bastardsohn', 'hitler', 'niger', 'nigger', 'nigga', 'lutscher', 'du schwanz', 'deine mutter'];

    let foundInText = false;
    for(let i in words) {
      if(message.content.toLowerCase().includes(words[i])) {
        foundInText = true;
      }
    }

    if(foundInText === true) {
      const logChannel = message.guild.channels.cache.get('976154709708640296');
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