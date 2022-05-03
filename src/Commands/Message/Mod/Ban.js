const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ban",
      aliases: ["ban"],
      description: "Bana algum membro",
      category: "Mod",
    });
  }

  async run(message, args) {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply(
        `» ${message.author}, você não tem permissão para banir algum membro.`
      );
    }
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      return message.reply(
        `» ${message.author}, eu não tenho permissão nescessaria para completar essa ação.`
      );
    }

    const member = await this.client.getUser(args[0], message);
    if (!args[0]) {
      return message.reply(`» ${message.author}, mencione um membro.`);
    }
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Não informado";

    const userData = await this.client.userData.findOne({
      id: message.author.id,
    });

    const gif = userData.premium != false ? `${userData.gifban}` : "";

    if (member == message.author.id) {
      return message.reply(
        `» ${message.author}, você não pode banir a si mesmo.`
      );
    }

    const row = new MessageActionRow();
    const confirm = new MessageButton()
      .setCustomId("confirm")
      .setLabel("Confirmar")
      .setStyle("SUCCESS");

    const cancel = new MessageButton()
      .setCustomId("cancel")
      .setLabel("Cancelar")
      .setStyle("DANGER");

    row.addComponents([confirm, cancel]);

    const embed = new MessageEmbed()
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.avatarURL({ dynamic: true }),
      })
      .setDescription(`**Banir :** ${member} ?\n**Motivo :** ${reason}`);

    const msg = await message.reply({ embeds: [embed], components: [row] });
    let collect;

    const filter = (interaction) => {
      return interaction.isButton() && interaction.message.id === msg.id;
    };

    const collector = msg.createMessageComponentCollector({
      filter: filter,
      time: 60000,
    });

    collector.on("collect", async (x) => {
      if (x.user.id != message.author.id) return x.deferUpdate();
      collect = x;

      switch (x.customId) {
        case "confirm": {
          msg.delete();

          message.guild.members.ban(member);
          const embed = new MessageEmbed()
            .setDescription(
              `${member} foi banido ${message.author}\nMotivo : ${reason}`
            )
            .setImage(`${gif}`);

          message.reply({ embeds: [embed] }).then((m) => {
            setTimeout(() => m.delete(), 5000);
          });

          break;
        }
      }
    });

    collector.on("end", (x) => {
      if (collect) return;
      msg.delete;
    });
  }
};
