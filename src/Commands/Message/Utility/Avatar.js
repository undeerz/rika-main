const Command = require('../../../Structures/Command');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'avatar',
			aliases: ['foto'],
			description: 'Icon de um usuário.',
			category: 'Utility'
		});
	}

	async run(message, args) {
		let user = await this.client.getUser(args[0], message);
		if (!args[0]) user = message.author;

		const avatar = user.displayAvatarURL({
			dynamic: true,
			size: 2048
		});

		const embed = new MessageEmbed()
			.setAuthor({
				name: user.username,
				iconURL: user.avatarURL({ dynamic: true })
			})
			.setImage(avatar);

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setURL(`${avatar}`)
					.setLabel('Download')
					.setStyle('LINK')
			);

		message.reply({ embeds: [embed], components: [row] });
	}

};
