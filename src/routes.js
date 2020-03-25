const exp = require('express');
const routes = exp.Router();

const OngsController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');

routes.post('/ongs/create', async (req, res) => {
  const { name, email, whatsapp, city, uf } = req.body;
  try {
    const dbResponse = await OngsController.CREATE(name,email,whatsapp,city,uf);
    if (dbResponse) {
      return res.json(dbResponse);
    } else {
      return res.json(dbResponse);
    } 
  } catch(e) {
    return res.json(e);
  }
});

routes.get('/ongs/all', async (req, res) => {
  const resp = await OngsController.ALL();
  if (!resp) return res.send('Nothing Found');
  console.log('REQ:', req.path);
  console.log('RESP:', resp.length);
  return res.json(resp);
});

routes.post('/ongs/search', async (req, res) => {
  const query = req.body;
  const resp = await OngsController.FIND(query);
  if (!resp) return res.send('Nothing Found');
  console.log('REQ:', req.path);
  console.log('RESP:', resp.length);
  return res.json(resp);
});

routes.get('/ongs/find', async (req, res) => {
  const {id} = req.query;
  const resp = await OngsController.FIND_BYID(id);
  if (!resp) return res.send('Nothing Found');
  console.log('REQ:', req.path);
  console.log('RESP:', resp.length? resp.length : true);
  return res.json(resp);
});

routes.post('/incident/create', async (req, res) => {
  const {title, description, value, ong_id} = req.body;
  const resp = await IncidentController.CREATE(title, description, value, ong_id);
  if (!resp) return res.send('Could Create');
  console.log('REQ:', req.path);
  console.log('RESP:', resp.length? resp.length : true);
  return res.json(resp);
});

routes.get('/incident/list', async (req, res) => {
  const { ong_id } = req.query;
  const resp = await IncidentController.FIND_BYONG(ong_id);
  if (!resp) return res.send('Nothing Found');
  console.log('REQ:', req.path);
  console.log('RESP:', resp.length? resp.length : true);
  return res.json(resp);
});

module.exports = routes;