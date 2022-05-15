const { MessageEmbed, Message, WebhookClient } = require("discord.js")

module.exports = {
  name: 'messageDelete',
  /** 
   * @param {Message} message 
   */
  async execute(message) {
    // check if message is older than 14 days
    if (message.createdTimestamp < Date.now() - (1000 * 60 * 60 * 24 * 14)) {
      console.log('Old Message deleted'); 
      return;
    }
    if(message.author.bot) return;
    

    const log = new MessageEmbed()
    .setColor('36393f')
    .setDescription(`📕 A [message](${message.url}) by ${message.author.tag} was **deleted** in ${message.channel}. \n
    **Deleted Message:**\n [ ${message.content ? message.content : "None"} ]`.slice(0, 4096))
    .setTimestamp();

    if(message.attachments.size >=1) {
      log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true);
    }

    new WebhookClient({url: "https://discord.com/api/webhooks/975440557839122482/y7YO9M-S-Oq4OA8BA2qhUXREHtM9tvLm4apaexs7hZF_dRR51aA9TzvGnzmgTRazYsTu"}).send({embeds: [log]}).catch((err) => console.log(err));
  }
}