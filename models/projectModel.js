const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Provide the title of the Project'],
    maxLength: 60,
    minLength: 4,
    unique: [true, 'A title of Project Should be Unique'],
  },
  description: {
    type: String,
    required: [true, 'Please Provide the title of the Project'],
    minLength: 100,
  },
  miniDescription: {
    type: String,
    required: [true, 'Please Provide mini description for an Article!'],
    minLength: [30, 'A title cannot be less than 8 character'],
    maxLength: [300, 'A title cannot be less than 8 character'],
  },
  platform: {
    type: String,
    required: [true, 'Please Provide the platform of the Project'],
    enum: {
      values: ['mobile', 'dekstop', 'web', 'server'],
      message: '{VALUE} is not the correct Platform',
    },
  },
  completedDate: {
    type: Date,
    default: Date.now(),
  },
  totalTime: {
    type: Number,
    min: [1, 'Project cannot be completed in less than 1day'],
    required: [true, 'Please Provide the platform of the Project'],
  },
  thumbnail: {
    type: String,
  },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
