const { MessageEmbed } = require("discord.js");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "premium",
      aliases: ["vip"],
      description: "Painel vip.",
      category: "Premium",
    });
  }

  async run(message) {
    const member = await this.client.userData.findOne({
      id: message.author.id,
    });

    if (member.premium === false) {
      return message.reply("» Você não possue vantagens **Premium** no Bot.");
    }

    const embed = new MessageEmbed()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(`» **Em desenvolvimento.**`);

    message.reply({ embeds: [embed] });
  }
};
