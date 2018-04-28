const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
	{
		const json = {
			call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
			to_number: '101'
		};
		const { success } = await vpbx.route(json);
		console.log(success);
	}

	{
		const json = {
			call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
			to_number: '101',
			sip_headers: {
				display_name: 'Santa Claus',
			},
		};
		const { success } = await vpbx.route(json);
		console.log(success);
	}
}

main();
