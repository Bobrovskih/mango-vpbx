const EventEmitter = require('events');
const debug = require('debug')('mango-vpbx:events');
const { Helpers } = require('./helpers');
const { realtime } = require('./urls');
const { userAgent } = require('./info');

/**
 * Класс для получения уведомлений от ВАТС
 */
class Realtime extends EventEmitter {
    constructor(url) {
        super();
        this.url = Helpers.pathname(url);
        this.poolHear = [];
        this.resBody = {
            success: true,
            userAgent,
        };
    }

    /**
     * Обработчик "Уведомления о вызове"
     * @return {Function}
     */
    get call() {
        return this.create('call');
    }

    /**
     * Обработчик "Уведомления о результате смс"
     * @return {Function}
     */
    get sms() {
        return this.create('sms');
    }


    /**
     * Обработчик "Уведомления о записи разговора"
     * @return {Function}
     */
    get recording() {
        return this.create('recording');
    }

    /**
     * Обработчик "Уведомления о нажатиях DTMF клавиш"
     * @return {Function}
     */
    get dtmf() {
        return this.create('dtmf');
    }


    /**
     * Обработчик "Уведомления о завершении вызова"
     * @return {Function}
     */
    get summary() {
        return this.create('summary');
    }

    /**
     * Обработчик "Проверить подключение" из ЛК
     * @return {Function}
     */
    get ping() {
        return this.create('ping');
    }

    /**
     * Обработчик всех событий
     * @return {Function}
     */
    get all() {
        return this.createAll();
    }

    /**
     * Создает обработчик
     * @param {string} en имя ивента
     * @return {Function}
     */
    create(en) {
        const pattern = new RegExp(`${realtime[en]}/?$`, 'i');
        return (req, res, next) => {
            if (pattern.test(req.path)) {
                this.debug(req);
                const payload = Helpers.parser(req.body);
                this.emit('data', payload);
                this.emit(en, payload);
                res.send(this.resBody);
                return;
            }
            next();
        };
    }

    /**
     * Создает обработчик для всех событий
     * @return {Function}
     */
    createAll() {
        let all = Object.entries(realtime).map(item => item[1]).join('|');
        all = `(${all})`;
        const pattern = new RegExp(all, 'i');
        return (req, res, next) => {
            if (pattern.test(req.path)) {
                this.debug(req);
                const eventName = req.path.replace(/.*\//g, '').trim();
                const payload = Helpers.parser(req.body);
                this.invokeHear(eventName, payload);
                this.emit('data', payload);
                res.send(this.resBody);
                return;
            }
            next();
        };
    }

    /**
     * Слушает события по фильтрам
     * @param {any} filter фильтр событий
     * @param {(e) => } handler функция обработчик
     */
    hear(filter, handler) {
        const newHear = {
            filter,
            handler
        };
        Helpers.fixStatResult(filter);
        this.poolHear.push(newHear);
    }

    /**
     * Проверяет и вызывает обработчики hear
     * @param {string} name имя ивента
     * @param {any} json параметры
     */
    invokeHear(name, json) {
        this.poolHear
            .filter(hear => hear.filter.event === name)
            .forEach((hear) => {
                const { filter } = hear;
                if (this.testFilter(filter, json)) {
                    hear.handler.call(this, json);
                }
            }, this);
    }


    /**
     * Проверяет подходит ли фильтр под параметры
     * @param {string} event имя ивента
     * @param {any} filter фильтр
     * @param {any} json параметры
     * @return {boolean}
     */
    testFilter(filter, json) {
        if (Helpers.typeOf(filter) !== 'object') {
            return false;
        }

        if (Helpers.isEmptyObject(filter)) {
            return true;
        }

        for (const key in filter) {
            if (key === 'event') continue;
            const value = filter[key];

            if (Helpers.typeOf(value) === 'regexp') {
                const result = value.test(json[key]);
                if (!result) return false;
                continue;
            }

            if (Helpers.typeOf(value) === 'object') {
                const result = this.testFilter(value, json[key]);
                if (!result) return false;
                continue;
            }

            const filterVal = Helpers.toLowerCase(value);
            const jsonVal = Helpers.toLowerCase(json[key]);

            const operators = Helpers.operatorsMatch(filterVal);
            if (operators) {
                const intFilterVal = Helpers.toNumber(filterVal);
                const intJsonVal = Helpers.toNumber(jsonVal);
                return operators
                    .slice(1)
                    .some(operator => Helpers.compare(intJsonVal, operator, intFilterVal));
            }
            if (filterVal !== jsonVal) {
                return false;
            }
        }
        return true;
    }

    /**
     * Логирует ивент
     * @param {any} req экземпляр запроса express
     */
    debug(req) {
        debug(`-> ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    }
}

module.exports = {
    Realtime,
};
