const { expect } = require('chai');
const VBPX = require('..');

const vpbx = new VBPX('nokey', 'nosalt');

describe('vpbx', () => {
    it('dctUserInfo', async () => {
        const result = await vpbx.dctUserInfo({ number: '74952129298' });
        expect(401).equal(result.code);
    });

    it('recording', async () => {
        const result = await vpbx.recording({
            expires: '3018-08-18T06:35:31.000Z',
            recording_id: '23firh9023hfdkew=',
        });

        const due = 'https://app.mango-office.ru/vpbx/queries/recording/link/23firh9023hfdkew=/play/nokey/33091482931/614c9d0a90f3fcac7a3fa61a71fde696fe9c54f35bcb05d3a9dc9b0211df3ea1';
        expect(due).equal(result.recording);
    });

    it('call', async () => {
        const result = await vpbx.call({
            to_number: '74952129298',
            from: { extension: '101' },
        });
        expect(401).equal(result.code);
    });
});
