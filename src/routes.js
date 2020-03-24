const exp = require('express');
const routes = exp.Router();

const conn = require('./connection');
const OngsController = require('./controllers/OngsController');

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
  console.log(resp)
  return res.json(resp);
});

module.exports = routes;