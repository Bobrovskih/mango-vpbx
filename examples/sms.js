const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
    {
        // отправка смс на номер 74952129298
        const json = {
            from_extension: '5000',
            to_number: '74952129298',
            text: 'It works'
        };
        const { success } = await vpbx.sms(json);
        console.log(success);
    }

    {
        // отправка смс на номер 74952129298
        // имя отправителя TAXI_MT
        const json = {
            from_extension: '5000',
            to_number: '74952129298',
            text: 'привет! это смс отправлено через API',
            sms_sender: 'TAXI_MT'
        };
        const { success } = await vpbx.sms(json);
        console.log(success);
    }
}

main();
