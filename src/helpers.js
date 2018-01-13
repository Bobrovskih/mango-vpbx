const messages = require('./messages');
const urls = require('./urls');

const _ = require('lodash');

const Sign = require('./sign');
const parameters = require('./parameters');

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
	static createForm(apiKey, apiSalt, params, method) {
		let json = Helpers.filterJSON(params, method);
		json = JSON.stringify(json);
		const sign = Sign.calc(apiKey, apiSalt, json);
		const vpbx_api_key = apiKey;

		return {
			vpbx_api_key,
			sign,
			json
		};
	}
	
	/**
	 * Удаляет параметры по маске.
	 * Возвращает новый объект.
	 * @param {any} json - параметры
	 * @param {string} method - название API метода
	 * @return {any}
	 */
	static filterJSON(json, method) {
		const mask = parameters[method];
		const maskProperties = _.keys(mask);

		const result = _.pick(json, maskProperties);
		return result;
	}

	/**
	 * Вовращает url для API запроса
	 * @param {string} method - название вызываемого метода
	 */
	static url(method) {
		return urls.base + urls.suffix[method];
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
	 * Устанавливает action:download по умолчанию
	 * @param {any} json - параметры
	 */
	static setAction(json) {
		json.action = json.action || 'download';
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
		return messages.http[code];
	}

	/**
	 * Делает паузу
	 * @param {number} delay - время в миллисекундах
	 * @return {Promise<void>}
	 */
	static sleep(delay = 1) {
		return new Promise(resolve => setTimeout(resolve, delay));
	}

	/**
	 * Преобразует статистику вызовов из строки в массив
	 * @param {string} stats - статистика вызовов
	 */
	static statsToArray(stats) {
		return stats.split('\r\n').map(item => item.split(';'));
	}
}

module.exports = Helpers;
