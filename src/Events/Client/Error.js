const Event = require('../../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'error',
			once: false
		});
	}

	async run(error) {
		console.log(error.stack);
	}

};
