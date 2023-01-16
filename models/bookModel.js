const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Provide Title for a Book!'],
    maxLength: [50, 'A title cannot be more than 50 characters'],
    minLength: [8, 'A title cannot be less than 8 characters'],
    unique: true,
  },
  author: {
    type: String,
    required: [true, 'Please Provide Author of the book!'],
    maxlength: [30, 'A name of author cannot exceed 30 characters'],
    minLength: [5, 'A name of author cannot be less than 5 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please Provide Description for a Book!'],
    minLength: [120, 'A discription cannot be less than 8 character'],
  },
  miniDescription: {
    type: String,
    required: [true, 'Please Provide mini description for a Book!'],
    minLength: [30, 'A mini descriiption cannot be less than 8 character'],
    maxLength: [300, 'A mini description cannot be less than 8 character'],
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
    required: [true, 'Please Provide Length of a Book!'],
    min: [1, 'Length Cannot be less than 1 Mintues'],
    max: [60, 'Length Cannot be greater than 60 Minutes'],
  },
  tags: {
    type: String,
    required: false,
    enum: ['trending', 'person-favorite', 'life-changing'],
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Model = mongoose.model('Book', bookSchema);
module.exports = Model;
