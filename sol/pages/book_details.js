let async = require('async');
let Book = require('../models/book');
let BookInstance = require('../models/bookinstance');

function get_book(id) { 
  if (typeof id !== "string") {
        return ({status: "error"});
    }
    return Book.findOne({'_id': {$eq: id}}).populate('author');
}

function get_book_dtl(id) {
  return BookInstance
          .find({ 'book': id })
          .select('imprint status');
}

exports.show_book_dtls = async (res, id) => {
  const results = await Promise.all([get_book(id).exec(), get_book_dtl(id).exec()])
  try {
    let book = await results[0];
    let copies = await results[1];
    res.send({
      title: book.title,
      author: book.author.name,
      copies: copies,
    });
  }
  catch(err) {
    res.send(`Book ${id} not found`);
  } 
}

// async.parallel([
  //   function(callback) {
  //     callback(null, get_book(id));
  //   },
  //   function(callback) {
  //     callback(null, get_book_dtl(id));
  //   }
  // ],
  // async function(err, results) {
  //   if(err) {
  //     res.send(`Book ${id} not found`);
  //     return;
  //   }
  //   try {
  //     let book = await results[0].exec();
  //     let copies = await results[1].exec();
  //     res.send({
  //       title: book.title,
  //       author: book.author.name,
  //       copies: copies,
  //     });
  //   }
  //   catch(err) {
  //     res.send(`Book ${id} not found`);
  //   }
  // });

// let book = await get_book(id).exec();
// let book_dtl = await get_book_dtl(id).exec();
// if(book && book_dtl)
//   console.log({
//     title: book.title,
//     summary: book.summary,
//     author: book.author.name,
//     copies: book_dtl.map(function(b) {
//       return {
//         imprint: b.imprint,
//         status: b.status
//       }
//     })
//   });
// else console.log('Book not found ' + id);
