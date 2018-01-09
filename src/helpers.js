const { suffix } = require('./constant');
const Sign = require('./sign');

const BASEURL = 'https://app.mango-office.ru/vpbx/';

/**
 * Класс со вспомогательными методами
 */
class Helpers {
	/**
     * Создает (форму) параметры для отправки в POST запросе
     * @param {string} apiKey
     * @param {string} apiSalt
     * @param {string} json
     *
     */
	static createForm(apiKey, apiSalt, json) {
		return {
			vpbx_api_key: apiKey,
			sign: new Sign(apiKey, apiSalt, json).calc(),
			json
		};
	}
	
	/**
	 * Вовращает url для API запроса
	 * @param {string} method - название вызываемого метода
	 */
	static url(method) {
		return BASEURL + suffix[method];
	}
}

module.exports = Helpers;
