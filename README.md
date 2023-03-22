# GetWreckedBot
GetWreckedBot is a Discord bot designed for use on a specific server. It provides several useful features through slash commands, including retrieving information about users and servers, displaying server rules, and monitoring Twitch streams.

### Installation
To use GetWreckedBot, you'll need to do the following:

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running npm install.
3. Create a new application and bot account in the Discord Developer Portal.
4. Add the bot to your server by using the `https://discord.com/oauth2/authorize?client_id=<CLIENT_ID>&scope=bot&permissions=2147483647` URL (replace <CLIENT_ID> with your bot's client ID).
5. Create a `.env` file in the project root and add the following variables:
``` makefile
DISCORD_TOKEN=<your Discord bot token>
TWITCH_CLIENT_ID=<your Twitch client ID>
TWITCH_CLIENT_SECRET=<your Twitch client secret>
```
6. Run the bot using `npm start`.
### Usage
GetWreckedBot responds to several slash commands:

- /info user: Retrieves information about the selected user.
- /info server: Retrieves information about the current server.
- /rules: Displays the server rules and allows users to react to agree to them.
In addition to these commands, the bot also uses webhooks to provide server logs and Twitch stream notifications.

### Contributing
Contributions to GetWreckedBot are welcome! If you find a bug or have a feature request, please create an issue on this repository. If you'd like to contribute code, please create a pull request with your changes.

### License
This project is licensed under the MIT License.
