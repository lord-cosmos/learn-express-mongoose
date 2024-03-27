const express = require('express');
const app = express();
const port = 3002;

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});

app.get('/users/:userId/books/:bookId', (req, res) => {
  let p1 = req.params.userId;
  let p2 = req.params.bookId;
  res.send({p1: p1, p2: p2});
});

app.get('/user', (req, res) => {
  res.send(req.query)
})
