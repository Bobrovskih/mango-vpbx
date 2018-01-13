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
			return { stats: body };
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

