## Библиотека для API Виртуальной АТС от MANGO OFFICE

[![API Виртуальной АТС от MANGO OFFICE](https://www.mango-office.ru/upload/iblock/d11/api-icon.png "API Виртуальной АТС от MANGO OFFICE")](https://www.mango-office.ru/support/virtualnaya_ats/integratsiya_api/obshchie_voprosy_po_api_vats_mango_office/ "API Виртуальной АТС от MANGO OFFICE")
### Установка
`npm install mango-vpbx`


### Требования
NodeJS версии 8 или более

### Уникальный код продукта ВАТС (API KEY)
Код продукта можно задать через переменную `process.env.API_KEY`</br>
Или передать первый аргумент в конструктор 
`new VPBX('your-api-key-here', 'your-api-salt');`

### Уникальный ключ (API SALT)
Уникальный ключ можно задать через переменную `process.env.API_SALT`</br>
Или передать второй аргумент в конструктор 
`new VPBX('your-api-key-here', 'your-api-salt');`

### Пример использования

```javascript
const VPBX = require('mango-vpbx');
const vpbx = new VPBX();

async function main() {
    // звонок с внутреннего номера 5000 
    // на номер 74952129298
    const json = {
        from: {
            extension: '5000'
        },
        to_number: '74952129298'
    };
    const { success } = await vpbx.call(json);
}
main();
```

[Все примеры](examples/)

## класс VPBX
Класс для API Виртуальной АТС от MANGO OFFICE
</br>
</br>
Создание нового экземпляра
```javascript
const vpbx = new VPBX(apiKey, apiSalt);
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| [apiKey] | <code>string</code> | Уникальный код вашей АТС |
| [apiSalt] | <code>string</code> | Ключ для создания подписи |

## Методы
Список возможных json параметров их значений для вызова API методов доступен в [официальной документации](https://www.mango-office.ru/upload/api/MangoOffice_VPBX_API_v1.9.pdf)

Вызов методов возвращает промис, результат которого объект, содержащий свойства:

| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| success  | boolean  |  результат |
| code   | number   |  код ответа ВАТС  |
| message  | string   |  сообщение  |



### метод call
Инициирование вызова от имени сотрудника

```js
vpbx.call(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| [json.command_id] | <code>string</code> | идентификатор запроса |
| json.from | <code>object</code> | инициатор вызова |
| json.from.extension | <code>string</code> | добавочный номер сотрудника |
| [json.from.number] | <code>string</code> | номер телефона |
| json.to_number | <code>string</code> | вызываемый номер телефона |
| [json.line_number] | <code>string</code> | номер линии (АОН) |

Пример использования
```js
const json = {
    from: {
        extension: '5000'
    },
    to_number: '74952129298',
};
const { success } = await vpbx.call(json);
```

### метод callGroup
Инициирование вызова от имени группы

```js
vpbx.callGroup(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| [json.command_id] | <code>string</code> | идентификатор запроса |
| json.from | <code>string</code> | добавочный номер группы |
| json.to | <code>string</code> | вызываемый номер телефона |
| [json.line_number] | <code>string</code> | номер линии (АОН) |

Пример использования
```js
const json = {
    from: '222',
    to_number: '74991102914',
    line_number: '74952129298'
};
const { success } = await vpbx.callGroup(json);
```

### метод hangup
Завершение вызова

```js
vpbx.hangup(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| [json.command_id] | <code>string</code> | идентификатор команды |
| json.call_id | <code>string</code> | идентификатор вызова, который необходимо завершить |

Пример использования
```js
const json = {
    call_id: 'NyAoNDk1KSAyMTItOTItOTgJ'
};
const { success } = await vpbx.hangup(json);
```

### метод sms
Отправка SMS

```js
vpbx.sms(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| [json.command_id] | <code>string</code> | идентификатор команды |
| json.text | <code>string</code> | текст сообщения |
| json.from_extension | <code>string</code> | внутренний номер сотрудника |
| json.to_number | <code>string</code> | номер вызываемого телефона |
| [json.sms_sender] | <code>string</code> | имя отправителя |

Пример использования
```js
const json = {
    from_extension: '5000',
    to_number: '74952129298',
    text: 'It works'
};
const { success } = await vpbx.sms(json);
```

### метод recordingStart
Включение записи разговора

```js
vpbx.recordingStart(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| [json.command_id] | <code>string</code> | идентификатор команды |
| json.call_id | <code>string</code> | идентификатор вызова |
| json.call_party_number | <code>string</code> | номер абонента участвующего в вызове, которого нужно начать записывать. |

Пример использования
```js
const json = {
    call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
    call_party_number: '5000',
};
const { success } = await vpbx.recordingStart(json);
```

### метод route
Маршрутизация вызова

```js
vpbx.route(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| [json.command_id] | <code>string</code> | идентификатор команды |
| json.call_id | <code>string</code> | идентификатор вызова |
| json.to_number | <code>string</code> | новый номер назначения вызова |

Пример использования
```js
const json = {
    call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
    to_number: '101'
};
const { success } = await vpbx.route(json);
```


### метод transfer
Перевод вызова

```js
vpbx.transfer(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| [json.command_id] | <code>string</code> | идентификатор команды |
| json.call_id | <code>string</code> | идентификатор вызова |
| json.method | <code>string</code> | тип перевода: blind - слепой, hold - консультативный |
| json.to_number | <code>string</code> | номер (цель) перевода |
| json.initiator | <code>string</code> | участник разговора, от имени которого выполняется перевод (например, "from.extension", "from.number", "to.extension", "to.number") |

Пример использования
```js
const json = {
    call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
    method: 'blind',
    to_number: '101',
    initiator: '5000'
};
const { success } = await vpbx.transfer(json);
```

### метод stats
Запрос статистики вызовов

```js
vpbx.stats(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| json.date_from | <code>string</code> | timestamp начала |
| json.date_to | <code>string</code> | timestamp конца |
| [json.fields] | <code>string</code> | какие поля нужно отгружать |
| [json.from] | <code>object</code> | данные, относящиеся к вызывающему абоненту |
| [json.from.extension] | <code>string</code> | добавочный номер |
| [json.from.number] | <code>string</code> | номер телефона |
| [json.to] | <code>object</code> | данные, относящиеся к вызываемому абоненту |
| [json.to.extension] | <code>string</code> | добавочный номер |
| [json.to.number] | <code>string</code> | номер телефона |
| [json.call_party] | <code>object</code> | данные, относящиеся к вызываемому или вызывающему абоненту. Использование поля допустимо только без заполнения полей to и from |
| [json.call_party.extension] | <code>string</code> | добавочный номер |
| [json.call_party.number] | <code>string</code> | номер телефона |
| [json.request_id] | <code>string</code> | идентификатор запроса |

Пример использования
```js
const json = {
    date_from: '1481630491',
    date_to: '1481734491'
};
const { success, stats } = await vpbx.stats(json);
```

### метод recording
Получение записи разговора посредством POST запроса

```js
vpbx.recording(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| json.recording_id | <code>string</code> | идентификатор записи разговора |
| json.folder | <code>string</code> | абсолютный путь до папки, для сохранения записи разговора |

Пример использования
```js
const json = {
    recording_id: 'MToxMjI3NTM6MzUwNzMxMDk4NTow',
    folder: 'C:/mango-vpbx/downloads/'
};
const { success, file } = await vpbx.recording(json);
```

### метод users
Запрос списка сотрудников ВАТС

```js
vpbx.users(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| [json] | <code>object</code> | параметры |
| [json.extension] | <code>string</code> | добавочный номер сотрудника |

Пример использования
```js
const { success, users } = await vpbx.users();
```

### метод dctUserInfo
Запрос информации о посетителе сайта по динамическому номеру

```js
vpbx.dctUserInfo(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| json.number | <code>string</code> | динамический номер |

Пример использования
```js
const json = { number: '74952129298' };
const { success, dctUserInfo } = await vpbx.dctUserInfo(json);
```

### метод dctUserHistory
Запрос истории навигации посетителя сайта по динамическому номеру

```js
vpbx.dctUserHistory(json); // => Promise<any>
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| json | <code>object</code> | параметры |
| json.number | <code>string</code> | динамический номер |

Пример использования
```js
const json = { number: '74952129298' };
const { success, dctUserHistory } = await vpbx.dctUserHistory(json);
```

## API RealTime
API Realtime представляет собой набор запросов (уведомлений), которые направляются к внешней системе.

### метод events
Cоздает обработчики для прослушивания событий от ВАТС
```js
vpbx.events(url); // => Realtime
```

| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| url  | string   |  адрес внешней системы  |

Пример использования
```js
const app = require('express')();
const bodyParser = require('body-parser');

const VPBX = require('mango-vpbx');

const vpbx = new VPBX();

const events = vpbx.events('http://example.com/mango-vpbx');

app.use(bodyParser.urlencoded());

app.use(events.call);
app.use(events.summary);
app.use(events.recording);
app.use(events.dtmf);
app.use(events.sms);
app.use(events.ping);


events.on('call', e => console.log('on events/call', e));
events.on('summary', e => console.log('on events/summary', e));
events.on('recording', e => console.log('on events/recording', e));
events.on('dtmf', e => console.log('on events/dtmf', e));
events.on('sms', e => console.log('on events/sms', e));
events.on('ping', e => console.log('check connection', e));

events.on('data', e => console.log('on any events', e));

app.use((req, res) => res.status(404).send({ error: 'not found' }));
app.listen(80);

```

## Класс Realtime
Класс для создания обработчиков и получения уведомлений от ВАТС

### метод call
Обработчик "Уведомления о вызове"
```js
Realtime.call; // => Function
```

### метод sms
Обработчик "Уведомления о результате смс"
```js
Realtime.sms; // => Function
```

### метод recording
Обработчик "Уведомления о записи разговора"
```js
Realtime.recording; // => Function
```

### метод dtmf
Обработчик "Уведомления о нажатиях DTMF клавиш"
```js
Realtime.dtmf; // => Function
```

### метод summary
Обработчик "Уведомления о завершении вызова"
```js
Realtime.summary; // => Function
```

### метод ping
Обработчик "Проверить подключение" из Личного кабинета
```js
Realtime.ping; // => Function
```

### метод all
Обработчик всех событий (только для метода hear)
```js
Realtime.all; // => Function
```

### метод hear
Слушает события по заданному фильтру
```js
Realtime.hear(filter, handler); // => void
```
| Параметр  | Тип  | Описание |
| --------- | ---- | -------- |
| filter  | object  |  фильтр для событий  |
| handler  | function   |  функция-обработчик  |

Аргумент `filter` должен иметь обязательное свойство `event` - имя события 
(возможные значения: 'call', 'recording', 'summary', 'dtmf', 'sms', 'callback', 'stats', 'ping')

Функция `handler` в качестве первого аргумента принимает json-объект, содержащий параметры события (список передаваемых параметров доступен в [официальной документации](https://www.mango-office.ru/upload/api/MangoOffice_VPBX_API_v1.9.pdf))

Пример использования
```js

const app = require('express')();
const bodyParser = require('body-parser');

const VPBX = require('mango-vpbx');

const vpbx = new VPBX();

const events = vpbx.events('http://example.com/mango-vpbx');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(events.all);

events.hear({ event: 'ping' }, e => console.log('ping works!'));
events.hear({ event: 'call' }, e => console.log('call event', e.location, e.call_state));

app.use((req, res) => res.status(404).send({ error: 'not found' }));
app.listen(80);

```


Обработчик "уведомления о завершении вызова" будет вызван только для исходящего звонка:
```js
events.hear({ event: 'summary', call_direction: '2' }, e => console.log('завершился исходящий звонок', e.entry_id));
```

Фильтр может состоять из нескольких параметров:
```js
events.hear({ event: 'recording', recording_state: 'Completed', completion_code: '1000' }, e => console.log('новая запись разговора!', e.recording_id));
```

В параметрах допускаются регулярные выражения:
```js
events.hear({ event: 'summary', call_direction: /[12]/ }, e => console.log('события завершения входящего/исходящего вызовов', e));
```

[Все примеры](examples/)

## Отладка
 Для логирования запросов необходимо задать переменную `process.env.DEBUG=mango-vpbx:worker`

 Пример лога:
 ```
  mango-vpbx:worker <- POST https://app.mango-office.ru/vpbx/commands/callback +213ms
  mango-vpbx:worker {"vpbx_api_key":"2fn293fg43gfh02h4ub3jd23o312u4bc","sign":"394h39ufhi20jg5gj54j9ug2i0j20j3ig0edjbopeef3ojefrf0e3ie2fjojejf0","json":"{\"from\":{\"extension\":\"5000\",\"number\":\"74991102914\"},\"to_number\":\"74952129298\",\"command_id\":\"cmd-1516131681519\"}"} +1ms
  mango-vpbx:worker -> 200 OK +189ms
 ```
   
   Для логирования ивентов необходимо задать переменную `process.env.DEBUG=mango-vpbx:events`

   Пример лога:

 ```
mango-vpbx:events -> POST /events/call {"vpbx_api_key":"2fn293fg43gfh02h4ub3jd23o312u4bc","sign":"394h39ufhi20jg5gj54j9ug2i0j20j3ig0edjbopeef3ojefrf0e3ie2fjojejf0","json":"{\"entry_id\":\"MzUyODbvczg4OTo0MDE=\",\"call_id\":\"MzUyODbvczg4OTo0MDEMzUyODbvczg4O\",\"timestamp\":1522347638,\"seq\":1,\"call_state\":\"Appeared\",\"location\":\"abonent\",\"from\":{\"number\":\"74991102914\",\"taken_from_call_id\":\"MzUyODbvczg4OMzUyODbvczg4OMzUyODbvcg\"},\"to\":{\"extension\":\"101\",\"number\":\"sip:example@domain.mangosip.ru\",\"line_number\":\"74952129298\",\"acd_group\":\"22\"},\"dct\":{\"type\":0}}"} +0ms
 ```


Для логирования запросов и ивентов необходимо задать переменную `process.env.DEBUG=mango-vpbx:*`