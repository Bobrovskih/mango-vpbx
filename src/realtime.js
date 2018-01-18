const EventEmitter = require('events');
const Helpers = require('./helpers');
const { realtime } = require('./parameters');

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
     * Создает обработчик
     * @param {string} en - имя ивента
     * @return {Function}
     */
	create(en) {
		const pattern = new RegExp(`${realtime[en]}/?$`, 'i');
		return (req, res, next) => {
			if (pattern.test(req.path)) {
				this.emit('data', req.body);
				this.emit(en, req.body);
				return;
			}
			next();
		};
	}
}

module.exports = Realtime;
