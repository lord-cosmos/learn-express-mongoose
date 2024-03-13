var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  ISBN: { type: String },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

//Export model
module.exports = mongoose.model("Book", BookSchema);
