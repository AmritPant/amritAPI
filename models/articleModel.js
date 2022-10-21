const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Provide Title for an Article!'],
    minLength: [8, 'A title cannot be less than 8 character'],
    maxLength: [50, 'A title cannot exceed 50 Characters'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please Provide Description for an Article!'],
    minLength: [120, 'A title cannot be less than 8 character'],
  },
  miniDescription: {
    type: String,
    required: [true, 'Please Provide mini description for an Article!'],
    minLength: [30, 'A title cannot be less than 8 character'],
    maxLength: [300, 'A title cannot be less than 8 character'],
  },
  category: {
    type: String,
    required: [true, 'Please Provide the Cateogry of the Article'],
    enum: {
      values: ['tech', 'productivity', 'lifestyle', 'education'],
      message: '{VALUE} is not valid category',
    },
  },
  thumbnail: {
    type: String,
  },
  publishedDate: {
    type: Date,
    default: Date.now(),
  },
  length: {
    type: Number,
    required: [true, 'Please Provide Length of the Article'],
    min: [1, 'Length Cannot be less than 1 Mintues'],
    max: [60, 'Length Cannot be greater than 60 Minutes'],
  },
  tags: {
    type: String,
    required: false,
    enum: ['trending'],
  },
  views: {
    type: Number,
    default: 0,
  },
});

const ArticleModel = mongoose.model('Article', articleSchema);
module.exports = ArticleModel;
