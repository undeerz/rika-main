const { MessageEmbed } = require("discord.js");
const Command = require("../../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "welcome",
      aliases: ["entrada"],
      description: "Configura a entrada de membros do seu servidor",
      category: "Config",
    });
  }

  async run(message, args) {
    const guild = await this.client.guildData.findOne({
      id: message.guild.id,
    });

    if (!guild) {
      return message.reply("Test");
    }

    if (!message.member.permissions.has("MANAGE_GUILD")) {
      return message.reply(
        "Você não tem permissão o suficiente para executar essa ação"
      );
    }

    const setstatus = guild.welcome.status;
    const setmessage = guild.welcome.message || "Não configurado";
    const setcanal = guild.welcome.channel || "Não configurado";

    if (!args[0]) {
      const embed = new MessageEmbed()
        .setAuthor({
          name: message.author.username,
          iconURL: message.author.avatarURL({ dynamic: true }),
        })
        .setTitle("Entrada de Membros")
        .setDescription(
          "Use os seguintes parâmetros para melhorar a entrada do seu novo membro :\n• **{total}** : Mostral total de membro\n• **{guild}** : Nome do servidor\n• **{member}** : Mencionar o membro"
        )
        .addFields(
          {
            name: `» Mensagem :`,
            value: `\`${setmessage}\``,
            inline: false,
          },
          {
            name: `» Status :`,
            value: `${setstatus === false ? "Desativado" : "Ativado"}`,
            inline: false,
          },
          {
            name: `» Canal :`,
            value: `<#${setcanal}> (${setcanal})`,
            inline: false,
          }
        );

      return message.reply({ embeds: [embed] });
    }

    if (args[0] === "msg") {
      const msg = args.slice(1).join(" ");
      if (!msg)
        return message.reply(
          "Nenhuma mensagem para ser configurada encontrada"
        );
      guild.welcome.message = msg;
      await guild.save();
      message.reply("Foi alterado com sucesso");
    } else if (args[0] === "status") {
      const status = !guild.welcome.status;
      guild.welcome.status = status;
      await guild.save();
    } else if (args[0] === "canal") {
      const canal = message.mentions.channels.first();
      if (!canal) return message.reply("Nenhum canal mencionado");
      guild.welcome.channel = canal.id;
      await guild.save();
    }
  }
};
