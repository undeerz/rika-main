const Command = require("../../../Structures/Command");
const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ajuda",
      aliases: ["help"],
      description: "Lista todos comandos do Bot.",
      category: "Utility",
    });
  }

  async run(message) {
    const utility = readdirSync("./src/Commands/Message/Utility").map(
      (arquivo) => `${arquivo.replace(/.js/g, "")}`
    );
    const premium = readdirSync("./src/Commands/Message/Premium").map(
      (arquivo) => `${arquivo.replace(/.js/g, "")}`
    );
    const eco = readdirSync("./src/Commands/Message/Economy").map(
      (arquivo) => `${arquivo.replace(/.js/g, "")}`
    );
    const cfg = readdirSync("./src/Commands/Message/Config").map(
      (arquivo) => `${arquivo.replace(/.js/g, "")}`
    );
    const mod = readdirSync("./src/Commands/Message/Mod").map(
      (arquivo) => `${arquivo.replace(/.js/g, "")}`
    );
    const fun = readdirSync("./src/Commands/Message/Fun").map(
      (arquivo) => `${arquivo.replace(/.js/g, "")}`
    );

    const embed = new MessageEmbed()
      .setAuthor({
        name: "Menu de comandos",
        iconURL: this.client.user.avatarURL(),
      })
      .addFields(
        {
          name: `» Utilidades :`,
          value: `\`${utility}\``,
        },
        {
          name: `» Diversão :`,
          value: `\`${fun}\``,
        },
        {
          name: `» Economia :`,
          value: `\`${eco}\``,
        },
        {
          name: `» Moderação :`,
          value: `\`${mod}\``,
        },
        {
          name: `» Premium :`,
          value: `\`${premium}\``,
        },
        {
          name: `» Configurações :`,
          value: `\`${cfg}\``,
        }
      );

    return message.reply({ embeds: [embed] });
  }
};
