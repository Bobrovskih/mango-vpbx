const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
	{
		// внутренний 5000 => 74952129298
		const json = {
			from: { extension: '5000' },
			to_number: '74952129298',
		};
		const { success } = await vpbx.call(json);
		console.log(success);
	}
    
	{
		// sip:example@mangosip.ru => 74952129298
		const json = {
			from: {
				extension: '5000',
				number: 'sip:example@mangosip.ru',
			},
			to_number: '74952129298'
		};
		const { success } = await vpbx.call(json);
		console.log(success);
	}
    
	{
		// 79260001122 => 74952129298
		const json = {
			from: {
				extension: '5000',
				number: '79260001122',
			},
			to_number: '74952129298'
		};
		const { success } = await vpbx.call(json);
		console.log(success);
	}
    
	{
		// 79260001122 => 74952129298
		// АОН: 74951111111
		const json = {
			from: {
				extension: '5000',
				number: '79260001122',
			},
			to_number: '74952129298',
			line_number: '74951111111'
		};
		const { success } = await vpbx.call(json);
		console.log(success);
	}
}

main();
