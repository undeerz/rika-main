const Command = require('../../../Structures/Command');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'about',
			aliases: ['botinfo'],
			description: 'Informações sobre o bot.',
			category: 'Utility'
		});
	}

	async run(message) {
		const embed = new MessageEmbed()
    .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    .setDescription(':partying_face: Uma simples e pequena bot querendo ser reconhecida nesse imenso e inexplorado universo chamado Discord !')
    .setImage('https://media.discordapp.net/attachments/968591622977777734/968594655392444516/Sem_Titulo-1.png?width=1025&height=273')

		return message.reply({ embeds : [embed] });
	}

};
