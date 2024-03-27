let Book = require('../models/book');
let Author = require('../models/author');
let Genre = require('../models/genre');

function getAuthor(family_name, first_name) {
  return Author.findOne({family_name: family_name, first_name: first_name});
}

function getGenre(name) {
  return Genre.find({name: name});
}

exports.new_book = async (res, family_name, first_name, genre_name, title) => {
  let author = await getAuthor(family_name, first_name).exec();
  let genre = await getGenre(genre_name).exec();
  let book = Book({
    title: title,
    summary: 'Demo Summary to be updated later',
    author: author,
    isbn: 'ISBN2022',
    genre: genre
  });
  await book.save();
  res.send('Created new book : ' + book);
}
