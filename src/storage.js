const path = require('path');
const fs = require('fs');
const https = require('https');

class Storage {
	/**
     * Возвращает абсолютный путь на диске
     * @param {string} customPath - относительный путь
     */
	static absolutePath(customPath) {
		return path.join(customPath);
	}

	/**
     * Скачивает файл GET запросом
     * @param {string} urlFile - url-адрес файла
     * @param {string} pathDisk - путь на диске
     * @async
     */
	static async downloadFile(urlFile, pathDisk) {
		const writable = fs.createWriteStream(this.normalizePath(pathDisk));

		return new Promise((resolve, reject) => {
			https.get(urlFile, (res) => {
				res.pipe(writable)
					.on('end', empty => resolve())
					.on('error', err => reject(err));
			});
		});
	}
}

module.exports = Storage;
