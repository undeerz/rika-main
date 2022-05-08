const Event = require("../../Structures/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "messageCreate",
      once: false,
    });
  }

  async run(message) {
    if (message.author.bot) return;

    const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

    if (message.content.match(mentionRegex)) {
      return message.reply({
        content: `:wink: Hey, meu prefixo é \`${this.client.prefix}\`.`,
      });
    }

    const prefix = message.content.match(mentionRegexPrefix)
      ? message.content.match(mentionRegexPrefix)[0]
      : this.client.prefix;
    if (!message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const userDatabase = await this.client.userData.findOne({
      id: message.author.id,
    });

    const guild = await this.client.guildData.findOne({
      id: message.guild.id,
    });

    if (!guild) {
      await this.client.guildData.create({
        id: message.guild.id,
      });
    }

    const command =
      this.client.commands.get(cmd.toLowerCase()) ||
      this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
    if (command) {
      try {
        if (!userDatabase) {
          message.reply(
            ":scream_cat: Opa, parece que você esta sendo registrado em meu banco de dados.\n:nerd: Por favor use o comando novamente."
          );
          await this.client.userData.create({
            id: message.author.id,
          });
        } else {
          await message.channel.sendTyping();
          await command.run(message, args);
        }
      } catch (error) {
        console.error(error.stack);

        return message.reply({
          content: "Um erro foi encontrado ao executar esse comando.",
        });
      }
    }
  }
};
