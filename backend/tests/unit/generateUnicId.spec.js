const generateUnicId = require('../../src/utils/generateUnicId'); 

describe('GenerateUnicId', () => {
    it('should generate an unique ID', () => {
        // expect(2+2).toBe(8);
        const id = generateUnicId();
        expect(id).toHaveLength(8);
    })
});