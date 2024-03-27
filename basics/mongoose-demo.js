// Import the mongoose module
const mongoose = require("mongoose");
const BreakFastSchema = require('./breakfastSchema.js');

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/my_db";

mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() {
  insert().catch((err) => {console.log('Failed : ' + err);})
});

process.on('SIGINT', () => {
  if(db) {
    db.close()
      .then((result) => console.log('DB connection closed'))
      .catch((err) => console.log(err));
  }
  console.log('process terminated');
})

async function insert() {
    let brkfstSchema = BreakFastSchema({eggs: 13, drink: 'Milk'})
    await brkfstSchema.save();
    console.log('Created Entry : ' + {eggs: 13, drink: 'Milk'});
}