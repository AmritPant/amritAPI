const Article = require('../models/articleModel');
const ApiFeatures = require('../utils/apiFeatures');

exports.getAllArticles = async (req, res) => {
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
};

exports.addNewArticle = async (req, res) => {
  try {
    const article = req.body;
    const response = await Article.create(article);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
