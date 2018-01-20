const EventEmitter = require('events');
const Helpers = require('./helpers');
const { realtime } = require('./urls');
const debug = require('debug')('mango-vpbx:events');


/**
 * Класс для получения уведомлений от ВАТС
 */
class Realtime extends EventEmitter {
	constructor(url) {
		super();
		this.url = Helpers.pathname(url);
		this.poolHear = [];
	}

	/**
     * Обработчик "Уведомления о вызове"
     * @return {Function}
     */
	get call() {
		return this.create('call');
	}

	/**
     * Обработчик "Уведомления о результате смс"
     * @return {Function}
     */
	get sms() {
		return this.create('sms');
	}
    
    
	/**
     * Обработчик "Уведомления о записи разговора"
     * @return {Function}
     */
	get recording() {
		return this.create('recording');
	}
    
	/**
     * Обработчик "Уведомления о нажатиях DTMF клавиш"
     * @return {Function}
     */
	get dtmf() {
		return this.create('dtmf');
	}


	/**
     * Обработчик "Уведомления о завершении вызова"
     * @return {Function}
     */
	get summary() {
		return this.create('summary');
	}

	/**
     * Обработчик "Проверить подключение" из ЛК
     * @return {Function}
     */
	get ping() {
		return this.create('ping');
	}
    
	/**
     * Создает обработчик
     * @param {string} en - имя ивента
     * @return {Function}
     */
	create(en) {
		const pattern = new RegExp(`${realtime[en]}/?$`, 'i');
		return (req, res, next) => {
			if (pattern.test(req.path)) {
				debug(`-> ${req.method} ${req.url}`);
				const payload = Helpers.parser(req.body);
				this.invokeHear(en, payload);
				this.emit('data', payload);
				this.emit(en, payload);
				res.send({ success: true });
				return;
			}
			next();
		};
	}

	/**
	 * Слушает события по фильтрам
	 * @param {any} filter - фильтр событий
	 * @param {Function} handler - функция обработчик
	 */
	hear(filter = {}, handler) {
		const newHear = { filter, handler };
		this.poolHear.push(newHear);
	}

	/**
	 * Проверяет и вызывает обработчики hear
	 * @param {string} en - имя ивента
	 * @param {any} json - параметры
	 */
	invokeHear(en, json) {
		this.poolHear
			.filter(item => item.filter.event === en)
			.forEach((item) => {
				const { event, filter } = item.filter;
				if (this.testFilter(event, filter, json)) {
					item.handler.call(this, json);
				}
			}, this);
	}


	/**
	 * Проверяет подходит ли фильтр под параметры
	 * @param {string} event - имя ивента
	 * @param {any} filter - фильтр
	 * @param {any} json - параметры
	 * @return {boolean}
	 */
	testFilter(event, filter, json) {
		if (Helpers.typeOf(filter) !== 'object') {
			return false;
		}

		if (Helpers.isEmptyObject(filter)) {
			return true;
		}

		for (const key in filter) {
			if (!filter[key]) continue;

			const filterVal = Helpers.toLowerCase(filter[key]);
			const jsonVal = Helpers.toLowerCase(json[key]);

			const operators = Helpers.operatorsMatch(filterVal);
			if (operators) {
				const intFilterVal = Helpers.toNumber(filterVal);
				const intJsonVal = Helpers.toNumber(jsonVal);
				return operators.slice(1).some(operator => Helpers.compare(intJsonVal, operator, intFilterVal));
			}
			if (filterVal !== jsonVal) {
				return false;
			}
		}
		return true;
	}
}

module.exports = Realtime;
