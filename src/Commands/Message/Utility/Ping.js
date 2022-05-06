const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ping",
      aliases: ["pong"],
      description: "Request para ping.",
      category: "Utility",
    });
  }

  async run(message) {
    const content = [
      `**Websocket:** \`${Math.round(this.client.ws.ping)}ms\``,
      `**Latency:** \`${Math.round(Date.now() - message.createdTimestamp)}ms\``,
    ].join("\n");

    return message.reply({ content });
  }
};
