const { MessageEmbed } = require("discord.js");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "beg",
      aliases: ["bal"],
      description: "Sua carteira",
      category: "Economy",
    });
  }

  async run(message, args) {
    let user = await this.client.getUser(args[0], message);
    if (!user) user = message.author;

    const userData = await this.client.userData.findOne({
      id: user.id,
    });

    if (!userData) {
      return message.reply(
        "» Este user não está registrado em meu Banco de Dados."
      );
    }

    let value = userData.coins.toLocaleString();
    let bank = userData.bank.toLocaleString();

    if (user.bot) {
      return message.reply("» Você não pode ver a carteira de bots.");
    }

    const embed = new MessageEmbed()
      .setAuthor({
        name: user.username,
        iconURL: user.avatarURL({ dynamic: true }),
      })
      .addFields(
        {
          name: `» Carteira`,
          value: value,
          inline: true,
        },
        {
          name: `» Banco`,
          value: bank,
          inline: true,
        }
      );

    return message.reply({ embeds: [embed] });
  }
};
