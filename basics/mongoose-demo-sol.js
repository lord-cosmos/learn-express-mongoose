// Import the mongoose module
const mongoose = require("mongoose");
const BreakFastSchema = require('./breakfastSchema.js');

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/my_db";

mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() {
  let entries = [{eggs: 7, drink: 'Coffee'}, {eggs: 6, drink: 'Tea'}, {eggs: 9, drink: 'Tea'}];
  insertMany(entries).catch((err) => { console.log('Failed to save ' + err); });
});

process.on('SIGINT', async () => {
  const result = await BreakFastSchema.find({drink: 'Tea'});
  console.log(result);
  if(db) {
    db.close()
      .then((result) => console.log('DB connection closed'))
      .catch((err) => console.log(err));
  }
  console.log('process terminated');
})

async function insertOne() {
  let brkfstSchema = BreakFastSchema({eggs: 7, drink: 'Water'});
  await brkfstSchema.save();
  console.log('Saved Entry : ' + brkfstSchema);
}

async function insertMany(entries) {
  entries.forEach(async function(entry) {
    let brkfstSchema = BreakFastSchema(entry);
    await brkfstSchema.save();
    console.log('Saved Entry : ' + entry);
  })
}
