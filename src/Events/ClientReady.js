const Event = require("../Structures/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "ready",
      once: true,
    });
  }

  async run() {
    console.log(`Logged ${this.client.user.tag}`);
    console.log(
      `Loaded ${this.client.commands.size} commands & ${this.client.events.size} events!`
    );
  }
};
