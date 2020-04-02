const crypto = require('crypto');
const alg = 'aes-256';
const pdw = 'hashpassTOHexadecimal';
const type = 'hex';

const passHash = (param) => {
    const decipher = crypto.createDecipher(alg, pdw);
    decipher.update(param, type);
    const passHash = decipher.final();
    return passHash;
}

module.exports = passHash;