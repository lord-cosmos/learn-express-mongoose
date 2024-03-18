let BookInstance = require("../models/bookinstance");

function get_bookinstance() {
  return BookInstance.find({ status: "Available" }).populate("book");
}

exports.show_all_books_status = async function (res) {
  try {
    let books_status = await get_bookinstance().exec();
    const result = books_status.map(function (b) {
      return b.book.title + " : " + b.status;
    });

    res.send(result);
  } catch (err) {
    console.log("Couldnot get available books");
  }
};
