const { vpbxMessage } = require('./constant');
const Helpers = require('./helpers');

class Transform {
	/**
	 * Метод для определения текста ошибки ВАТС по коду.
	 * @param {any} body - тело ответа из request-promise
	 */
	static message(body, res) {
		let temp;
		
		if (res.statusCode === 200) {
			temp = {
				success: Helpers.isSuccess(body.result),
				result: body.result,
				message: vpbxMessage[body.result],
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

		if (typeof body === 'string') {
			temp.stats = body;
		}

		for (const key in temp) {
			if (temp[key] === undefined || temp[key] === null) {
				delete temp[key];
			}
		}

		return temp;
	}
}

module.exports = Transform;

