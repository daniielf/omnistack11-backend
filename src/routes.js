const exp = require('express');
const routes = exp.Router();

const OngsController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

/// SESSION METHODS
routes.post('/session/:id', SessionController.START);

/// ONGS METHODS
routes.post('/ongs/create', OngsController.CREATE);
routes.get('/ongs/all', OngsController.ALL);
routes.post('/ongs/search', OngsController.SEARCH);
routes.get('/ongs/find/:id', OngsController.FIND_BYID);
/////////////////////

/// INCIDENTS METHODS
routes.post('/incident/create', IncidentController.CREATE);
routes.get('/incident/list', IncidentController.FIND_BYONG);
routes.get('/incident/all', IncidentController.ALL);
routes.post('/incident/:ong_id/search', IncidentController.SEARCH);
routes.get('/incident/find/:id', IncidentController.FIND_BYID);
routes.delete ('/incident/delete/:id', IncidentController.DELETE);
/////////////////////

module.exports = routes;