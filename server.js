const config = require('./config');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.send('Server has started!!');
});

app.listen(config.PORT);