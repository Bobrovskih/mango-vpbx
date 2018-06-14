const VPBX = require('../');

const vpbx = new VPBX();

const main = async () => {
    const json = {
        date_from: '1481630491',
        date_to: '1481734491',
        success: true,
    };
    const {
        success,
        stats
    } = await vpbx.stats(json);
    console.log(success, stats);
};

main();
