const Article = require('../models/articleModel');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

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
