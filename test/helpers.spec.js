const {	expect } = require('chai');

const { Helpers } = require('../src/helpers');
const parameters = require('../src/parameters');

describe('метод Helpers.filter ( * - вложенные )', () => {
    it('неверные *string; statsRequest', () => {
        const source = {
            date_from: '1481630491',
            date_to: '1481734491',
            from: {
                ext: '5000'
            }
        };
        const due = {
            date_from: '1481630491',
            date_to: '1481734491'
        };

        const mask = parameters.statsRequest;
        const result = Helpers.filter(source, mask);

        expect(result).deep.equal(due);
    });

    it('неверные string; statsRequest', () => {
        const source = {
            date_from: '1481630491',
            date_to: '1481734491',
            filds: 'records,start,finish',
            from: {
                extension: '5000'
            }
        };
        const due = {
            date_from: '1481630491',
            date_to: '1481734491',
            from: {
                extension: '5000'
            }
        };

        const mask = parameters.statsRequest;
        const result = Helpers.filter(source, mask);

        expect(result).deep.equal(due);
    });

    it('неверные string, string; statsRequest ', () => {
        const source = {
            date_from: '1481630491',
            date_to: '1481734491',
            filds: 'records,start,finish',
            from: {
                extension: '5000'
            },
            fail: 'deleteplz'
        };
        const due = {
            date_from: '1481630491',
            date_to: '1481734491',
            from: {
                extension: '5000'
            }
        };

        const mask = parameters.statsRequest;
        const result = Helpers.filter(source, mask);

        expect(result).deep.equal(due);
    });

    it('неверные *boolean, string; statsRequest', () => {
        const source = {
            date_from: '1481630491',
            date_to: '1481734491',
            filds: 'records,start,finish',
            from: {
                extension: '5000',
                wrongProp: true
            },
            fail: 'deleteplz'
        };
        const due = {
            date_from: '1481630491',
            date_to: '1481734491',
            from: {
                extension: '5000'
            }
        };

        const mask = parameters.statsRequest;
        const result = Helpers.filter(source, mask);

        expect(result).deep.equal(due);
    });

    it('неверные *[], []; statsRequest', () => {
        const source = {
            date_from: '1481630491',
            date_to: '1481734491',
            filds: 'records,start,finish',
            from: {
                extension: '5000',
                wrongProp: []
            },
            wrong: [{
                success: true
            }]
        };
        const due = {
            date_from: '1481630491',
            date_to: '1481734491',
            from: {
                extension: '5000'
            }
        };

        const mask = parameters.statsRequest;
        const result = Helpers.filter(source, mask);

        expect(result).deep.equal(due);
    });

    it('верные; statsRequest', () => {
        const source = {
            date_from: '1481630491',
            date_to: '1481637491',
            fields: 'record, start, finish',
            from: {
                extension: '5000',
                number: '74951002030'
            },
            to: {
                extension: '6000',
                number: '74954005060'
            },
            call_party: {
                extension: '222',
                number: '74957008090'
            },
            request_id: 'customreqid'
        };
        const due = {
            date_from: '1481630491',
            date_to: '1481637491',
            fields: 'record, start, finish',
            from: {
                extension: '5000',
                number: '74951002030'
            },
            to: {
                extension: '6000',
                number: '74954005060'
            },
            call_party: {
                extension: '222',
                number: '74957008090'
            },
            request_id: 'customreqid'
        };

        const mask = parameters.statsRequest;
        const result = Helpers.filter(source, mask);

        expect(result).deep.equal(due);
    });

    it('пустой {}; users', () => {
        const source = {};
        const due = {};

        const mask = parameters.users;
        const result = Helpers.filter(source, mask);

        expect(result).deep.equal(due);
    });

    it('неверные string; call', () => {
        const source = {
            command_id: 'cmd-1241221',
            from: {
                extension: '5000',
                nomer: '74952129298'
            },
            to_number: '74951002030'
        };
        const due = {
            command_id: 'cmd-1241221',
            from: {
                extension: '5000'
            },
            to_number: '74951002030'
        };
        const mask = parameters.call;
        const result = Helpers.filter(source, mask);

        expect(result).deep.equal(due);
    });

    it('route + sip_headers', () => {
        const json = {
            call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
            to_number: '101',
            sip_headers: {
                display_name: 'Ded Moroz',
                'From/display-name': 'Ded Moroz',
            },
        };
        const due = {
            call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
            to_number: '101',
            sip_headers: {
                'From/display-name': 'Ded Moroz',
            },
        };

        const result = Helpers.filter(json, parameters.route);
        expect(result).deep.equal(due);
    });

    it('callback + sip_headers', () => {
        const json = {
            from: {
                extension: '101'
            },
            to_number: '74952129298',
            sip_headers: {
                answer_after: '5',
                'Call-Info/answer-after': '5',
            },
        };

        const due = {
            from: {
                extension: '101'
            },
            to_number: '74952129298',
            sip_headers: {
                'Call-Info/answer-after': '5',
            },
        };

        const result = Helpers.filter(json, parameters.call);
        expect(result).deep.equal(due);
    });
});

describe('метод Helpers.isEmptyObject', () => {
    it('{}', () => {
        const source = {};
        const result = Helpers.isEmptyObject(source);
        expect(result).equal(true);
    });

    it('"hello"', () => {
        const source = 'hello';
        const result = Helpers.isEmptyObject(source);
        expect(result).equal(false);
    });

    it('10', () => {
        const source = 10;
        const result = Helpers.isEmptyObject(source);
        expect(result).equal(false);
    });

    it('null', () => {
        const source = null;
        const result = Helpers.isEmptyObject(source);
        expect(result).equal(false);
    });

    it('true', () => {
        const source = true;
        const result = Helpers.isEmptyObject(source);
        expect(result).equal(false);
    });

    it('[]', () => {
        const source = [];
        const result = Helpers.isEmptyObject(source);
        expect(result).equal(false);
    });

    it('', () => {
        const source = '';
        const result = Helpers.isEmptyObject(source);
        expect(result).equal(false);
    });

    it('undefined', () => {
        const source = undefined;
        const result = Helpers.isEmptyObject(source);
        expect(result).equal(false);
    });

    it('Symbol({})', () => {
        const source = Symbol({});
        const result = Helpers.isEmptyObject(source);
        expect(result).equal(false);
    });
});

describe('метод Helpers.typeOf', () => {
    it('boolean', () => {
        const source = false;
        const result = Helpers.typeOf(source);
        expect(result).equal('boolean');
    });

    it('number', () => {
        const source = 1;
        const result = Helpers.typeOf(source);
        expect(result).equal('number');
    });

    it('string', () => {
        const source = 'hello';
        const result = Helpers.typeOf(source);
        expect(result).equal('string');
    });

    it('object', () => {
        const source = {};
        const result = Helpers.typeOf(source);
        expect(result).equal('object');
    });

    it('array', () => {
        const source = [];
        const result = Helpers.typeOf(source);
        expect(result).equal('array');
    });

    it('null', () => {
        const source = null;
        const result = Helpers.typeOf(source);
        expect(result).equal('null');
    });

    it('undefined', () => {
        const source = undefined;
        const result = Helpers.typeOf(source);
        expect(result).equal('undefined');
    });

    it('symbol', () => {
        const source = Symbol('example');
        const result = Helpers.typeOf(source);
        expect(result).equal('symbol');
    });

    it('regexp', () => {
        const source = RegExp('test', 'i');
        const result = Helpers.typeOf(source);
        expect(result).equal('regexp');
    });
});

describe('метод Helpers.stats.toArray', () => {
    it('случайная выгрузка', () => {
        const source = '[];1481630614;1481630633;1481630614;131;sip:a.mango@domain.mangosip.ru;;sip:user2@domain.mangosip.ru;1110;;abonent\r\n[];1481630686;1481630703;1481630687;131;sip:a.mango@domain.mangosip.ru;;sip:user2@domain.mangosip.ru;1110;;abonent';
        const due = [
            [
                '[]',
                '1481630614',
                '1481630633',
                '1481630614',
                '131',
                'sip:a.mango@domain.mangosip.ru',
                '',
                'sip:user2@domain.mangosip.ru',
                '1110',
                '',
                'abonent'
            ],
            [
                '[]',
                '1481630686',
                '1481630703',
                '1481630687',
                '131',
                'sip:a.mango@domain.mangosip.ru',
                '',
                'sip:user2@domain.mangosip.ru',
                '1110',
                '',
                'abonent'
            ]
        ];
        const result = Helpers.stats.toArray(source);
        expect(result).deep.equal(due);
    });
});

describe('метод Helpers.isSuccess', () => {
    it('code 0', () => {
        const source = 0;
        const due = true;

        const result = Helpers.isSuccess(source);
        expect(result).equal(due);
    });

    it('code 3103', () => {
        const source = 3103;
        const due = false;

        const result = Helpers.isSuccess(source);
        expect(result).equal(due);
    });

    it('code 1000', () => {
        const source = 1000;
        const due = true;

        const result = Helpers.isSuccess(source);
        expect(result).equal(due);
    });
});

describe('метод Helpers.url', () => {
    it('call', () => {
        const source = 'call';
        const due = 'https://app.mango-office.ru/vpbx/commands/callback';

        const result = Helpers.url(source);
        expect(result).equal(due);
    });

    it('statsRequest', () => {
        const source = 'statsRequest';
        const due = 'https://app.mango-office.ru/vpbx/stats/request';

        const result = Helpers.url(source);
        expect(result).equal(due);
    });

    it('hangup', () => {
        const source = 'hangup';
        const due = 'https://app.mango-office.ru/vpbx/commands/call/hangup';

        const result = Helpers.url(source);
        expect(result).equal(due);
    });
});

describe('метод Helpers.createForm', () => {
    it('случайная форма', () => {
        const src = {
            apiKey: 'ekfn3fno329f204fj59g23h0f294f23d',
            apiSalt: 'idn239uf90i1d23283dh204gfh23dj3d',
            params: {
                date_from: '1481630491',
                date_to: '1481734491'
            },
            method: 'statsRequest'
        };
        const due = {
            vpbx_api_key: 'ekfn3fno329f204fj59g23h0f294f23d',
            sign: '727f134b4ae7b45e71e08b2ff2d846a1cf0460119cd4a351754c5365817f8068',
            json: '{"date_from":"1481630491","date_to":"1481734491"}'
        };
		
        const result = Helpers.createForm(src.apiKey, src.apiSalt, src.params, src.method);
        expect(result).deep.equal(due);
    });
});

describe('метод Helpers.setCommandId', () => {
    it('установка по-умолчанию', () => {
        const source = {
            from: {
                extension: '5000'
            },
            to_number: '74952129298'
        };

        Helpers.setCommandId(source);
        /* eslint no-unused-expressions: "off" */
        expect(source.command_id).to.exist;
    });

    it('случайный', () => {
        const source = {
            from: {
                extension: '5000'
            },
            to_number: '74952129298',
            command_id: 'mycmd-1242153254'
        };
        const due = 'mycmd-1242153254';

        Helpers.setCommandId(source);
        expect(source.command_id).to.equal(due);
    });
});

describe('метод Helpers.toNumber', () => {
    it('">=1000"', () => {
        const source = '>=1000';
        const due = 1000;

        const result = Helpers.toNumber(source);
        expect(result).equal(due);
    });

    it('1010', () => {
        const source = 1010;
        const due = 1010;

        const result = Helpers.toNumber(source);
        expect(result).equal(due);
    });

    it('<1516454940', () => {
        const source = '<1516454940';
        const due = 1516454940;

        const result = Helpers.toNumber(source);
        expect(result).equal(due);
    });

    it('""', () => {
        const source = '';
        const due = 0;

        const result = Helpers.toNumber(source);
        expect(result).equal(due);
    });
});

describe('метод Helpers.toLowerCase', () => {
    it('"DisconnEcted"', () => {
        const source = 'DisconnEcted';
        const due = 'disconnected';

        const result = Helpers.toLowerCase(source);
        expect(result).equal(due);
    });

    it('{ field: 10 }', () => {
        const source = {
            field: 10
        };

        const result = Helpers.toLowerCase(source);
        expect(result).equal(source);
    });

    it('cloud', () => {
        const source = 'cloud';

        const result = Helpers.toLowerCase(source);
        expect(result).equal(source);
    });
});

describe('метод Helpers.compare', () => {
    it('10 > 2 ', () => {
        const source = [10, '>', 2];
        const due = true;

        const result = Helpers.compare(...source);
        expect(result).equal(due);
    });

    it('10 = 10 ', () => {
        const source = [10, '=', 10];
        const due = true;

        const result = Helpers.compare(...source);
        expect(result).equal(due);
    });

    it('7 < 10 ', () => {
        const source = [7, '<', 10];
        const due = true;

        const result = Helpers.compare(...source);
        expect(result).equal(due);
    });

    it('12 < 12 ', () => {
        const source = [12, '<', 10];
        const due = false;

        const result = Helpers.compare(...source);
        expect(result).equal(due);
    });
});

describe('метод Helpers.operatorMatch', () => {
    it('>=12421218', () => {
        const source = '>=12421218';
        const due = ['>=', '>', '='];

        const result = Helpers.operatorsMatch(source);
        expect(result).deep.equal(due);
    });

    it('>12421218', () => {
        const source = '>12421218';
        const due = ['>', '>'];

        const result = Helpers.operatorsMatch(source);
        expect(result).deep.equal(due);
    });

    it('12421218', () => {
        const source = '12421218';
        const due = null;

        const result = Helpers.operatorsMatch(source);
        expect(result).deep.equal(due);
    });
});

describe('метод Helpers.parser', () => {
    it('случайные параметры ', () => {
        const source = {
            vpbx_api_key: 'woejf2i030dnjewoxnkwjfnlnfdslfsd',
            sign: 'f2f8c654fa7ef2w2x2wd2d2gregef3cb602a4d5a24dc3dfefh2hf20eudh20dhw',
            json: '{"entry_id":"MzUyODcyNDMyMzo0Mg==","call_id":"MTo","seq":1}'
        };

        const due = {
            entry_id: 'MzUyODcyNDMyMzo0Mg==',
            call_id: 'MTo',
            seq: 1
        };

        const result = Helpers.parser(source);
        expect(result).deep.equal(due);
    });
});

describe('метод Helpers.fixStatResult', () => {
    it('фильтр stats', () => {
        const source = {
            event: 'stats'
        };
        const due = {
            event: 'stat'
        };

        const result = Helpers.fixStatResult(source);
        expect(source).deep.equal(due);
    });
});

describe('метод Helpers.mapSipHeaders', () => {
    it('answer_after => Call-Info/answer-after', () => {
        const json = {
            from: {
                extension: '101'
            },
            to_number: '74952129298',
            sip_headers: {
                answer_after: '5'
            },
        };
        Helpers.mapSipHeaders(json);
        const due = {
            from: {
                extension: '101'
            },
            to_number: '74952129298',
            sip_headers: {
                answer_after: '5',
                'Call-Info/answer-after': '5',
            },
        };
        expect(json).deep.equal(due);
    });

    it('not modified', () => {
        const json = {
            from: {
                extension: '101'
            },
            to_number: '74952129298',
        };
        Helpers.mapSipHeaders(json);
        const due = {
            from: {
                extension: '101'
            },
            to_number: '74952129298',
        };
        expect(json).deep.equal(due);
    });

    it('display_name => From/display-name', () => {
        const json = {
            call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
            to_number: '101',
            sip_headers: {
                display_name: 'Santa Claus',
            },
        };
        const due = {
            call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
            to_number: '101',
            sip_headers: {
                display_name: 'Santa Claus',
                'From/display-name': 'Santa Claus',
            },
        };
        Helpers.mapSipHeaders(json);
        expect(json).deep.equal(due);
    });
});

describe('метод Helpers.setAction', () => {
    it('recording link play', () => {
        const json = {
            recording_id: 'QWkkefdnsfsd32',
        };
        Helpers.setAction(json, 'play');
        const due = {
            recording_id: 'QWkkefdnsfsd32',
            action: 'play',
        };
        expect(json).deep.equal(due);
    });

    it('recording post download', () => {
        const json = {
            recording_id: 'QWkkefdnsfsd32',
        };
        Helpers.setAction(json);
        const due = {
            recording_id: 'QWkkefdnsfsd32',
            action: 'download',
        };
        expect(json).deep.equal(due);
    });

    it('не меняется', () => {
        const json = {
            recording_id: 'QWkkefdnsfsd32',
            action: 'play',
        };
        Helpers.setAction(json);
        const due = {
            recording_id: 'QWkkefdnsfsd32',
            action: 'play',
        };
        expect(json).deep.equal(due);
    });
});
describe('метод Helpers.mapExpires', () => {
    it('MAX', () => {
        const json = {
            recording_id: 'Fgkhgdfkl32432r',
            expires: 'MAX',
        };

        Helpers.mapExpires(json);
        const result = json.expires;
        const now = Math.floor(Date.now() / 1000);
        expect(result).gt(now);
    });

    it('Date', () => {
        const expires = new Date(Date.now() + 10000);
        const json = {
            recording_id: 'Fgkhgdfkl32432r',
            expires,
        };

        Helpers.mapExpires(json);
        const result = json.expires;
        const now = Math.floor(Date.now() / 1000);
        expect(result).gt(now);
    });

    it('timestamp', () => {
        const expires = Date.now() + 1000000;
        const json = {
            recording_id: 'Fgkhgdfkl32432r',
            expires,
        };

        Helpers.mapExpires(json);
        const result = json.expires;
        const now = Math.floor(Date.now() / 1000);
        expect(result).gt(now);
    });
});

describe('метод Helpers.recordingLink', () => {
    it('recordingLink', () => {
        const apiKey = '123';
        const apiSalt = '789';
        const json = {
            recording_id: 'Jsgdfg2323=',
            action: 'play',
            expires: 1525598918779,
        };
        const result = Helpers.createUrl(apiKey, apiSalt, json, 'recordingLink');
        const due = 'https://app.mango-office.ru/vpbx/queries/recording/link/Jsgdfg2323=/play/123/1525598918779/73ae025f1b4f7e201b2bf8df8a98547faa916a906115c22356cd056ab8edd5cd';
        expect(result).equal(due);
    });
});

describe('метод Helpers.stats.normalizeFields', () => {
    it('без fields, запрос без фильтра', () => {
        const json = {
            date_from: '1481630491',
            date_to: '1481630491',
        };
        Helpers.stats.normalizeFields(json);
        const due = 'records,start,finish,answer,from_extension,from_number,to_extension,to_number,disconnect_reason,line_number,location,entry_id';
        expect(due).equal(json.fields);
    });
    it('без fields, запрос только пропущенных', () => {
        const json = {
            date_from: '1481630491',
            date_to: '1481630491',
            missed: true,
        };
        Helpers.stats.normalizeFields(json);
        const due = 'records,start,finish,answer,from_extension,from_number,to_extension,to_number,disconnect_reason,line_number,location,entry_id';
        expect(due).equal(json.fields);
    });

    it('кастомные fields, запрос без фильтра', () => {
        const json = {
            date_from: '1481630491',
            date_to: '1481630491',
            fields: 'records, from_number, line_number',
        };
        Helpers.stats.normalizeFields(json);
        const due = 'records, from_number, line_number';
        expect(due).equal(json.fields);
    });

    it('кастомные fields, запрос только успешных', () => {
        const json = {
            date_from: '1481630491',
            date_to: '1481630491',
            fields: 'records, from_number, line_number',
            fail: true,
        };
        Helpers.stats.normalizeFields(json);
        const due = 'records,from_number,line_number,from_extension,answer,entry_id';
        expect(due).equal(json.fields);
    });
});

describe('метод Helpers.stats.filter', () => {
    let stats = [];
    let fieldsArr = [];
    let fields = '';

    beforeEach(() => {
        const raw = `[];1529132400;1529132439;1529132404;1112;sip:user5@mangosip.ru;;sip:user2@mangosip.ru;1110;;abonent;NDExMjgxODg2Ng==
		[];1529132485;1529132537;1529132488;1112;sip:user5@mangosip.ru;;sip:user2@mangosip.ru;1110;;abonent;NDExMjgyNzA3OA==
		[];1529133870;1529133879;0;4664;sip:user1@mangosip.ru;;sip:user4@mangosip.ru;1100;;abonent;NDExMjk1Njc0Ng==
		[];1529134343;1529134374;0;;78124072922;;74952129298;1170;74952129298;ivr;NDExMzAwMjE3OQ==
		[];1529135999;1529136011;1529136002;4664;sip:user1@mangosip.ru;;sip:user2@mangosip.ru;1110;;abonent;NDExMzE1Nzc5OA==
		[];1529136153;1529136165;1529136155;4664;sip:user1@mangosip.ru;;sip:user2@mangosip.ru;1110;;abonent;NDExMzE3MzE1OA==
		[];1529136336;1529136348;1529136339;4664;sip:user1@mangosip.ru;;sip:user2@mangosip.ru;1110;;abonent;NDExMzE5MTA3Mw==
		[];1529136361;1529136387;1529136363;4664;sip:user1@mangosip.ru;;sip:user2@mangosip.ru;1110;;abonent;NDExMzE5MzQxMA==
		[];1529141212;1529141243;0;4664;sip:user1@mangosip.ru;;sip:user3@mangosip.ru;1100;;abonent;NDExMzczOTUwMQ==
		[];1529141251;1529141286;0;4664;sip:user1@mangosip.ru;;sip:user2@vpbx400102981.mangosip.ru;1100;;abonent;NDExMzc0NDE2OA==
		[];1529141335;1529141396;0;;78124072994;;74952129298;1170;74952129298;ivr;NDExMzc1MzY1NQ==
		[];1529141541;1529141550;0;4664;sip:user1@mangosip.ru;;sip:user3@mangosip.ru;1100;;abonent;NDExMzc3NzI0Mg==
		[];1529141724;1529141738;0;4664;sip:user1@mangosip.ru;;sip:user3@mangosip.ru;1100;;abonent;NDExMzc5ODMwNA==
		[];1529141801;1529141826;0;4664;sip:user1@mangosip.ru;;sip:user3@mangosip.ru;1100;;abonent;NDExMzgwNjk4NA==`;
        stats = raw.split(/\s+/).map(item => item.split(';'));
        fieldsArr = [
            'records',
            'start',
            'finish',
            'answer',
            'from_extension',
            'from_number',
            'to_extension',
            'to_number',
            'disconnect_reason',
            'line_number',
            'location',
            'entry_id',
        ];
        fields = fieldsArr.join(',');
    });

    it('success', () => {
        const filter = { success: true };
        const result = Helpers.stats.filterByType(stats, fieldsArr, filter);
        const due = 6;
        expect(due).equal(result.length);
    });

    it('fail', () => {
        const filter = { fail: true };
        const result = Helpers.stats.filterByType(stats, fieldsArr, filter);
        const due = 8;
        expect(due).equal(result.length);
    });

    it('incoming', () => {
        const filter = { incoming: true };
        const result = Helpers.stats.filterByDirection(stats, fieldsArr, filter);
        const due = 2;
        expect(due).equal(result.length);
    });

    it('outgoing', () => {
        const filter = { outgoing: true };
        const result = Helpers.stats.filterByDirection(stats, fieldsArr, filter);
        const due = 12;
        expect(due).equal(result.length);
    });

    it('incoming success', () => {
        const json = {
            date_from: '1529096400',
            date_to: '1529142043',
            fields,
            incoming: true,
            success: true,
        };
        const result = Helpers.stats.filter(stats, json);
        const due = 0;
        expect(due).equal(result.length);
    });

    it('outgoing fail', () => {
        const json = {
            date_from: '1529096400',
            date_to: '1529142043',
            fields,
            outgoing: true,
            fail: true,
        };
        const result = Helpers.stats.filter(stats, json);
        const due = 6;
        expect(due).equal(result.length);
    });
});
