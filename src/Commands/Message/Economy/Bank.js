const { MessageEmbed } = require("discord.js");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "bank",
      aliases: ["deposit"],
      description: "Deposite seus coins no banco",
      category: "Economy",
    });
  }

  async run(message, args) {
    const userData = await this.client.userData.findOne({
      id: message.author.id,
    });

    if (!userData) {
      return message.reply(
        "» Este user não está registrado em meu Banco de Dados."
      );
    }

    if (!args[0]) {
      const embed = new MessageEmbed()
        .setTitle("» Banco")
        .setDescription(
          `Para depositar seus Coins no banco digite \`r>bank dep [quantidade]\``
        );

      return message.reply({ embeds: [embed] });
    }

    if (["dep"].includes(args[0].toLowerCase())) {
      let quant = parseInt(args[1]);

      if (!args[1] || quant < 0 || isNaN(quant)) {
        return message.reply(`${message.author}, quantia invalida`);
      }

      if (userData.coins < quant) {
        return message.reply(
          `${message.author}, você não possue essa quantidade de coins`
        );
      }

      if (quant === 0) {
        return message.reply(
          `${message.author}, você não pode depositar um valor nulo`
        );
      }

      if (userData) {
        userData.coins = userData.coins - quant;
        userData.bank = userData.bank + quant;
        await userData.save();
      }

      message.reply({
        content: `${message.author}, foi depositado uma quantia de \`${quant}\` ao seu Banco.`,
      });
    }
  }
};
