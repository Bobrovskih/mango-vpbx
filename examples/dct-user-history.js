const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
	{
		const json = { number: '74952129298' };
		const { success, message, info } = await vpbx.dctUserHistory(json);
		console.log(success, message, info);
	}
}

main();
