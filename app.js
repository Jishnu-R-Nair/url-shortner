const express = require('express');

const router = require('./routers/Url');
require('./db/mongoose');

const app = express();

app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log('App is up and running on port 3000');
});
