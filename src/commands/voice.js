const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('voice')
    .setDescription('Private Voice Channel Command(s)')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('invite')
        .setDescription('Invite a friend to your channel!')
        .addStringOption((option) => option.setName('member').setDescription('Select the member').setRequired(true))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('disallow')
        .setDescription('Remove someones access to the channel.')
        .addStringOption((option) => option.setName('member').setDescription('Select the member').setRequired(true))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('public')
        .setDescription('Make your channel public to everyone!')
        .addStringOption((option) => option.setName('turn').setDescription('Turn on or off').setRequired(true)
      ) 
    ),

  async execute(interaction, client) {
    const { options, member, guild } = interaction;

    const subCommand = options.getSubcommand();
    const voiceChannel = member.voice.channel;
    const Embed = new MessageEmbed().setColor('GREEN');
    const ownedChannel = await guild.channels.cache.find(channel => channel.name === `${member.displayName}'s Channel`);

    if(!voiceChannel)
    return interaction.reply({embeds: [Embed.setDescription('You need to be in a voice channel to use this command!').setColor('RED')], ephimeral: true});

    if(!ownedChannel || voiceChannel.displayName == ownedChannel)
    return interaction.reply({embeds: [Embed.setDescription('You need to own this channel to use this command!').setColor('RED')], ephimeral: true});

    switch(subCommand) {
      case 'invite': {
        const targetMember = options.getMember('member');
        voiceChannel.permissionOverwrites.edit(targetMember, { CONNECT: true});

        targetMember.send({embeds: [Embed.setDescription(`You have been invited to ${voiceChannel.name} by ${member}`).setColor('GREEN')]});
        interaction.reply({embeds: [Embed.setDescription(`${targetMember} has been invited to ${voiceChannel.name}`).setColor('GREEN')], ephimeral: true});
      }
      break;
      case 'disallow': {
        const targetMember = options.getMember('member');
        voiceChannel.permissionOverwrites.edit(targetMember, { CONNECT: false});

        if(targetMember.voice.channel && targetMember.voice.channel.id == voiceChannel.id) targetMember.voice.setChannel(null);
        interaction.reply({embeds: [Embed.setDescription(`${targetMember} has been removed from ${voiceChannel.name}`).setColor('GREEN')], ephimeral: true});
      }
      break;
      case 'public': {
        const turnChoice = options.getString('turn');
        switch(turnChoice) {
          case 'on': {
            voiceChannel.permissionOverwrites.edit(guild.id, { CONNECT: null});
            interaction.reply({embeds: [Embed.setDescription(`${voiceChannel.name} is now public!`).setColor('GREEN')], ephimeral: true});
          }
          break;
          case 'off': {
            voiceChannel.permissionOverwrites.edit(guild.id, { CONNECT: false});
            interaction.reply({embeds: [Embed.setDescription(`${voiceChannel.name} is now closed!`).setColor('RED')], ephimeral: true});
          }
          break;
        }
      }
      break;
    }

  }
}




