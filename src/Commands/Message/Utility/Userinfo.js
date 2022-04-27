const Command = require('../../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'userinfo',
			aliases: ['ui'],
			description: 'Informações sobre um usuário.',
			category: 'Utility'
		});
	}

	async run(message, args) {
		let user = await this.client.getUser(args[0], message);
		if (!args[0]) user = message.author;

		const userI = message.guild.members.cache.get(user.id);

		const nickname = userI.nickname ?? 'Sem apelido';
		const created = `<t:${Math.floor(
			this.client.users.cache.get(userI.id).createdAt / 1e3
		)}:d>`;

		const embed = new MessageEmbed()
			.setAuthor({
				name: user.tag,
				iconURL: user.displayAvatarURL({ dynamic: true })
			})
			.addFields(
				{
					name: '» Informações pessoais :',
					value: `Nome : **${user.username}**\nID: **${user.id}**\nCriado em : **${created}**`,
					inline: true
				},
				{
					name: '» Informações servidor :',
					value: `Nickname : **${nickname}**`,
					inline: true
				}
			)
			.setThumbnail(user.avatarURL({ dynamic: true, size: 2048 }));

		message.reply({ embeds: [embed] });
	}

};
