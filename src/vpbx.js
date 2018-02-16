const Helpers = require('./helpers');
const Worker = require('./worker');
const Transform = require('./transform');
const Storage = require('./storage');
const Realtime = require('./realtime');

/**
 * Класс для API Виртуальной АТС от MANGO OFFICE
 */
class VPBX {
	/**
	 *
	 * @param {string} apiKey - Уникальный код вашей АТС
	 * @param {string} apiSalt - Ключ для создания подписи
	 */
	constructor(apiKey = process.env.API_KEY, apiSalt = process.env.API_SALT) {
		this.apiKey = apiKey;
		this.apiSalt = apiSalt;
	}

	/**
	 * Выполняет запрос на звонок
	 * @param {any} json - json параметры
	 */
	call(json) {
		Helpers.setCommandId(json);

		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'call');

		const options = {
			url: Helpers.url('call'),
			formData
		};

		return new Worker(options);
	}

	/**
	 * Выполняет запрос на групповой звонок
	 * @param {any} json - параметры
	 */
	callGroup(json) {
		Helpers.setCommandId(json);

		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'callGroup');

		const options = {
			url: Helpers.url('callGroup'),
			formData
		};

		return new Worker(options);
	}

	/**
	 * Выполняет запрос сотрудников.
	 * Без параметров вернет всех сотрудников.
	 * @param {any=} json - параметры
	 */
	users(json = {}) {
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'users');

		const options = {
			url: Helpers.url('users'),
			formData
		};

		return new Worker(options);
	}


	/**
	 * Выполняет запрос статистики
	 * @param {any=} json - параметры
	 * @return {Promise<string>}
	 * @async
	 */
	async stats(json) {
		let key;

		{
			const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'statsRequest');
			const options = {
				url: Helpers.url('statsRequest'),
				formData
			};
			({ key } = await new Worker(options));
		}

		{
			const formData = Helpers.createForm(this.apiKey, this.apiSalt, { key }, 'statsResult');
			const options = {
				url: Helpers.url('statsResult'),
				transform: Transform.statsResult,
				formData
			};

			let stats;
			let code;
			let success;
			let message;

			let attempt = 0;
			const maxAttempt = 5;

			do {
				attempt += 1;
				({
					stats, code, success, message
				} = await new Worker(options));
				await Helpers.sleep(5000);
			} while (code === 204 && attempt < maxAttempt);

			if (success && stats) {
				stats = Helpers.statsToArray(stats);
			}
			
			return { stats, success, message };
		}
	}

	/**
	 * Выполняет запрос на отправку смс
	 * @param {any} json - параметры
	 */
	sms(json) {
		Helpers.setCommandId(json);
		Helpers.setSMSSender(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'sms');

		const options = {
			url: Helpers.url('sms'),
			formData
		};

		return new Worker(options);
	}

	/**
	 * Выполняет запрос на получение записи разговора
	 * @param {any} json - параметры
	 * @async
	 */
	async recording(json) {
		Helpers.setAction(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'recording');

		const options = {
			url: Helpers.url('recording'),
			formData,
			transform: Transform.recording
		};

		const { tempLink } = await new Worker(options);
		const file = await Storage.downloadFile(tempLink, json.folder);
		return { success: true, file };
	}

	/**
	 * Выполняет запрос для завершения вызова
	 * @param {json} - параметры
	 * @return {Promise<any>}
	 */
	hangup(json) {
		Helpers.setCommandId(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'hangup');

		const options = {
			url: Helpers.url('hangup'),
			formData
		};

		return new Worker(options);
	}

	/**
	 * Запрос для включения записи разговора
	 * @param {json} - параметры
	 * @return {Promise<any>}
	 */
	recordingStart(json) {
		Helpers.setCommandId(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'recordingStart');

		const options = {
			url: Helpers.url('recordingStart'),
			formData
		};

		return new Worker(options);
	}


	/**
	 * Запрос для маршрутизации вызова
	 * @param {json} - параметры
	 * @return {Promise<any>}
	 */
	route(json) {
		Helpers.setCommandId(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'route');

		const options = {
			url: Helpers.url('route'),
			formData
		};

		return new Worker(options);
	}

	/**
	 * Запрос для перевода вызова
	 * @param {json} - параметры
	 * @return {Promise<any>}
	 */
	transfer(json) {
		Helpers.setCommandId(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'transfer');

		const options = {
			url: Helpers.url('transfer'),
			formData
		};

		return new Worker(options);
	}

	/**
	 * Запрос информации о посетителе сайта по динамическому номеру
	 * @param {json} - параметры
	 * @return {Promise<any>}
	 */
	dctUserInfo(json) {
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'dctUserInfo');

		const options = {
			url: Helpers.url('dctUserInfo'),
			transform: Transform.dctUserInfo,
			formData
		};

		return new Worker(options);
	}

	/**
	 * Запрос истории навигации посетителя сайта по динамическому номеру
	 * @param {json} - параметры
	 * @return {Promise<any>}
	 */
	dctUserHistory(json) {
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'dctUserHistory');

		const options = {
			url: Helpers.url('dctUserHistory'),
			transform: Transform.dctUserHistory,
			formData
		};

		return new Worker(options);
	}

	/**
	 * создает обработчики для прослушивания событий от ВАТС
	 * (API RealTime)
	 * @param {string} url - адрес внешней системы
	 */
	events(url) {
		return new Realtime(url);
	}
}

module.exports = VPBX;
