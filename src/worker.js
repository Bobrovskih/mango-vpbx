const rp = require('request-promise');

class Worker {
	constructor(options) {
		this.options = options;
		this.setUA();
		return this.send();
	}

	setUA() {
		const temp = this.options.headers || {};
		temp['User-Agent'] = 'https://github.com/Bobrovskih/mango-vpbx';
		this.options.headers = temp;
	}

	send() {
		return rp(this.options);
	}
}

module.exports = Worker;
