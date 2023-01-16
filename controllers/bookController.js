const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('../controllers/handleFactory');

exports.getAllBooks = catchAsync(async (req, res) => {
  const query = Book.find({});
  const apiFeatures = new ApiFeatures(query, req.query)
    .filter()
    .paginate()
    .sort()
    .limit();

  const books = await apiFeatures.query;

  res.status(200).json({ status: 'success', count: books.length, data: books });
});

exports.getOneBook = factory.getOne(Book);
exports.addNewBook = factory.createOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);
exports.updateThumbnail = factory.updateThumbnail(Book);
