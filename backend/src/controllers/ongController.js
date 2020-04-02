const {generateUnicId} = require('../utils/generateUnicId');
const connection = require('../database/connection');
const setCrypto = require('../utils/setCryptoPass');

module.exports = {
    async index(req, res) {
        const ongs = await connection('ongs').select('*')
        return res.json(ongs);
    },
    
    async create(req, res) {
        const { name, email, whatsapp, city, uf, pass } = req.body;
        const id = generateUnicId();

        const passHash = setCrypto(pass);
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