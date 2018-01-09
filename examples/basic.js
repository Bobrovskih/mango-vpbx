const VPBX = require('../index');

const vpbx = new VPBX();


async function main() {
	const { result } = await vpbx.call({
		from: {
			extension: '101',
			number: '74950003344'
		},
		to_number: '74950001122',
		command_id: `cmd${Date.now()}`
	});
    
	console.log(result);

	vpbx.groupCall();

	vpbx.users();

	vpbx.stats();

	vpbx.recording();
}

main();
