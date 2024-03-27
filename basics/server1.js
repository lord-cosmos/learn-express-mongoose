const express = require('express');
const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});

app.get('/', (req, res) => {
    console.log(req.body);
    return res.send({ping: 'pong'});
});
