const Command = require('../../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: '',
			aliases: [''],
			description: '',
			category: ''
		});
	}

	async run(message) {
    
	}

};
