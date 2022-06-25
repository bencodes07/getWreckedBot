module.exports = async (client) => {
  const guild = client.guilds.cache.get(process.env.SERVER_ID);
  setInterval(() => {
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get('870618056949366814');
    channel.setName(`All Members: ${memberCount.toLocaleString()}`);
  }, 20000);
}