const path = require('path');
const fs = require('fs');
const https = require('https');

class Storage {
	/**
     * Скачивает файл GET запросом
     * @param {string} urlFile - url-адрес файла
     * @param {string} folder - путь на диске
     */
	static downloadFile(urlFile, folder) {
		return new Promise((resolve, reject) => {
			https.get(urlFile, (res) => {
				const fileName = this.fileName(res);
				const fullPath = path.join(folder, fileName);

				const writable = fs.createWriteStream(fullPath);
				res.pipe(writable)
					.on('finish', empty => resolve({ success: true, filename: fullPath }))
					.on('error', error => resolve({ success: false, message: error }));
			});
		});
	}

	/**
	 * Вовзращает имя файла из заголовка Content-Disposition
	 * @param {any} res - респонс из https модуля
	 * @return {string}
	 */
	static fileName(res) {
		const contDisposition = res.headers['content-disposition'];
		const pattern = /filename="(.*)"/i;
		const match = contDisposition.match(pattern);
		if (!match) {
			return `unknown${Date.now()}.mp3`;
		}
		return match[1];
	}
}

module.exports = Storage;
