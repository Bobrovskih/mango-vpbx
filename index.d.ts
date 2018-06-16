export default VPBX;

/**
 * Класс для API Виртуальной АТС от MANGO OFFICE
 */
declare class VPBX {
    /**
     * @param apiKey Уникальный код вашей АТС
     * @param apiSalt Ключ для создания подписи
     */
    constructor(apiKey?: string, apiSalt?: string);
    /** Выполняет запрос на звонок */
    call: (json: CallOptions) => Promise<CallResponse>;
    /** Выполняет запрос на групповой звонок */
    callGroup: (json: CallGroupOptions) => Promise<CallGroupResponse>;
    /** Выполняет запрос сотрудников. Без параметров вернет всех сотрудников. */
    users: (json?: UsersOptions) => Promise<UsersResponse>;
    /** Выполняет запрос статистики */
    stats: (json: StatsOpions) => Promise<StatsResponse>;
    /** Выполняет запрос на отправку смс */
    sms: (json: SmsOptions) => Promise<SmsResponse>;
    /** Выполняет запрос записи разговора */
    recording: (json: RecordingOptions) => Promise<RecordingResponse>;
    /** Выполняет запрос для завершения вызова */
    hangup: (json: HangupOptions) => Promise<HangupResponse>;
    /** Запрос для включения записи разговора */
    recordingStart: (json: RecordingStartOptions) => Promise<RecordingStartResponse>;
    /** Запрос для маршрутизации вызова */
    route: (json: RouteOptions) => Promise<RouteResponse>;
    /** Запрос для перевода вызова */
    transfer: (json: TransferOptions) => Promise<TransferResponse>;
    /** Запрос информации о посетителе сайта по динамическому номеру */
    dctUserInfo: (json: DctUserInfoOptions) => Promise<DctUserInfoResponse>;
    /** Запрос истории навигации посетителя сайта по динамическому номеру */
    dctUserHistory: (json: DctUserHistoryOptions) => Promise<DctUserHistoryResponse>;
    /** Создает обработчики для прослушивания событий от ВАТС (API RealTime) */
    events: (url: string) => Realtime;
}


/**
 * Результат API вызова
 */
declare class BasicResponse {
    /** результат */
    success: boolean;
    /** код ответа ВАТС */
    code: number;
    /** сообщение */
    message: string;
}

declare class CallGroupResponse extends BasicResponse { }

declare class CallOptions {
    /** инициатор вызова */
    from: {
        /** добавочный номер сотрудника */
        extension: string;
        /** номер телефона */
        number?: string;
    };
    /** вызываемый номер телефона */
    to_number: string;
    /** идентификатор запроса */
    command_id?: string;
    /** номер линии (АОН) */
    line_number?: string;
    /** SIP заголовки */
    sip_headers?: {
        /** автоответ через n секунд */
        answer_after?: string;
    };
}

declare class CallResponse extends BasicResponse { }

declare class CallGroupOptions {
    /** идентификатор запроса */
    command_id?: string;
    /** добавочный номер группы */
    from: string;
    /** вызываемый номер телефона */
    to: string;
    /** номер линии (АОН) */
    line_number?: string;
}

declare class UsersOptions {
    /** добавочный номер сотрудника */
    extension?: string;
}

declare class UsersResponse extends BasicResponse {
    /** сотрудники */
    users: string[];
}

declare class StatsOpions {
    /** timestamp начала */
    date_from: string;
    /** timestamp конца */
    date_to: string;
    /** список полей включаемые в выгрузку (через запятую).
     * возможные значения: "records, start, finish, answer, from_extension, from_number, to_extension, to_number, disconnect_reason, line_number, location, entry_id"
     */
    fields?: string;
    /** данные, относящиеся к вызывающему абоненту */
    from?: {
        /** добавочный номер */
        extension?: string;
        /** номер телефона */
        number?: string;
    };
    /** данные, относящиеся к вызываемому абоненту */
    to?: {
        /** добавочный номер */
        extension?: string;
        /** номер телефона */
        number?: string;
    };
    /** данные, относящиеся к вызываемому или вызывающему абоненту.
	 * Использование поля допустимо только без заполнения полей to и from */
    call_party?: {
        /** добавочный номер */
        extension?: string;
        /** номер телефона */
        number?: string;
    }
    /** идентификатор запроса */
    request_id?: string;
    /** только входящие звонки */
    incoming: boolean;
    /** только исходящие звонки */
    outgoing: boolean;
    /** только неуспешные звонки */
    fail: boolean;
    /** только успешные звонки */
    success: boolean;
}

declare class StatsResponse extends BasicResponse {
    /** статистика  */
    stats: string[][];
}

declare class SmsOptions {
    /** идентификатор команды */
    command_id?: string;
    /** текст сообщения */
    text?: string;
    /** внутренний номер сотрудника */
    from_extension: string;
    /** номер вызываемого телефона */
    to_number: string;
    /** имя отправителя */
    sms_sender?: string;
}

declare class SmsResponse extends BasicResponse { }

declare class RecordingOptions {
    /** идентификатор записи разговора */
    recording_id: string;
    /** абсолютный путь до папки, для сохранения записи разговора */
    folder?: string;
    /** время жизни ссылки ('MAX' = 1000 лет), для получения ссылки на запись разговора */
    expires?: 'MAX' | number | Date | string;
}

declare class RecordingResponse extends BasicResponse {
    /** путь на диске или ссылка на запись разговора */
    recording: string;
}

declare class HangupOptions {
    /** идентификатор команды */
    command_id?: string;
    /** идентификатор вызова, который необходимо завершить */
    call_id: string;
}

declare class HangupResponse extends BasicResponse { }

declare class RecordingStartOptions {
    /** идентификатор команды */
    command_id?: string;
    /** идентификатор вызова */
    call_id: string;
    /** номер абонента участвующего в вызове, которого нужно начать записывать. */
    call_party_number: string;
}

declare class RecordingStartResponse extends BasicResponse { }


declare class RouteOptions {
    /** идентификатор вызова */
    call_id: string;
    /** новый номер назначения вызова */
    to_number: string;
    /** идентификатор команды */
    command_id?: string;
    /** SIP заголовки */
    sip_headers?: {
        display_name?: string;
    }
}

declare class RouteResponse extends BasicResponse { }


declare class TransferOptions {
    /** идентификатор команды */
    command_id?: string;
    /** идентификатор вызова */
    call_id: string;
    /** тип перевода: blind - слепой, hold - консультативный */
    method: 'blind' | 'hold';
    /** номер (цель) перевода */
    to_number: string;
    /** участник разговора, от имени которого выполняется перевод
	 * (например, "from.extension", "from.number", "to.extension", "to.number") */
    initiator: string;
}

declare class TransferResponse extends BasicResponse { }

declare class DctUserInfoOptions {
    /** динамический номер */
    number: string;
}

declare class DctUserInfoResponse extends BasicResponse {
    /** информация о посетителе */
    dctUserInfo: any[];
}

declare class DctUserHistoryOptions {
    /** динамический номер */
    number: string;
}

declare class DctUserHistoryResponse extends BasicResponse {
    /** история навигации посетителя */
    dctUserHistory: any[];
}

declare class Realtime extends NodeJS.EventEmitter {
    /**
     * @param url адрес внешней системы
     */
    constructor(url: string);
    /** Обработчик "Уведомления о вызове" */
    call: ExpressMiddleware;
    /** Обработчик "Уведомления о результате смс" */
    sms: ExpressMiddleware;
    /** Обработчик "Уведомления о записи разговора" */
    recording: ExpressMiddleware;
    /** Обработчик "Уведомления о нажатиях DTMF клавиш" */
    dtmf: ExpressMiddleware;
    /** Обработчик "Уведомления о завершении вызова" */
    summary: ExpressMiddleware;
    /** Обработчик "Проверить подключение" из ЛК */
    ping: ExpressMiddleware;
    /** Обработчик всех событий */
    all: ExpressMiddleware;
    /**
     * Слушает события по фильтрам
     * @param filter фильтр для событий
     * @param handler функция обратного вызова
     */
    hear(filter: any, handler: (e: any) => any): void;
}

type ExpressMiddleware = (req: any, res: any, next: () => any) => any;
