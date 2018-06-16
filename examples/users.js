const VPBX = require('../index');

const vpbx = new VPBX();

async function main() {
    {
        // запрос всех сотрудников
        const { success, users } = await vpbx.users();
        console.log(success, users);
    }
    
    {
        // запрос только сотрудника с внутренним номером 5000
        const json = { extension: 5000 };
        const { success, users, message } = await vpbx.users(json);
        console.log(success, users, message);
    }
}

main();
