const Article = require('../models/articleModel');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/CustomError');

exports.getAllArticles = catchAsync(async (req, res) => {
  const query = Article.find({});

  const apiFeatures = new ApiFeatures(query, req.query)
    .search()
    .filter()
    .sort()
    .paginate()
    .limit();
  const articles = await apiFeatures.query;

  res
    .status(200)
    .json({ status: 'success', count: articles.length, data: articles });
});

exports.addNewArticle = catchAsync(async (req, res) => {
  const article = req.body;
  const response = await Article.create(article);
  res.status(201).json(response);
});

exports.getOneArticle = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  if (!article)
    return next(
      new CustomError("The Article You are searching for doesn't exist", 404)
    );
  res.status(200).json({ status: 'sucess', data: article });
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  if (!article)
    return next(
      new CustomError("The Article You are searching for doesn't exist", 404)
    );
  const data = await Article.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    returnDocument: 'after',
  });

  res.status(200).json({ status: 'sucess', data: data });
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const article = await Article.findById(id);

  if (!article)
    return next(
      new CustomError("The Article You are searching for doesn't exist", 404)
    );

  await Article.findByIdAndDelete(id);
  res.status(200).json({ status: 'sucess', data: null });
});
