const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
    generateUnicId() {
        return crypto.randomBytes(4).toString('HEX');
    },

    generateCrytoPass(pass) {
        const hash = crypto.createHmac('sha256', pass)
                        .update('I love cupcakes')
                        .digest('hex');

        return hash;
    },

    generateDeCryptoPass(pass) {

    }
}