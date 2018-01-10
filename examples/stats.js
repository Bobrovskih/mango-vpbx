const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
	{
		// запрос истории вызовов
		// c 13.12.2016, 15:01:31
		// по 14.12.2016, 19:54:51
		const json = {
			date_from: '1481630491',
			date_to: '1481734491'
		};
		const { success, stats } = await vpbx.stats(json);
		console.log(success, stats);
	}
}

main();