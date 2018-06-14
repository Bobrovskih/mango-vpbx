const { version } = require('../package');

const name = 'https://github.com/Bobrovskih/mango-vpbx';
const userAgent = `${name} v${version}`;

module.exports = {
    name,
    version,
    userAgent,
};
