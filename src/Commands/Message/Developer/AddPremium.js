const { MessageEmbed } = require("discord.js");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "addpremium",
      aliases: ["adp"],
      description: "test",
      category: "Developer",
    });
  }

  async run(message, args) {
    if (message.author.id !== "852687463846772747") return;

    const target = await this.client.getUser(args[0], message);
    if (!args[0]) {
      return message.reply("Mencione um membro");
    }

    const userData = await this.client.userData.findOne({
      id: target.id,
    });

    if (userData.premium == true) {
      return message.reply("Esse user já possue premium");
    }

    if (userData) {
      userData.premium = true;
      await userData.save();
    } else {
      await this.client.userData.create({
        id: target.id,
        premium: true,
      });
    }

    message.reply({
      content: `Premium sendo adicionado a(o) ${target} (${target.id})`,
    });
  }
};
