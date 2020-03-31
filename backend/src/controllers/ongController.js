const {generateUnicId} = require('../utils/generateUnicId');
const connection = require('../database/connection');
const cryto = require('crypto');
const alg = 'aes-256-ctr';
const pwd = 'hashpassTOHexadecimal';

module.exports = {
    async index(req, res) {
        const ongs = await connection('ongs').select('*')
        return res.json(ongs);
    },
    
    async create(req, res) {
        const { name, email, whatsapp, city, uf, pass } = req.body;
        const id = generateUnicId();

        const cipher = cryto.createCipher(alg, pwd)
        const passHash = cipher.update(pass, 'utf8', 'HEX');
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            pass: passHash,
            city,
            uf
        })
        return res.json({id});
    },

}