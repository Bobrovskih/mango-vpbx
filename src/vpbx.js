const Helpers = require('./helpers');
const Worker = require('./worker');
const Transform = require('./transform');

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

		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json);

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

		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json);

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
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json);

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
			const formData = Helpers.createForm(this.apiKey, this.apiSalt, json);
			const options = {
				url: Helpers.url('statsRequest'),
				formData
			};
			({
				key
			} = await new Worker(options));
		}

		{
			const formData = Helpers.createForm(this.apiKey, this.apiSalt, { key });
			const options = {
				url: Helpers.url('statsResult'),
				transform: Transform.statsResult,
				formData
			};
			const result = await new Worker(options);
			return result;
		}
	}

	/**
	 * Выполняет запрос на отправку смс
	 * @param {any} json - параметры
	 */
	sms(json) {
		Helpers.setCommandId(json);
		Helpers.setSMSSender(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json);

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
		const methodName = 'recording';

		const pathToFile = Helpers.normalizePath(json.path);
		
		Helpers.setAction(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, methodName);

		const options = {
			url: Helpers.url('recording'),
			formData,
			transform: Transform.recording
		};

		const { tempLink } = await new Worker(options);
		const { file } = await Helpers.downloadFile(tempLink, pathToFile);
		return file;
	}
}

module.exports = VPBX;
