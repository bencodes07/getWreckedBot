const { VoiceState } = require('discord.js');

module.exports = {
  name: 'voiceStateUpdate',
  /**
   * @param {VoiceState} oldState 
   * @param {VoiceState} newState 
   */
  async execute(oldState, newState, client) {
    const { member, guild } = newState;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;
    const joinToCreate = '975770090568048710';

    if(oldChannel !== newChannel && newChannel && newChannel.id === joinToCreate) {
      const voiceChannel = await guild.channels.create(`${member.displayName}'s Channel`, {
        type: 'GUILD_VOICE',
        parent: newChannel.parent,
        permissionOverwrites: [
          {id: member.id, allow: ['CONNECT']},
          {id: guild.id, deny: ['CONNECT']}
        ]
      });

      await newChannel.permissionOverwrites.edit(member, {CONNECT: false});
      setTimeout(() => {
        newChannel.permissionOverwrites.delete(member)
      }, 30 * 1000);
  
      return setTimeout(() => {
        member.voice.setChannel(voiceChannel)
      }, 500);
    }

    const ownedChannel = guild.channels.cache.find(channel => channel.name === `${member.displayName}'s Channel`);
    
    // if(member.voice.channel !== ownedChannel) {
    //   setTimeout(() => {
        
    //   }, 5 * 1000);
    //   ownedChannel.delete().catch(console.error);
    // }

  }
}