const Event = require('../../Structures/Event');
const { connection } = require('mongoose');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'error',
			emitter: connection
		});
	}

	async run() {
		console.log('Unable to connect to Mongo');
	}

};