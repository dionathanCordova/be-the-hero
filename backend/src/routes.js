const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/session', sessionController.create);

// ONGS
    routes.get('/ongs', ongController.index);
    routes.post('/ongs', celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(12),
            pass: Joi.string().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2) 
        })
    }), ongController.create);

    routes.get('/incidents', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        })
    }), incidentController.index);

// INCIDENTES
    routes.post('/incidents', incidentController.create);

    routes.delete('/incidents/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }), incidentController.delete);

    routes.post('/incidents/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }), incidentController.getIncicent);

    routes.put('/incidents/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }), incidentController.updateIncicent);

// PROFILE
    routes.get('/profile', celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }), profileController.index);

routes.use(function(req, res) {
    req.status(404).json({notfound: true, code: 404});
})

module.exports = routes;