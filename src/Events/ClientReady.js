const Event = require("../Structures/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "ready",
      once: true,
    });
  }

  async run(client) {
    const { Client } = require("nekos-best.js");
    const neko = new Client();
    neko.init();

    console.log(`Logged ${this.client.user.tag}`);
    console.log(
      `Loaded ${this.client.commands.size} commands & ${this.client.events.size} events!`
    );

    setInterval(() => {
      client.user.setActivity(
        `r<help - ${this.client.guilds.cache.size.toLocaleString()} servers`
      );
    }, 6 * 6 * 100);
  }
};
