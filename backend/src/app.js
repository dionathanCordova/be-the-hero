const express = require('express')
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express()

app.use(cors());
// quanto hosédar em producao
// app.use(cors(
//     origin: 'http://endereco.com'
// ));
// 
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;