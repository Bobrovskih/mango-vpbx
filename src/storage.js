const path = require('path');
const util = require('util');
const fs = require('fs');
const rp = require('request-promise');

const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    /**
     * Скачивает файл GET запросом
     * @param {string} url url-адрес файла
     * @param {string} folder путь на диске
     * @async
     */
    static async downloadFile(url, folder) {
        const options = {
            url,
            encoding: null,
            resolveWithFullResponse: true,
        };

        const res = await rp(options);

        const fileName = this.fileName(res);
        const fullPath = path.join(folder, fileName);

        await writeFileAsync(fullPath, res.body);
        return fullPath;
    }

    /**
     * Вовзращает имя файла из заголовка Content-Disposition
     * @param {any} res response object request-promise
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

module.exports = {
    Storage,
};

