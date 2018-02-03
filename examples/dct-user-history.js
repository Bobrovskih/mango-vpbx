const VPBX = require('../');

const vpbx = new VPBX();

async function main() {
	{
		const json = { number: '74952129298' };
		const { success, message, dctUserHistory } = await vpbx.dctUserHistory(json);
		console.log(success, message, dctUserHistory);
	}
}

main();
