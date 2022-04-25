const path = require('node:path');
const { promisify } = require('node:util');
const glob = promisify(require('glob'));
const Command = require('./Command');
const Event = require('./Event');

module.exports = class Util {

	constructor(client) {
		this.client = client;
	}

	isClass(input) {
		return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().slice(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename) + path.sep}`.split(path.sep).join('/');
	}

	isOwner(userId) {
		return this.client.owners.includes(userId);
	}

	async loadCommands() {
		return glob(`${this.directory}Commands/Message/**/*.js`).then(commands => {
			for (const commandFile of commands) {
				delete require.cache[commandFile];
				const { name } = path.parse(commandFile);
				const File = require(commandFile);
				if (!this.isClass(File)) throw new TypeError(`${name} não exporta class.`);
				const command = new File(this.client, name.toLowerCase());
				if (!(command instanceof Command)) throw new TypeError(`${name} não pertence ao diretório de comandos.`);
				this.client.commands.set(command.name, command);
				if (command.aliases.length) {
					for (const alias of command.aliases) {
						this.client.aliases.set(alias, command.name);
					}
				}
			}
		});
	}

	async loadEvents() {
		return glob(`${this.directory}Events/**/*.js`).then(events => {
			for (const eventFile of events) {
				delete require.cache[eventFile];
				const { name } = path.parse(eventFile);
				const File = require(eventFile);
				if (!this.isClass(File)) throw new TypeError(`${name} não exporta class.`);
				const event = new File(this.client, name);
				if (!(event instanceof Event)) throw new TypeError(`${name} não pertece ao diretorio de eventos.`);
				this.client.events.set(event.name, event);
				event.emitter[event.type](event.name, (...args) => event.run(...args));
			}
		});
	}

};
