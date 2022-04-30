const { MessageEmbed } = require("discord.js");
const Command = require("../../../Structures/Command");
const Emojis = require("../../../Utils/Emojis");

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

    const hasPremium =
      member.premium != false ? `Premium ativado ${Emojis.paimon1}` : "";

    const embed = new MessageEmbed()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTitle(hasPremium)
      .setDescription(`» **Vantagens Premium**`)
      .addFields(
        {
          name: "Daily :",
          value: "`5000C`",
          inline: true,
        },
        {
          name: "Gif Ban :",
          value: "`Desenvolvimento`",
          inline: true,
        },
        {
          name: "... :",
          value: "`...`",
          inline: true,
        }
      );

    message.reply({ embeds: [embed] });
  }
};
