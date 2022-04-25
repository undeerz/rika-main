module.exports = class Event {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.type = options.once ? 'once' : 'on';
		this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
	}

	async run(...args) { // eslint-disable-line no-unused-vars
		throw new Error(`Sem parâmetro de execução ${this.name}`);
	}

};
