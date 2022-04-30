const { MessageEmbed } = require("discord.js");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "daily",
      aliases: ["diario"],
      description: "Receba seu premio diario",
      category: "Economy",
    });
  }

  async run(message, args) {
    const userData = await this.client.userData.findOne({
      id: message.author.id,
    });

    let coins = Math.floor(Math.random() * 500);
    let daily = userData.daily;

    let time = 8.64e7 - (Date.now() - daily);

    if (userData.premium === true) {
      coins = 2000;
    }

    if (daily !== null && 8.64e7 - (Date.now() - daily) > 0) {
      return message.reply(
        `${message.author}, tente novamente em \`${this.client.timeFormat(
          this.client.convertMilliseconds(time)
        )}\``
      );
    } else {
      message.reply(
        `${
          message.author
        }, você coletou \`${coins.toLocaleString()}\` coins do seu prêmio diário.`
      );
    }

    if (userData) {
      userData.coins = userData.coins + coins;
      await userData.save();
    } else {
      await this.client.userData.create({
        id: message.author.id,
        daily: Date.now(),
        coins: coins,
      });
    }
  }
};
