const Test = require('./../models/testModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllTests = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY

  const tests = await Test.find();

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    length: tests.length,
    data: {
      tests,
    },
  });
});

exports.createNewTest = catchAsync(async (req, res, next) => {
  const newTest = await Test.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      test: newTest,
    },
  });
});
