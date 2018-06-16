const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
    {
        // группа c номером 222 => 79260001122
        // АОН: 74957777777
        const json = {
            from: '222',
            to_number: '79260001122',
            line_number: '74957777777'
        };
        const { success } = await vpbx.callGroup(json);
        console.log(success);
    }
}

main();
