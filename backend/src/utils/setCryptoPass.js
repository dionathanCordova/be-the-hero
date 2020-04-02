const passHash = (param) => {
    const crypto = require('crypto');
    const pdw = 'hashpassTOHexadecimal';

    const hash = crypto.createHmac('sha256', pdw)
                    .update(param)
                    .digest('hex');
    return hash;
}

module.exports = passHash;