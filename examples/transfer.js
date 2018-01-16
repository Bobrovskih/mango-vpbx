const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
	{
		const json = {
			call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
			method: 'blind',
			to_number: '101',
			initiator: '5000'
		};
		const { success } = await vpbx.transfer(json);
		console.log(success);
	}
}

main();
