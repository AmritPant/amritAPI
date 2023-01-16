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

// Updating a Document
module.exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document)
      return next(
        new CustomError("The Document You are searching for doesn't exist", 404)
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

module.exports.protect = (req, res, next) => {
  const { API_KEY } = req.query;
  if (!API_KEY)
    return next(
      new CustomError(
        'API KEY is not present in request | Please Provide Correc API KEY',
        401
      )
    );

  if (API_KEY !== process.env.API_KEY)
    next(new CustomError('Invalid API_KEY', 400));

  next();
};

module.exports.updateThumbnail = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);

    if (!document)
      return next(
        new CustomError("The Document You are searching for doesn't exist", 404)
      );

    if (!req.file)
      return next(new CustomError('Please Provide the required file', 400));

    const data = await Model.findByIdAndUpdate(
      id,
      { thumbnail: req.file.filename },
      {
        runValidators: true,
        returnDocument: 'after',
      }
    );

    res.status(200).json({ status: 'sucess', data: data });
  });

module.exports.checkIP = (req, res, next) => {
  console.log(req);
  next();
};
