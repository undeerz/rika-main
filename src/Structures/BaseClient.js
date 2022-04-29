const { Client, Collection, Intents } = require('discord.js');
const Util = require('./Util');
const semver = require('semver');

const moment = require("moment");
require("moment-duration-format");
module.exports = class BaseClient extends Client {

	constructor(options = {}) {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.DIRECT_MESSAGES
			],
			partials: ['CHANNEL', 'MESSAGE'],
			allowedMentions: {
				parse: ['users', 'roles'],
				repliedUser: false
			}
		});
		this.validate(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.events = new Collection();

		this.utils = new Util(this);

		this.getUser = this.findUser;
		this.timeFormat = this.formatTime;
		this.convertMilliseconds = this.convertMilliseconds

		this.userData = require('../Schemas/userData');
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');
		if (semver.lt(process.versions.node, '16.6.0')) throw new Error('This client requires Node.js v16.6.0 or higher.');

		if (!options.token) throw new Error('You must pass the token for the Client.');
		this.token = options.token;

		if (!options.prefix) throw new Error('You must pass a prefix for the Client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;

		if (!options.owners.length) throw new Error('You must pass a list of owner(s) for the Client.');
		if (!Array.isArray(options.owners)) throw new TypeError('Owner(s) should be a type of Array<String>.');
		this.owners = options.owners;

		if (!options.mongouri) throw new Error('You must pass MongoDB URI for the Client.');
		this.mongouri = options.mongouri;
	}

	async findUser(args, message) {
		if (!args || !message) return;

		let user;

		if (/<@!?\d{17,18}>/.test(args)) {
			user = await message.client.users.fetch(args.match(/\d{17,18}/)?.[0]);
		} else {
			try {
				user = await message.guild.members.search({ query: args, limit: 1, cache: false }).then((x) => x.first().user);
			} catch {}
			try {
				user = await message.client.users.fetch(args).catch(null);
			} catch {}
		}
		if (user) return user;
	}

	formatTime(time) {
    if (!time) return;
    return moment.duration(time).format("d[d] h[h] m[m] s[s]");
  }

	convertMilliseconds(ms) {
    const seconds = ~~(ms / 1000);
    const minutes = ~~(seconds / 60);
    const hours = ~~(minutes / 60);

    return {
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  }

	async start(token = this.token) {
		this.utils.loadDatabases();
		this.utils.loadCommands();
		this.utils.loadEvents();
		super.login(token);
	}

};
