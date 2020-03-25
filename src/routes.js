const exp = require('express');
const routes = exp.Router();

const OngsController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');


/// ONGS METHODS
routes.post('/ongs/create', OngsController.CREATE);
routes.get('/ongs/find', OngsController.FIND_BYID);
routes.get('/ongs/all', OngsController.ALL);
routes.post('/ongs/search', OngsController.SEARCH);
/////////////////////

/// INCIDENTS METHODS
routes.post('/incident/create', IncidentController.CREATE);
routes.get('/incident/list', IncidentController.FIND_BYONG);
routes.get('/incident/find', IncidentController.FIND_BYID);
routes.get('/incident/all', IncidentController.ALL);
routes.post('/incident/search', IncidentController.SEARCH);
/////////////////////

module.exports = routes;