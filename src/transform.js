const messages = require('./messages');
const Helpers = require('./helpers');
const debug = require('debug')('mango-vpbx:worker');

class Transform {
	/**
	 * Промежуточный обработчик http ответа.
	 * Используется для запросов по-умолчанию.
	 * @param {any} body - тело ответа из request-promise
	 * @param {any} res - readable объект из request-promise
	 */
	static
	default (body, res) {
		let temp;
		debug(`-> ${res.statusCode} ${res.statusMessage}`);
		if (res.statusCode === 200) {
			temp = {
				success: Helpers.isSuccess(body.result),
				result: body.result,
				message: messages.vpbx[body.result],
				users: body.users,
				key: body.key
			};
		} else {
			temp = {
				success: false,
				code: res.statusCode,
				message: Helpers.httpMessage(res.statusCode)
			};
		}


		for (const key in temp) {
			if (temp[key] === undefined || temp[key] === null) {
				delete temp[key];
			}
		}

		return temp;
	}

	/**
	 * Промежуточный обработчик http ответа.
	 * Для запроса результата статистики вызовов.
	 * @param {any} body - тело от request-promise
	 * @param {any} res - res объект от request-promise
	 */
	static statsResult(body, res) {
		debug(`-> ${res.statusCode} ${res.statusMessage}`);
		if (res.statusCode === 200) {
			return {
				success: true,
				code: 200,
				stats: body
			};
		}
		if (res.statusCode === 204) {
			return {
				success: false,
				code: 204,
				message: 'Данные еще не подготовлены. Запрос данных следует повторить.'
			};
		}
		if (res.statusCode === 404) {
			return {
				success: false,
				code: 404,
				message: 'Данные не найдены, передан неправильный/устаревший ключ key.'
			};
		}
		return {
			success: false,
			message: messages.vpbx[body.result]
		};
	}

	/**
	 * Промежуточный обработчик http ответа.
	 * Для запроса записи разговора.
	 * @param {any} body - тело от request-promise
	 * @param {any} res - res объект от request-promise
	 */
	static recording(body, res) {
		debug(`-> ${res.statusCode} ${res.statusMessage}`);
		if (res.statusCode === 302) {
			return {
				tempLink: res.headers.location
			};
		}
		return {
			success: false,
			message: messages.vpbx[body.result]
		};
	}

	/**
	 * Промежуточный обработчик http ответа.
	 * Для запроса информации о посетителе сайта по
	 * динамическому номеру.
	 * @param {any} body - тело от request-promise
	 * @param {any} res - res объект от request-promise
	 */
	static dctUserHistory(body, res) {
		debug(`-> ${res.statusCode} ${res.statusMessage}`);
		if (res.statusCode === 200) {
			return {
				success: true,
				code: res.statusCode,
				dctUserHistory: body
			};
		}
		return {
			success: false,
			code: res.statusCode,
			message: body.message
		};
	}


	/**
	 * Промежуточный обработчик http ответа.
	 * Для запрос истории навигации посетителя сайта
	 * по динамическому номеру.
	 * @param {any} body - тело от request-promise
	 * @param {any} res - res объект от request-promise
	 */
	static dctUserInfo(body, res) {
		debug(`-> ${res.statusCode} ${res.statusMessage}`);
		if (res.statusCode === 200) {
			return {
				success: true,
				code: res.statusCode,
				dctUserInfo: body
			};
		}
		return {
			success: false,
			code: res.statusCode,
			message: body.message
		};
	}
}

module.exports = Transform;
