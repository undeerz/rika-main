const Command = require("../../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const neko = require("nekos-best.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "dance",
      aliases: ["dançar"],
      description: "Dance com alguém",
      category: "Fun",
    });
  }

  async run(message, args) {
    let member = await this.client.getUser(args[0], message);
    if (!member)
      return message.channel.send(`» ${message.author}, user não encontrado.`);
    let img = await neko.fetchRandom("dance");
    const embed = new MessageEmbed()
      .setDescription(`<@${message.author.id}> dançou com <@${member.id}>`)
      .setImage(img.results[0].url);

    message.reply({ embeds: [embed] });
  }
};
