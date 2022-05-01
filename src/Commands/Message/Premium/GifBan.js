const { MessageEmbed, Emoji } = require("discord.js");
const Command = require("../../../Structures/Command");
const Emojis = require("../../../Utils/Emojis");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "gifban",
      aliases: ["gban"],
      description: "Set seu gifban.",
      category: "Premium",
    });
  }

  async run(message, args) {
    const userData = await this.client.userData.findOne({
      id: message.author.id,
    });

    if (!userData.premium) {
      return message.reply("» Você não possue Premium ativado em sua conta!");
    }
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setTitle("» Gif ban")
        .setDescription(
          `Para alterar seu Gif de banimento user \`r>gifban set [link]\``
        )
        .setImage(`${userData.gifban}`);

      return message.reply({ embeds: [embed] });
    }

    if (["set"].includes(args[0].toLowerCase())) {
      let link = args.slice(1).join(" ");

      if (!link) {
        return message.reply(
          `${message.author}, não foi provido nenhum link para salvar.`
        );
      } else if (link === userData.gifban) {
        return message.reply(
          `${message.author}, o link inserido é o mesmo setado atualmente.`
        );
      } else if (!link.includes(".gif")) {
        return message.reply(
          `${message.author}, para salvar o link tem que ser necessariamente um Gif.`
        );
      } else {
        if (userData) {
          userData.gifban = link;
          await userData.save();
        }

        return message.reply(
          `${Emojis.ok} ${message.author}, novo Gif setado com sucesso`
        );
      }
    }
  }
};
