const Review = require('../Models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };

//   const reviews = await Review.find(filter);

//   if (!reviews) {
//     return next(new AppError('No reviews found', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     result: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

exports.createReview = factory.createOne(Review);
// exports.createReview = catchAsync(async (req, res, next) => {
//   const newreview = await Review.create(req.body);

//   if (!newreview) {
//     return next(new AppError('No review was not created.'));
//   }

//   res.status(201).json({
//     status: 'success',
//     data: newreview,
//   });
// });

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.getReview = factory.getOne(Review);


