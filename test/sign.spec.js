const {
    expect
} = require('chai');
const { Sign } = require('../src/helpers/sign');

describe('метод Sign.calc', () => {
    it('json callback', () => {
        const apiKey = '123';
        const apiSalt = '789';
        const json = {
            command_id: 'cmd-12532543651',
            from: {
                extension: '101',
            },
            to_number: '74952129298',
        };

        const result = Sign.calc(apiKey, apiSalt, json);
        const due = '0a72eec8d74830f907199cb99049ccf5f9667a3257ab86e2947714febeedce00';
        expect(result).equal(due);
    });
    it('json recording link', () => {
        const apiKey = '123';
        const apiSalt = '789';
        const json = {
            expires: '1525597727500',
            recording_id: 'Rofkdgl33fd=',
        };
        const result = Sign.calc(apiKey, apiSalt, json);
        const due = '9867bfdc661049959450fbad35c10ef2a41120094bda492dd0f085ba4def7df0';
        expect(result).equal(due);
    });
});
