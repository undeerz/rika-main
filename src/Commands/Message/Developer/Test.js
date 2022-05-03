const { MessageEmbed } = require("discord.js");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "test",
      aliases: ["test"],
      description: "test",
      category: "Developer",
    });
  }

  async run(message, args) {
    if (message.author.id !== "852687463846772747") return;
  }
};
