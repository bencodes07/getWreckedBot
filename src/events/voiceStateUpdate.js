const { VoiceState } = require('discord.js');

module.exports = {
  name: 'voiceStateUpdate',
  /**
   * @param {VoiceState} oldState 
   * @param {VoiceState} newState 
   */

  async execute(oldState, newState) {
    const { member, guild } = newState;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;
    const joinToCreate = '975770090568048710';
    let channelCreated = false;

    if(oldChannel !== newChannel && newChannel && newChannel.id === joinToCreate) {
      const voiceChannel = await guild.channels.create(`${member.displayName}'s Channel`, {
        type: 'GUILD_VOICE',
        parent: newChannel.parent,
        permissionOverwrites: [
          {id: member.id, allow: ['CONNECT']},
          {id: guild.id, allow: ['CONNECT']}
        ]
      });

      await newChannel.permissionOverwrites.edit(member, {CONNECT: false});
      setTimeout(() => {
        newChannel.permissionOverwrites.delete(member)
      }, 30 * 1000);
  
      return setTimeout(() => {
        member.voice.setChannel(voiceChannel)
        channelCreated = true;
      }, 500);
    }

    const ownedChannel = guild.channels.cache.find(channel => channel.name === `${member.displayName}'s Channel`);
    
    if(member.voice.channel !== ownedChannel) {
      if(channelCreated === true) {
        setTimeout(() => {

        }, 5 * 1000);
        await ownedChannel.delete();
        channelCreated = false;
      } else {
        console.log('Channel has not yet been created');
      }
    } else {
      console.log('Owned Channel');
    }

  }
}