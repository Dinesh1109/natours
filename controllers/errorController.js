/* eslint-disable prettier/prettier */

const AppError = require('../utils/appError');

const handleCasteErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  // console.log(value);
  const message = `Duplicate field value : ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data.${errors.join('.')}`;
  return new AppError(message, 500);
};

const handleJWTError = (err) =>
  new AppError('Invalid token. Please log in again!', 401);
const JWTExpiredError = (err) =>
  new AppError('Your token has expired please login again.', 401);

const sendErrorDev = (err, req, res) => {
  //API
  if(req.originalUrl.startsWith('/api')){
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }else{
    //Rendered webpage
    console.log('Error', err);

   return  res.status(err.statusCode).render('error',{
      title: 'Something went wrong!',
      msg: err.message,
    })
  }

};

const sendErrorProd = (err, req, res) => {

  //A) API
  if(req.originalUrl.startsWith('/api')){
      //operatinal , trusted error : sent to the client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

      //programming or other unknown error:don't leak err details to the client
    } 
      //log err
      console.log('Error', err);
      //Send generic message
      return res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
      });
    
  }else{
    //B) Rendered webpage
    if (err.isOperational) {
      return res.status(err.statusCode).render('error',{
        title: 'Something went wrong!',
        msg: err.message,
      })

      //programming or other unknown error:don't leak err details to the client
    } 
      //log err
      console.log('Error', err);
      //Send generic message
      return res.status(err.statusCode).render('error',{
        title: 'Something went wrong!',
        msg: 'Please try again later',
      })
  
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      err = handleCasteErrorDB(err);
    }
    if (err.code === 11000) {
      err = handleDuplicateErrorDB(err);
    }
    if (err.name === 'ValidationError') {
      err = handleValidationErrorDB(err);
    }
    if (err.name === 'JsonWebTokenError') {
      err = handleJWTError(err);
    }
    if (err.name === 'TokenExpiredError') {
      err = JWTExpiredError(err);
    }
    sendErrorProd(err, req, res);
  }
};
