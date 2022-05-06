const Command = require("../../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "serverinfo",
      aliases: ["si"],
      description: "Informações sobre o servidor.",
      category: "Utility",
    });
  }

  async run(message) {
    const server = message.guild;

    let bans;
    try {
      bans = await message.guild.bans.fetch();
      bans = bans.size.toString();
    } catch (e) {
      bans = "0";
    }

    const embed = new MessageEmbed()
      .setAuthor({
        name: server.name,
        iconURL: server.iconURL(),
      })
      .setThumbnail(server.iconURL)
      .addFields(
        {
          name: "» Informações Gerais :",
          value: `ID : **${
            server.id
          }**\nDono : **${await server.fetchOwner()}**\nTotal de Membros : **${
            server.memberCount
          }**`,
          inline: true,
        },
        {
          name: "» Informações Adicionais :",
          value: `Cargos : **${server.roles.cache.size.toString()}**\nTotal de Banimentos : **${bans}**\nBoost's : **${
            server.premiumSubscriptionCount
          }**`,
          inline: true,
        }
      );

    return message.reply({ embeds: [embed] });
  }
};
