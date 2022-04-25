exports.token = process.env.DISCORD_TOKEN;
exports.prefix = process.env.CLIENT_PREFIX;
exports.owners = process.env.CLIENT_OWNERS?.split(',').filter(item => item.length);
