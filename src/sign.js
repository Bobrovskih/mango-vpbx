const crypto = require('crypto');

/**
 * Класс для расчета значения sign
 */
class Sign {

	/**
	 * Выполняет расчет sign и возвращает его.
	 * @param {string} apiKey
     * @param {string} apiSalt
     * @param {any} json
	 * @return {string}
	 */
	static calc(apiKey, apiSalt, json) {
		json = json.toString();
		const input = apiKey + json + apiSalt;
		return crypto.createHash('sha256').update(input).digest('hex');
	}
}

module.exports = Sign;
