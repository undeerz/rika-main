const Command = require("../../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const { Client, fetchRandom } = require("nekos-best.js");
const neko = new Client();
neko.init();

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "punch",
      aliases: ["bater"],
      description: "Bata em alguém",
      category: "Fun",
    });
  }

  async run(message, args) {
    let member = await this.client.getUser(args[0], message);
    if (!member)
      return message.channel.send(`» ${message.author}, user não encontrado.`);
    let img = await neko.fetchRandom("punch");
    const embed = new MessageEmbed()
      .setDescription(`<@${message.author.id}> socou <@${member.id}>`)
      .setImage(img.results[0].url);

    message.reply({ embeds: [embed] });
  }
};
