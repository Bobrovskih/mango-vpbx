const parameters = require('../parameters');

class Stats {
    /**
     * Преобразует статистику вызовов из строки в массив
     * @param {string} stats статистика вызовов
     * @return {string[][]}
     */
    static toArray(stats) {
        return stats
            .trim()
            .split('\r\n')
            .map(item => item.split(';'));
    }

    /**
     * Фильтрует полученную статистику вызовов
     * @param {string[][]} stats статистика вызовов
     * @param { any } json параметры
     */
    static filter(stats, json) {
        const {
            fields,
            incoming,
            outgoing,
            success,
            fail,
        } = json;
        const hasFilterDirection = Boolean(incoming || outgoing);
        const hasFilterType = Boolean(success || fail);
        const hasFilter = hasFilterType || hasFilterDirection;

        if (hasFilter) {
            const fieldsArr = fields.replace(/\s+/g, '').split(',');
            if (hasFilterDirection) {
                stats = Stats.filterByDirection(stats, fieldsArr, json);
            }
            if (hasFilterType) {
                stats = Stats.filterByType(stats, fieldsArr, json);
            }
            stats = Stats.dropDuplicates(stats, fieldsArr);
        }
        return stats;
    }

    /**
     * Фильтрует статитику по направлению звонка
     * @param {string[][]} stats статистика
     * @param {string[]} fieldsArr порядок полей
     */
    static filterByDirection(stats, fieldsArr, { incoming, outgoing }) {
        const fromExtIx = fieldsArr.indexOf('from_extension');

        return stats
            .filter((item) => {
                const fromExtension = item[fromExtIx];
                
                const incomingHit = incoming && !fromExtension;
                if (incomingHit) {
                    return true;
                }
                const outgoingHit = outgoing && fromExtension;
                if (outgoingHit) {
                    return true;
                }
                return false;
            });
    }

    /**
     * Фильтрует статистику по результату звонка
     * @param {string[][]} stats статистика
     * @param {string[]} fieldsArr порядок полей
     */
    static filterByType(stats, fieldsArr, { success, fail }) {
        const entryIx = fieldsArr.indexOf('entry_id');
        const answerIx = fieldsArr.indexOf('answer');
        if (success) {
            return stats.filter(item => item[answerIx] !== '0');
        }
        if (fail) {
            return stats.filter(item => item[answerIx] === '0');
        }
        return stats;
    }

    /**
     * Удаляет дубликаты из статистики по entry_id
     * @param {string[][]} stats статистика
     * @param {string[]} fieldsArr порядок полей
     */
    static dropDuplicates(stats, fieldsArr) {
        const entryIx = fieldsArr.indexOf('entry_id');
        return stats.reduce((acum, item) => {
            const alreadyGot = acum.some(row => row[entryIx] === item[entryIx]);
            if (alreadyGot) return acum;
            return acum.concat([item]);
        }, []);
    }

    /**
     * Нормализует поле fields для запроса статистики с учетом фильтров
     * @param {any} json параметры
     */
    static normalizeFields(json) {
        const { success, fail } = json;
        if (!json.fields) {
            json.fields = parameters.statsFields.join(',');
            return;
        }
        if (success || fail) {
            const required = ['from_extension', 'answer', 'entry_id'];
            const jsonFields = (json.fields || '').replace(/\s+/g, '').split(',');
            required
                .filter(field => !jsonFields.includes(field))
                .forEach(field => jsonFields.push(field));
            json.fields = jsonFields.join(',');
        }
    }
}

module.exports = {
    Stats,
};
