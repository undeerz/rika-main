const Event = require('../../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'warn',
			once: false
		});
	}

	async run(info) {
		console.warn(info);
	}

};
