const Command = require('../../../Structures/Command');
const { readdirSync } = require('fs');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'ajuda',
			aliases: ['help'],
			description: 'Lista todos comandos do Bot.',
			category: 'Utility'
		});
	}

	async run(message) {
    const utility = readdirSync('./src/Commands/Message/Utility').map((arquivo) => `${arquivo.replace(/.js/g, '')}`);

		const embed = new MessageEmbed()
    .setAuthor({
      name : 'Menu de comandos',
      iconURL : this.client.user.avatarURL()
    })
    .addFields({
      name : `» Utilidades :`,
      value : `\`${utility}\``
    })

		return message.reply({ embeds: [embed] });
	}

};
