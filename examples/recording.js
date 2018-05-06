const VPBX = require('../');

const vpbx = new VPBX();

const fs = require('fs');

async function main() {
	{
		// получение записи разговора
		const json = {
			recording_id: 'MToxMjI3NTM6Mzc3OTkzMjA5NDow',
			folder: 'C:/_/mango-vpbx/downloads/',
		};
		const { success, recording } = await vpbx.recording(json);
		console.log(success, recording);
	}

	{
		// получение ссылки на запись разговора
		const json = {
			recording_id: 'MToxMjI3NTM6Mzc3OTkzMjA5NDow',
			expires: 'MAX',
		};
		const { success, recording } = await vpbx.recording(json);
		console.log(success, recording);
	}
}

main();
