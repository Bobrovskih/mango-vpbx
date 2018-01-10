const crypto = require('crypto');

/**
 * Класс для расчета значения sign
 */
class Sign {
	/**
     *
     * @param {string} apiKey
     * @param {string} apiSalt
     * @param {any} json
     */
	constructor(apiKey, apiSalt, json) {
		this.apiKey = apiKey;
		this.apiSalt = apiSalt;
		this.json = json.toString();
	}

	/**
	 * Выполняет расчет sign и возвращает его.
	 * @return {string}
	 */
	calc() {
		const input = this.apiKey + this.json + this.apiSalt;
		return crypto.createHash('sha256').update(input).digest('hex');
	}
}

module.exports = Sign;
