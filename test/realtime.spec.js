const {
	expect
} = require('chai');
const Realtime = require('../src/realtime');
const VPBX = require('../');

describe('метод Realtime.testFilter - базовые фильтры ', () => {
	const vpbx = new VPBX();
	const events = vpbx.events('/mango-vpbx');
	const event = 'call';
	const json = {
		entry_id: 'MzUyODbvczkxMjo0MDE=',
		call_id: 'MToxMjI3NTM6NDAxOjYyODMxMTI1OTox',
		timestamp: 1516454940,
		seq: 1,
		call_state: 'Appeared',
		location: 'ivr',
		from: {
			number: '74991102914'
		},
		to: {
			number: '74995013402',
			line_number: '74995013402'
		}
	};

	it('filter = {} ', () => {
		const filter = {};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});


	it('call_state: "Appeared" ', () => {
		const filter = {
			call_state: 'Appeared'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('call_state: "appeared" ', () => {
		const filter = {
			call_state: 'appeared'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('call_state: "Disconnected" ', () => {
		const filter = {
			call_state: 'Disconnected'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});

	it('call_state: "appeared", location: "ivr" ', () => {
		const filter = {
			call_state: 'appeared',
			location: 'ivr'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('call_state: "appeared", location: "abonent" ', () => {
		const filter = {
			call_state: 'appeared',
			location: 'abonent'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});

	it('seq: 1, location: "ivr" ', () => {
		const filter = {
			seq: 1,
			location: 'ivr'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('seq: "1", location: "ivr" ', () => {
		const filter = {
			seq: '1',
			location: 'ivr'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('timestamp: 1516454940 ', () => {
		const filter = {
			timestamp: 1516454940
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('timestamp: "1516454940" ', () => {
		const filter = {
			timestamp: '1516454940'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});
});

describe('метод Realtime.testFilter - операторы сравнения', () => {
	const vpbx = new VPBX();
	const events = vpbx.events('/mango-vpbx');
	const event = 'recording';
	const json = {
		recording_id: 'MToxMjI3NTM6MzUyODbvczg4OTow',
		recording_state: 'Started',
		seq: 1,
		entry_id: 'MzUyODbvczg4OTo0MDE=',
		call_id: 'MToxMjI3NTM6NDAxOjYyODMxMTI1OA==',
		extension: '360',
		timestamp: 1516454940,
		recipient: 'Cloud'
	};

	it('timestamp: ">1516450000" ', () => {
		const filter = {
			timestamp: '>1516450000'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('timestamp: ">=1516450000" ', () => {
		const filter = {
			timestamp: '>=1516450000'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('timestamp: "<1516450000" ', () => {
		const filter = {
			timestamp: '<1516450000'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});

	it('timestamp: "<=1516450000" ', () => {
		const filter = {
			timestamp: '<=1516450000'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});
});

describe('метод Realtime.testFilter - событие summary', () => {
	const event = 'summary';
	const vpbx = new VPBX();
	const events = vpbx.events('/mango-vpbx');
	const json = {
		entry_id: 'MzUyODbvczg4OTo0MDE=',
		call_direction: 1,
		from: {
			extension: '360',
			number: 'sip:example@domain.mangosip.ru'
		},
		to: {
			number: '74995013402'
		},
		line_number: '74991102914',
		create_time: 1516454940,
		forward_time: 1516454940,
		talk_time: 1516454940,
		end_time: 1516454946,
		entry_result: 1,
		disconnect_reason: 1110
	};

	it('только успешные входящие', () => {
		const filter = {
			call_direction: '1',
			talk_time: '>0'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('только успешные исходящие', () => {
		const filter = {
			call_direction: '2',
			talk_time: '>0'
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});
});

describe('метод Realtime.testFilter - рег.выражение в фильтре', () => {
	const event = 'summary';
	const vpbx = new VPBX();
	const events = vpbx.events('/mango-vpbx');
	const json = {
		entry_id: 'MzUyODbvczg4OTo0MDE=',
		call_direction: 1,
		from: {
			extension: '360',
			number: 'sip:example@domain.mangosip.ru'
		},
		to: {
			number: '74995013402'
		},
		line_number: '74991102914',
		create_time: 1516454940,
		forward_time: 1516454940,
		talk_time: 1516454940,
		end_time: 1516454946,
		entry_result: 1,
		disconnect_reason: 1110
	};
	it('только коды завершения 1ххх', () => {
		const filter = {
			disconnect_reason: /^1\d{3}$/
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('номер линии московский', () => {
		const filter = {
			line_number: /^749[59].*$/
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('только входящие/исходящие event summary', () => {
		const filter = {
			call_direction: /[12]/
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});

	it('номер линии - мобильный', () => {
		const filter = {
			entry_result: 1,
			line_number: /^79/
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});

	it('некорректный фильтр с regex', () => {
		const filter = {
			callDirection: /1/
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});
});

describe('Realtime.testFilter - вложенный фильтр', () => {
	const event = 'call';
	const vpbx = new VPBX();
	const events = vpbx.events('/mango-vpbx');
	const json = {
		entry_id: 'MzUyODbvczg4OTo0MDE=',
		call_id: 'MzUyODbvczg4OTo0MDEMzUyODbvczg4O',
		timestamp: 1522347638,
		seq: 1,
		call_state: 'Appeared',
		location: 'abonent',
		from: {
			number: '74991102914',
			taken_from_call_id: 'MzUyODbvczg4OMzUyODbvczg4OMzUyODbvcg',
		},
		to: {
			extension: '101',
			number: 'sip:example@domain.mangosip.ru',
			line_number: '74952129298',
			acd_group: '22',
		},
		dct: {
			type: 0,
		},
	};

	it('acd group 22 ➕', () => {
		const filter = {
			to: {
				acd_group: '22',
			},
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});
	it('acd group 101 ➖', () => {
		const filter = {
			to: {
				acd_group: '101',
			},
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});
	it('to {} ➕', () => {
		const filter = {
			to: {},
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});
	it('to { acd_group, number } ➕', () => {
		const filter = {
			to: {
				number: 'sip:example@domain.mangosip.ru',
				acd_group: '22',
			},
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});
	it('to { acd_group, number } ➖', () => {
		const filter = {
			to: {
				number: 'sip:example@mangosip.ru',
				acd_group: '22',
			},
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});
	it('call_state, to { acd_group } ➖', () => {
		const filter = {
			call_state: /^connected$/i,
			to: {
				acd_group: '22',
			},
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});
	it('call_state, to { acd_group } ➕', () => {
		const filter = {
			location: 'abonent',
			to: {
				acd_group: /^22$/,
			},
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});
	it('from { number } ➕', () => {
		const filter = {
			from: {
				number: /^74991102914$/,
			},
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(true);
	});
	it('from { number } to { acd_group } ➖', () => {
		const filter = {
			from: {
				number: /^74991102914$/,
			},
			to: {
				acd_group: '',
			}
		};
		const result = events.testFilter(filter, json);
		expect(result).equal(false);
	});
});
