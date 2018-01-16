const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
	{
		const json = {
			call_id: 'NyAoNDk1KSAyMTItOTItOTgJ',
			call_party_number: '5000',
		};
		const { success } = await vpbx.recordingStart(json);
		console.log(success);
	}
}

main();
