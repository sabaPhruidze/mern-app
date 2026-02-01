const notFound = (req, res, next) => {
  //this is for unkown routes
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`); // This will show on what adress the request came
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // this is errorhandler that handles error inside routes
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = { notFound, errorHandler };
