const Event = require('../../Structures/Event');
const { connection } = require('mongoose');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'open',
			once: true,
			emitter: connection
		});
	}

	async run() {
		console.log('Connected to Mongo');
	}

};