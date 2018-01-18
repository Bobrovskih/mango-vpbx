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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| apiKey  | string   |  код продукта  |
| apiSalt  | string   |  ключ продукта  |

## Методы
Список возможных json параметров их значений для вызова API методов доступен в [официальной документации](https://www.mango-office.ru/upload/api/MangoOffice_VPBX_API_v1.9.pdf)
### метод call
Инициирование вызова от имени сотрудника

```js
vpbx.call(json); // => Promise<any>
```
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

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
| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| json  | object   |  параметры  |

Пример использования
```js
const { success, users } = await vpbx.users();
```

## API RealTime
API Realtime представляет собой набор запросов (уведомлений), которые направляются к внешней системе.

### метод events
Cоздает обработчики для прослушивания событий от ВАТС
```js
vpbx.events(url); // => Realtime
```

| Аргумент  | Тип  | Описание|
| ------------ | ------------ |------------ |
| url  | string   |  адрес внешней системы  |

Пример использования
```js
const app = require('express')();

const VPBX = require('mango-vpbx');

const vpbx = new VPBX();

const events = vpbx.events('http://localhost/endpoint/example');

app.use(events.call);
app.use(events.summary);
app.use(events.recording);
app.use(events.dtmf);
app.use(events.sms);

events.on('call', e => console.log('on events/call', e));
events.on('summary', e => console.log('on events/summary', e));
events.on('recording', e => console.log('on events/recording', e));
events.on('dtmf', e => console.log('on events/dtmf', e));
events.on('sms', e => console.log('on events/sms', e));

events.on('data', e => console.log('on any events', e));

app.use((req, res) => res.status(404).send({ error: 'not found' }));

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


## Отладка
 Для логирования запросов необходимо задать переменную `process.env.DEBUG=mango-vpbx:worker`
 <br>
 Пример лога:
 ```
  mango-vpbx:worker <- POST https://app.mango-office.ru/vpbx/commands/callback +213ms
  mango-vpbx:worker {"vpbx_api_key":"2fn293fg43gfh02h4ub3jd23o312u4bc","sign":"394h39ufhi20jg5gj54j9ug2i0j20j3ig0edjbopeef3ojefrf0e3ie2fjojejf0","json":"{\"from\":{\"extension\":\"5000\",\"number\":\"74991102914\"},\"to_number\":\"74952129298\",\"command_id\":\"cmd-1516131681519\"}"} +1ms
  mango-vpbx:worker -> 200 OK +189ms
 ```
