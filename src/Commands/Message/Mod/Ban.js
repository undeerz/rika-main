const { MessageEmbed } = require("discord.js");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ban",
      aliases: ["ban"],
      description: "Bana algum membro",
      category: "Mod",
    });
  }

  async run(message) {
    const userData = await this.client.userData.findOne({
      id: message.author.id,
    });

    const gif = userData.premium != false ? `${userData.gifban}` : "";

    const embed = new MessageEmbed()
    .setDescription("Test")
    .setImage(`${gif}`);

    return message.reply({ embeds: [embed] });
  }
};
