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
	 * @constructor
	 * @param {string} [apiKey] Уникальный код вашей АТС
	 * @param {string} [apiSalt] Ключ для создания подписи
	 */
	constructor(apiKey = process.env.API_KEY, apiSalt = process.env.API_SALT) {
		this.apiKey = apiKey;
		this.apiSalt = apiSalt;
	}

	/**
	 * Выполняет запрос на звонок
	 * @param {object} json параметры
	 * @param {object} json.from инициатор вызова
	 * @param {string} json.from.extension добавочный номер сотрудника
	 * @param {string} [json.from.number] номер телефона
	 * @param {string} json.to_number вызываемый номер телефона
	 * @param {string} [json.command_id] идентификатор запроса
	 * @param {string} [json.line_number] номер линии (АОН)
	 * @param {object} [json.sip_headers] SIP заголовки
	 * @param {string} [json.sip_headers.answer_after] автоответ через n секунд
	 * @return {Promise<{ success: boolean, code: number, message: string }>}
	 */
	call(json) {
		Helpers.setCommandId(json);
		Helpers.mapSipHeaders(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'call');

		const options = {
			url: Helpers.url('call'),
			formData
		};

		return new Worker(options);
	}

	/**
	 * Выполняет запрос на групповой звонок
	 * @param {object} json параметры
	 * @param {string} [json.command_id] идентификатор запроса
	 * @param {string} json.from добавочный номер группы
	 * @param {string} json.to вызываемый номер телефона
	 * @param {string} [json.line_number] номер линии (АОН)
	 * @return {Promise<{ success: boolean, code: number, message: string }>}
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
	 * @param {object} [json] параметры
	 * @param {string} [json.extension] добавочный номер сотрудника
	 * @return {Promise<{ success: boolean, message: string, users: any[] }>}
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
	 * @param {object} json параметры
	 * @param {string} json.date_from timestamp начала
	 * @param {string} json.date_to timestamp конца
	 * @param {string} [json.fields] список полей включаемые в выгрузку (через запятую).
     * возможные значения: "records, start, finish, answer, from_extension, from_number,
	 * to_extension, to_number, disconnect_reason, line_number, location, entry_id"
	 * @param {object} [json.from] данные, относящиеся к вызывающему абоненту
	 * @param {string} [json.from.extension] добавочный номер
	 * @param {string} [json.from.number] номер телефона
	 * @param {object} [json.to] данные, относящиеся к вызываемому абоненту
	 * @param {string} [json.to.extension] добавочный номер
	 * @param {string} [json.to.number] номер телефона
	 * @param {object} [json.call_party] данные, относящиеся к вызываемому или вызывающему абоненту.
	 * Использование поля допустимо только без заполнения полей to и from
	 * @param {string} [json.call_party.extension] добавочный номер
	 * @param {string} [json.call_party.number] номер телефона
	 *
	 * @param {string} [json.request_id] идентификатор запроса
	 *
	 * @return {Promise<{ stats: string[][], success: boolean, message: string }>}
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
	 * @param {object} json параметры
	 * @param {string} [json.command_id] идентификатор команды
	 * @param {string} json.text текст сообщения
	 * @param {string} json.from_extension внутренний номер сотрудника
	 * @param {string} json.to_number номер вызываемого телефона
	 * @param {string} [json.sms_sender] имя отправителя
	 * @return {Promise<{ success: boolean, code: number, message: string }>}
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
	 * Выполняет запрос записи разговора
	 * @param {object} json параметры
	 * @param {string} json.recording_id идентификатор записи разговора
	 * @param {string} [json.folder] абсолютный путь до папки, для сохранения записи разговора
	 * @param {number|date|string} [json.expires] время жизни ссылки ('MAX' = 1000 лет),
	 * для получения ссылки на запись разговора
	 * @async
	 */
	async recording(json) {
		if (json.folder) {
			return await this.recordingPost(json);
		}
		if (json.expires) {
			return this.recordingLink(json);
		}
		return { success: false };
	}

	/**
	 * Выполняет запрос для завершения вызова
	 * @param {object} json параметры
	 * @param {string} [json.command_id] идентификатор команды
	 * @param {string} json.call_id идентификатор вызова, который необходимо завершить
	 * @return {Promise<{ success: boolean, code: number, message: string }>}
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
	 * @param {object} json параметры
	 * @param {string} [json.command_id] идентификатор команды
	 * @param {string} json.call_id идентификатор вызова
	 * @param {string} json.call_party_number номер абонента участвующего в вызове,
	 * которого нужно начать записывать.
	 * @return {Promise<{ success: boolean, code: number, message: string }>}
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
	 * @param {object} json параметры
	 * @param {string} json.call_id идентификатор вызова
	 * @param {string} json.to_number новый номер назначения вызова
	 * @param {string} [json.command_id] идентификатор команды
	 * @param {object} [json.sip_headers] SIP заголовки
	 * @param {string} [json.sip_headers.display_name]
	 * @return {Promise<{ success: boolean, code: number, message: string }>}
	 */
	route(json) {
		Helpers.setCommandId(json);
		Helpers.mapSipHeaders(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'route');

		const options = {
			url: Helpers.url('route'),
			formData
		};

		return new Worker(options);
	}

	/**
	 * Запрос для перевода вызова
	 * @param {object} json параметры
	 * @param {string} [json.command_id] идентификатор команды
	 * @param {string} json.call_id идентификатор вызова
	 * @param {string} json.method тип перевода: blind - слепой, hold - консультативный
	 * @param {string} json.to_number номер (цель) перевода
	 * @param {string} json.initiator участник разговора, от имени которого выполняется перевод
	 * (например, "from.extension", "from.number", "to.extension", "to.number")
	 * @return {Promise<{ success: boolean, code: number, message: string }>}
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
	 * @param {object} json параметры
	 * @param {string} json.number динамический номер
	 * @return {Promise<{success: boolean, code: number, dctUserInfo: any[]}>}
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
	 * @param {object} json параметры
	 * @param {string} json.number динамический номер
	 * @return {Promise<{success: boolean, code: number, dctUserHistory: any[]}>}
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
	 * Создает обработчики для прослушивания событий от ВАТС
	 * (API RealTime)
	 * @param {string} url адрес внешней системы
	 */
	events(url) {
		return new Realtime(url);
	}

	/**
	 * Получение записи разговора POST запросом
	 * @param {*} json параметры
	 * @async
	 * @private
	 */
	async recordingPost(json) {
		Helpers.setAction(json);
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, json, 'recordingPost');

		const options = {
			url: Helpers.url('recordingPost'),
			formData,
			transform: Transform.recordingPost
		};

		const { tempLink } = await new Worker(options);
		const recording = await Storage.downloadFile(tempLink, json.folder);
		const file = recording;
		return { success: true, recording, file };
	}

	/**
	 * Получение ссылки на запись разговора
	 * @param {*} json параметры
	 * @private
	 */
	recordingLink(json) {
		Helpers.setAction(json, 'play');
		Helpers.mapExpires(json);
		const recording = Helpers.createUrl(this.apiKey, this.apiSalt, json, 'recordingLink');
		const link = recording;
		return { success: true, recording, link };
	}
}

module.exports = VPBX;
