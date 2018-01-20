const _ = require('lodash');
const url = require('url');

const messages = require('./messages');
const urls = require('./urls');
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
		const mask = parameters[method];
		let json = Helpers.filter(params, mask);
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
	 * Фильтрует свойства объекта по маске.
	 * Возвращает новый объект(не изменяет исходный)
	 *
	 * @param {any} json - параметры
	 * @param {any} mask - маска объекта
	 * @return {any}
	 */
	static filter(json, mask = {}) {
		const pathArr = [];
		let jsonCopy = _.cloneDeep(json);

		function bypass(obj) {
			for (const key in obj) {
				if (!_.has(obj, key)) continue;
				const prop = obj[key];
				if (!prop) continue;

				const prefix = pathArr.join('.');
				const pathOfKey = prefix ? `${prefix}.${key}` : key;
				const valueInMask = _.get(mask, pathOfKey);
				if (!valueInMask) {
					jsonCopy = _.omit(jsonCopy, pathOfKey);

					const parentValue = _.get(jsonCopy, prefix);
					if (Helpers.isEmptyObject(parentValue)) {
						jsonCopy = _.omit(jsonCopy, prefix);
					}
					continue;
				}

				if (Helpers.typeOf(prop) === 'object') {
					pathArr.push(key);
					bypass(prop);
				}
			}
			pathArr.pop();
			return jsonCopy;
		}
		return bypass(jsonCopy);
	}


	/**
	 * Проверяет является ли пустым объектом (нет ниодного свойства)
	 * @param {any} input - данные
	 * @return {boolean}
	 */
	static isEmptyObject(input) {
		const type = Helpers.typeOf(input);
		if (type === 'object') {
			const keysCount = _.keys(input).length;
			return keysCount === 0;
		}
		return false;
	}

	/**
	 * Определяет тип переменной.
	 * @param {any} variable - переменная
	 * @return {string} - в нижнем регистре
	 */
	static typeOf(variable) {
		let type = Object.prototype.toString.call(variable);
		type = type.slice(8, -1);
		type = type.toLowerCase();
		return type;
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
	 * делает паузу на заданное время
	 * @param {number} delay - время в миллисекундах
	 * @return {Promise<void>}
	 * @example
	 * await Helpers.sleep(5000);
	 */
	static sleep(delay = 1) {
		return new Promise(resolve => setTimeout(resolve, delay));
	}

	/**
	 * Преобразует статистику вызовов из строки в массив
	 * @param {string} stats - статистика вызовов
	 * @return {any[]}
	 */
	static statsToArray(stats) {
		return stats.split('\r\n').map(item => item.split(';'));
	}

	/**
	 * Возвращает pathname от переданного урла
	 * @param {string} input - урл
	 * @return {string}
	 */
	static pathname(input) {
		return url.parse(input).pathname;
	}

	/**
	 * Парсит параметры пост запроса
	 * Возвращает json параметр как объект
	 * @param {any} body - тело POST запроса
	 * @return {any}
	 */
	static parser(body) {
		const { json, data } = body;
		const payload = JSON.parse(json || data || {});
		return payload;
	}

	/**
	 * Проверяет есть ли в начале строки операторы сравнения
	 * @param {string} input - строка для проверки
	 */
	static operatorsMatch(input) {
		const pattern = /^([><=])([><=])?/;
		const result = input.match(pattern);
		return result;
	}

	/**
	 * Выполняет операцию сравнения между числами
	 * @param {number} value1
	 * @param {string} operator
	 * @param {number} value2
	 */
	static compare(value1, operator, value2) {
		let result;
		switch (operator) {
		case '>': result = value1 > value2; break;
		case '<': result = value1 < value2; break;
		case '=': result = value1 === value2; break;
		default: result = false;
		}
		return result;
	}

	/**
	 * Пребразует в строку.
	 * Удаляет все не цифры.
	 * И возвращает как число.
	 * @param {string} input - значение
	 * @return {number}
	 */
	static toNumber(input) {
		const strInput = input.toString();
		const result = strInput.replace(/\D/g, '');
		return Number(result);
	}

	/**
	 * Возвращает переданную строку в нижнем регистре
	 * Если передана не строка, то просто возвращает исходное значение.
	 * @param {string | any} input - исходное значение
	 */
	static toLowerCase(input) {
		const isString = this.typeOf(input) === 'string';
		const isNumber = this.typeOf(input) === 'number';

		if (isString) {
			return input.toLowerCase();
		}

		if (isNumber) {
			return String(input).toLowerCase();
		}
		return input;
	}
}

module.exports = Helpers;
