const {
	expect
} = require('chai');
const Helpers = require('../src/helpers');


describe('hello unit', () => {
	it('true is true', () => {
		expect(true).equal(true);
	});
});


describe('Helper.filterJSON', () => {
	it('{} => sms', () => {
		const src = {};
		const result = Helpers.filterJSON(src, 'sms');
		expect(result).deep.equal({});
	});

	it('лишние параметры => call', () => {
		const src = {
			cmdid: 'wkfnwe',
			what: true,
			extension: '1000',
			from_number: '74951234567',
			to_number: '74950001122'
		};
		const result = Helpers.filterJSON(src, 'call');
		expect(result).deep.equal({ to_number: '74950001122' });
	});
    
	it('верные параметры => call', () => {
		const src = {
			command_id: 'cmd-111222',
			from: {
				extension: '5000',
				number: '74952129298'
			},
			to_number: '74950001122',
			line_number: '74956667788'
		};
		const result = Helpers.filterJSON(src, 'call');
		expect(result).deep.equal(src);
	});
    
	it('лишние параметры => recording', () => {
		const src = {
			recording_id: 'MToxMjI3NTM6MzUwNzMxMDk4NTow',
			path: '.vscode/'
		};
        
		const result = Helpers.filterJSON(src, 'recording');
		expect(result).deep.equal({ recording_id: 'MToxMjI3NTM6MzUwNzMxMDk4NTow' });
	});
    
	it('верные параметры => recording', () => {
		const src = {
			recording_id: 'MToxMjI3NTM6MzUwNzMxMDk4NTow',
			action: 'download'
		};
        
		const result = Helpers.filterJSON(src, 'recording');
		expect(result).deep.equal({ recording_id: 'MToxMjI3NTM6MzUwNzMxMDk4NTow', action: 'download' });
	});

	it('лишний вложенный параметр => stats', () => {
		const src = {
			date_from: '1481630491',
			date_to: '1481734491',
			from: {
				ext: '5000'
			}
		};
        
		const result = Helpers.filterJSON(src, 'statsRequest');
		expect(result).deep.equal({ date_from: '1481630491', date_to: '1481734491' });
	});
});
