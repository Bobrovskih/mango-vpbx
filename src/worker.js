const rp = require('request-promise');
const Transform = require('./transform');
const Helpers = require('./helpers');

class Worker {
	constructor(options) {
		this.options = options;
		this.setDefaults();
		this.disableReject();
		this.tranformError();
		this.userAgent();
		return this.send();
	}

	setDefaults() {
		this.options.method = this.options.method || 'POST';
		this.options.json = this.options.json || true;
	}

	disableReject() {
		this.options.simple = false;
	}

	tranformError() {
		this.options.transform = Transform.message;
	}

	userAgent() {
		const temp = this.options.headers || {};
		temp['User-Agent'] = 'https://github.com/Bobrovskih/mango-vpbx';
		this.options.headers = temp;
	}

	send() {
		return rp(this.options);
	}
}

module.exports = Worker;
