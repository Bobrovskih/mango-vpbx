const Helpers = require('./helpers');
const Worker = require('./worker');

/**
 * Класс для работы с API Виртуальной АТС от MANGO OFFICE
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
		const formData = Helpers.createForm(this.apiKey, this.apiSalt, JSON.stringify(json));

		const options = {
			url: Helpers.url('call'),
			method: 'POST',
			json: true,
			formData
		};
        
		return new Worker(options);
	}
}

module.exports = VPBX;
