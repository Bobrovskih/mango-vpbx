const VPBX = require('../');

const vpbx = new VPBX();

async function main() {
	{
		const json = { number: '74952129298' };
		const { success, message, dctUserInfo } = await vpbx.dctUserInfo(json);
		console.log(success, message, dctUserInfo);
	}
}

main();
