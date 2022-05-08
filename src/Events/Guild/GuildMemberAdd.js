const { MessageActionRow, MessageButton } = require("discord.js");
const Event = require("../../Structures/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "guildMemberAdd",
      once: false,
    });
  }

  async run(member, message) {
    const guild = await this.client.guildData.findOne({
      id: member.guild.id,
    });

    if (!guild) return;

    if (guild.welcome.status) {
      const canal = await member.guild.channels.cache.get(
        guild.welcome.channel
      );

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel(`Mensagem configurada por ${member.guild.name}`)
          .setCustomId("bemvindo")
          .setStyle("SECONDARY")
          .setDisabled(true)
      );

      canal.send({
          content: String(guild.welcome.message)
            .replace("{member}", member.toString())
            .replace("{guild}", member.guild.name)
            .replace("{total}", member.guild.memberCount.toString()),
          components: [row],
        })
        .catch(() => {});
    }
  }
};
