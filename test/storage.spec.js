const fs = require('fs');

const { expect } = require('chai');
const { Storage } = require('../src/storage');

describe('Storage', () => {
    it('downloadFile', async () => {
        const url = 'http://dctninja.ru/index.html';
        const filePath = await Storage.downloadFile(url, __dirname);
        const stat = fs.statSync(filePath);
        expect(true).equal(!!stat);
        fs.unlinkSync(filePath);
    });
});
