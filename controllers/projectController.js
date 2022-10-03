const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('../controllers/handleFactory');

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const query = Project.find({});
  const apiFeatures = new ApiFeatures(query, req.query)
    .filter()
    .paginate()
    .sort()
    .limit();

  const projects = await apiFeatures.query;

  res
    .status(200)
    .json({ status: 'sucess', count: projects.length, data: projects });
});

exports.getOneProject = factory.getOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
exports.createProject = factory.createOne(Project);
