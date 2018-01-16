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
}

main();
