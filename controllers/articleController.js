const Article = require('../models/articleModel');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handleFactory');

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

exports.addNewArticle = factory.createOne(Article);
exports.getOneArticle = factory.getOne(Article);
exports.updateArticle = factory.updateOne(Article);
exports.deleteArticle = factory.deleteOne(Article);
exports.updateThumbnail = factory.updateThumbnail(Article);
