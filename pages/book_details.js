let async = require("async");
let Book = require("../models/book");
let BookInstance = require("../models/bookinstance");

function get_book(id) {
  if (typeof id !== "string") {
    return { status: "error" };
  }
  return Book.findOne({ _id: { $eq: id } }).populate("author");
}

function get_book_dtl(id) {
  // Validate input
  if (typeof id !== "string" || id.trim() === "") {
    return { status: "error", message: "Invalid input" };
  }

  // Sanitize input to prevent NoSQL injection
  const sanitizedId = id.trim(); // Assuming trimming is sufficient for your use case

  // Perform query using sanitized input
  return BookInstance.find({ book: sanitizedId }).select("imprint status");
}

exports.show_book_dtls = async (res, id) => {
  const results = await Promise.all([
    get_book(id).exec(),
    get_book_dtl(id).exec(),
  ]);
  try {
    let book = await results[0];
    let copies = await results[1];
    res.send({
      title: book.title,
      author: book.author.name,
      copies: copies,
    });
  } catch (err) {
    res.send(`Book ${id} not found`);
  }
};
