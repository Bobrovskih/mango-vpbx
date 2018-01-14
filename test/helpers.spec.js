const {
	expect
} = require('chai');
const Helpers = require('../src/helpers');
const parameters = require('../src/parameters');

describe('hello unit', () => {
	it('true is true', () => {
		expect(true).equal(true);
	});
});


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
			wrong: [
				{ success: true }
			]
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
