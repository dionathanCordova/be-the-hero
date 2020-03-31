const connection = require('../database/connection');
const cryto = require('crypto');
const alg = 'aes-256-ctr';
const pwd = 'hashpassTOHexadecimal';
const jwt = require('jsonwebtoken');

module.exports = {
    async create(req, res) {
        const { id, pass, email } = req.body;
        
        const cipher = cryto.createCipher(alg, pwd)
        const passHash = cipher.update(pass, 'utf8', 'hex');
     
        const ong = await connection('ongs')
            .where('pass', passHash)
            .where('email', email)
            .select(['id', 'name'])
            .first();

        if(!ong) {
            return res.status(400).json({error: 'No Ong found with this id'});
        }

        return res.json(ong);
    },
}