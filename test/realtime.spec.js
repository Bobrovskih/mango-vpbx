const { expect } = require('chai');
const Realtime = require('../src/realtime');
const VPBX = require('../index');

describe('метод Realtime.testFilter /events/call', () => {
	const vpbx = new VPBX();
	const events = vpbx.events('/mango-vpbx');
	const event = 'call';
	const json = {
		entry_id: 'MzUyODMzNzkxMjo0MDE=',
		call_id: 'MToxMjI3NTM6NDAxOjYyODMxMTI1OTox',
		timestamp: 1516454940,
		seq: 1,
		call_state: 'Appeared',
		location: 'ivr',
		from: { number: '74991102914' },
		to: { number: '74995013402', line_number: '74995013402' }
	};

	it('filter = {} ', () => {
		const filter = {};
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});
    
    
	it('call_state: "Appeared" ', () => {
		const filter = {
			call_state: 'Appeared'
		};
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});
    
	it('call_state: "appeared" ', () => {
		const filter = {
			call_state: 'appeared'
		};
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});
    
	it('call_state: "Disconnected" ', () => {
		const filter = { call_state: 'Disconnected' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(false);
	});
    
	it('call_state: "appeared", location: "ivr" ', () => {
		const filter = { call_state: 'appeared', location: 'ivr' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});
    
	it('call_state: "appeared", location: "abonent" ', () => {
		const filter = { call_state: 'appeared', location: 'abonent' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(false);
	});
    
	it('seq: 1, location: "ivr" ', () => {
		const filter = { seq: 1, location: 'ivr' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});
    
	it('seq: "1", location: "ivr" ', () => {
		const filter = { seq: '1', location: 'ivr' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});
    
	it('timestamp: 1516454940 ', () => {
		const filter = { timestamp: 1516454940 };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});
    
	it('timestamp: "1516454940" ', () => {
		const filter = { timestamp: '1516454940' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});
    
	it('timestamp: ">1516450000" ', () => {
		const filter = { timestamp: '>1516450000' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});
    
	it('timestamp: ">=1516450000" ', () => {
		const filter = { timestamp: '>=1516450000' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(true);
	});

	it('timestamp: "<1516450000" ', () => {
		const filter = { timestamp: '<1516450000' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(false);
	});

	it('timestamp: "<=1516450000" ', () => {
		const filter = { timestamp: '<=1516450000' };
		const result = events.testFilter(event, filter, json);
		expect(result).equal(false);
	});
});
