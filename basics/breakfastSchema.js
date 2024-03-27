const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, "Too few eggs"],
    max: 12,
    required: [true, "Why no eggs?"],
  },
  drink: {
    type: String,
    enum: ["Coffee", "Tea", "Water"],
  },
});

//Export model
module.exports = mongoose.model('BreakFastSchema', breakfastSchema);
