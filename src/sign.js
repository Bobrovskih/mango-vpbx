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

	/**
	 * Получить подпись для запроса ссылки записи разговора
	 * @param {string} apiKey ключ апи
	 * @param {string} apiSalt соль
	 * @param {string} recordingId идентификатор записи
	 * @param {string} timestamp таймстамп
	 * @return {string}
	 */
	static calcRecordingLink(apiKey, apiSalt, recordingId, timestamp) {
		const input = apiKey + timestamp + recordingId + apiSalt;
		return crypto.createHash('sha256').update(input).digest('hex');
	}
}

module.exports = Sign;
