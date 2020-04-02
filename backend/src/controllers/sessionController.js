require('dotenv').config();

const connection = require('../database/connection');
const setCrypto = require('../utils/setCryptoPass');
const jwt = require('jsonwebtoken');

module.exports = {
    async create(req, res) {
        const { id, pass, email } = req.body;
        
        const passHash = setCrypto(pass);
               
        const ong = await connection('ongs')
            .where('pass', passHash)
            .where('email', email)
            .select(['id', 'name'])
            .first();
     
        const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);

        if(!ong) {
            return res.status(400).json({error: 'No Ong found with this data'});
        }

        console.log(ong);
        return res.json({status: '200', data: ong, token: accessToken});
    },
}

