const VPBX = require('../index');

const vpbx = new VPBX();

const fs = require('fs');

async function main() {
	{
		// получение записи разговора
		const json = {
			recording_id: 'MToxMjI3NTM6MzUwNzMxMDk4NTow',
			folder: 'C:/mango-vpbx/downloads/'
		};
		const { success, file } = await vpbx.recording(json);
		console.log(success, file);
	}
}

main();
