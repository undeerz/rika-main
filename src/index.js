require('dotenv/config');

const BaseClient = require('./Structures/BaseClient');
const Configuration = require('./Utils/Configuration');

const client = new BaseClient(Configuration);
client.start();
