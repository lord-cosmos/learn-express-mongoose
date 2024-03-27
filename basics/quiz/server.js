const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
var cors = require('cors')
const port = 8000;

let users;
fs.readFile(path.resolve(__dirname, '../../data/users.json'), function(err, data) {
  console.log('reading file ... ');
  if(err) throw err;
  users = JSON.parse(data);
})

const addMsgToRequest = function (req, res, next) {
  if(users) {
    req.users = users;
    next();
  }
  else {
    return res.json({
        error: {message: 'users not found', status: 404}
    });
  }
  
}

app.use(
  cors({origin: 'http://localhost:3000'})
);
app.use('/usernames', addMsgToRequest);

app.get('/usernames', (req, res) => {
  let usernames = req.users.map(function(user) {
    return {id: user.id, username: user.username};
  });
  res.send(usernames);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/adduser', addMsgToRequest);

app.post('/adduser', (req, res) => {
  let newuser = req.body;
  req.users.push(newuser);
  fs.writeFile(path.resolve(__dirname, '../data/users.json'), JSON.stringify(users), (err) => {
    if (err) console.log('Failed to write');
    else console.log('User Saved');
  });
  res.send('done');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.get('/username/:name', (req, res) => {
//   let name = req.params.name;
//   let users_with_name = users.filter(function(user) {
//     return user.username === name;
//   });
//   console.log(users_with_name);
//   if(users_with_name.length === 0) res.send({status: 400});
//   else res.send({status: 201});
// })
