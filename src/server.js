const exp = require('express');

// LOCAL FILES
const routes = require('./routes');
const config = require('../configs/config');

// SETUP
const app = exp();
app.use(exp.json())
app.use(routes);

app.listen(config.PORT);