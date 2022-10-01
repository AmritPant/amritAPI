const Article = require('../models/articleModel');

exports.getAllArticles = async (req, res) => {
  const articles = await Article.find({});
  res.status(200).json(articles);
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
