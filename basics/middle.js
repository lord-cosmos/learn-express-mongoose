const express = require('express');
const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function init() {
   return {host: 'cse316'};
}

function addConfig(config, param) {
  config[param] = true;
  return config;
}


app.use('/end1', (req, res, next) => {
  req.extras = init();
	next();
})

app.use('/end1', (req, res, next) => {
  req.extras = addConfig(req.extras, 'auto');
  next();
})

app.get('/end1', (req, res) => {
   if(req.extras) {
     res.send(req.extras)
   }
   else {
     res.send('extras not found');
   }
 })
