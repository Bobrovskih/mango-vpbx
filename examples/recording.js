const VPBX = require('../index');

const vpbx = new VPBX();

const fs = require('fs');

async function main() {
	{
		// получение записи разговора
		const json = {
			recording_id: 'MToxMjI3NTM6MzUwNzMxMDk4NTow',
			path: '.vscode/'
		};
		const { success } = await vpbx.recording(json);
		console.log(success);
	}
}

main();
