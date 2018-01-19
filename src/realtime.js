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
				const payload = this.parser(req.body);
				this.emit('data', payload);
				this.emit(en, payload);
				res.send({ success: true });
				return;
			}
			next();
		};
	}

	/**
	 * Парсит параметры пост запроса
	 * Возвращает json параметр как объект
	 * @param {any} body - тело POST запроса
	 * @return {any}
	 */
	parser(body) {
		const { json, data } = body;
		const payload = JSON.parse(json || data || {});
		return payload;
	}
}

module.exports = Realtime;
