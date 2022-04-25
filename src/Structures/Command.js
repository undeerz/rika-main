module.exports = class Command {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'No description provided.';
		this.category = options.category || 'Miscellaneous';
		this.usage = options.usage || '';
	}

	async run(message, args) { // eslint-disable-line no-unused-vars
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

};
