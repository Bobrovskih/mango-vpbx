const { suffix, httpMessage } = require('./constant');
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

	/**
	 * Устанавливает случайный command_id если не задан.
	 * @param {any} json - параметры
	 */
	static setCommandId(json) {
		json.command_id = json.command_id || `cmd-${Date.now()}`;
	}

	/**
	 * Устанавливает пустой sms_sender если не задан.
	 * @param {any} json - параметры
	 */
	static setSMSSender(json) {
		json.sms_sender = json.sms_sender || '';
	}

	/**
	 * Проверяет API запрос на успех.
	 * Вернет true если от ВАТС вернулся код 1000.
	 * @param {string|number} vpbxCode - код ВАТС
	 * @return {boolean}
	 */
	static isSuccess(vpbxCode) {
		const code = Number(vpbxCode) || 1000;
		return code === 1000;
	}

	/**
	 * Мапит код ошибки в сообщение
	 * @param {number|string} httpCode - http код ошибки
	 * @return {string}
	 */
	static httpMessage(httpCode) {
		const code = Number(httpCode) || 0;
		return httpMessage[code];
	}
}

module.exports = Helpers;
