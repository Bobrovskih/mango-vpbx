const fs = require('fs');

const { expect } = require('chai');
const { Storage } = require('../src/storage');

describe('Storage', () => {
    it('downloadFile', async () => {
        const url = 'https://raw.githubusercontent.com/Bobrovskih/mango-vpbx/master/README.MD';
        const filePath = await Storage.downloadFile(url, __dirname);
        const stat = fs.statSync(filePath);
        expect(true).equal(!!stat);
        fs.unlinkSync(filePath);
    });
});
