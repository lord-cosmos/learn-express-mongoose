let Book = require('../models/book');
let Author = require('../models/author');
let BookInstance = require('../models/bookinstance');
let Genre = require('../models/genre');

exports.show_home = async function (res) {
  let books = await Book.countDocuments({});
  let copies = await BookInstance.countDocuments({});
  let available = await BookInstance.countDocuments({status: 'Available'});
  let authors = await Author.countDocuments({});
  let genres = await Genre.countDocuments({});
  let msg = `<div><p> Books: ${books} </p> <p>Copies: ${copies}</p> Copies Available: ${available}</p> Authors: ${authors}</p><p>Genres: ${genres} </p></div>`
  res.send(msg);
}
