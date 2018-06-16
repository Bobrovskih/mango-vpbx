const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
    {
        const json = {
            call_id: 'NyAoNDk1KSAyMTItOTItOTgJ'
        };
        const { success } = await vpbx.hangup(json);
        console.log(success);
    }
}

main();
