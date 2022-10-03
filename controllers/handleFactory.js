const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/CustomError');

// Deleting a Document
module.exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);

    if (!document)
      return next(
        new CustomError("The Document You are searching for doesn't exist", 404)
      );

    await Model.findByIdAndDelete(id);
    res.status(200).json({ status: 'sucess', data: null });
  });

// Deleting a Document
module.exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document)
      return next(
        new CustomError("The Article You are searching for doesn't exist", 404)
      );
    const data = await Model.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      returnDocument: 'after',
    });

    res.status(200).json({ status: 'sucess', data: data });
  });

// Creating a Document
module.exports.createOne = Model =>
  catchAsync(async (req, res) => {
    const document = req.body;
    const response = await Model.create(document);
    res.status(201).json(response);
  });

// Getting a single a Document
module.exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document)
      return next(
        new CustomError("The Article You are searching for doesn't exist", 404)
      );
    res.status(200).json({ status: 'sucess', data: document });
  });
