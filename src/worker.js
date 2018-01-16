const rp = require('request-promise');
const Transform = require('./transform');
const Helpers = require('./helpers');
const debug = require('debug')('mango-vpbx:worker');

class Worker {
	constructor(options) {
		this.options = options;
		this.setDefaults();
		this.disableReject();
		this.transformResponse();
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

	transformResponse() {
		this.options.transform = this.options.transform || Transform.default;
	}

	userAgent() {
		const temp = this.options.headers || {};
		temp['User-Agent'] = 'https://github.com/Bobrovskih/mango-vpbx';
		this.options.headers = temp;
	}

	send() {
		debug(`<- ${this.options.method} ${this.options.url}`);
		debug(JSON.stringify(this.options.formData));
		return rp(this.options);
	}
}

module.exports = Worker;
