const messages = require('./messages');
const Helpers = require('./helpers');

class Transform {
	/**
	 * Метод для определения текста ошибки ВАТС по коду.
	 * @param {any} body - тело ответа из request-promise
	 * @param {any} res - readable объект из request-promise
	 */
	static default(body, res) {
		let temp;
		
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

	static statsResult(body, res) {
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
	
	static recording(body, res) {
		if (res.statusCode === 302) {
			return { tempLink: res.headers.location };
		}
		return {
			success: false,
			message: messages.vpbx[body.result]
		};
	}
}

module.exports = Transform;

