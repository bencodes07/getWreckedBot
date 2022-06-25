const { MessageEmbed, Message, WebhookClient } = require("discord.js")

module.exports = {
  name: 'messageUpdate',

  execute(oldMessage, newMessage) {
    if(oldMessage.author.bot) return;

    if(oldMessage.content === newMessage.content) return;

    const count = 1950

    const original = oldMessage.content.slice(0, count) + (oldMessage.content.length > 1950 ? '...' : '');
    const edited = newMessage.content.slice(0, count) + (newMessage.content.length > 1950 ? '...' : '');

    const log = new MessageEmbed()
    .setColor('36393f')
    .setDescription(`📘 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}. \n
    **Original**: \n [ ${original} ] \n**Edited**\n [ ${edited} ]`)
    .setFooter(`Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`)
    .setTimestamp();

    new WebhookClient({url: 'https://discord.com/api/webhooks/990294362413998110/Q6LPJZ97K9tWBPcBGhx2OQuw2FJDGgPNCKth9glXwBXRhAJgCuWGPmotOgudet7RRW2Z'}).send({embeds: [log]}).catch((err) => console.log(err));
  }
}