import { Error as MongooseError } from 'mongoose'
import { MongoServerError } from 'mongodb'
import { Request, Response, NextFunction } from 'express'
import AppError, { IAppError } from '../utils/appError'

const handleCastErrorDB = (err: MongooseError.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err: MongoServerError) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0]

  const message = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err: MongooseError.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message)

  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401)

// Development
const sendErrorDev = (err: AppError, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    })
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err)
  return res.status(err.statusCode).json({
    title: 'Something went wrong!',
    msg: err.message,
  })
}

// Production
const sendErrorProd = (err: AppError, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err)
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    })
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err)
    return res.status(err.statusCode).json({
      title: 'Something went wrong!',
      msg: err.message,
    })
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err)
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  })
}

export default (
  err: IAppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  let error: IAppError = { ...err }
  error.message = err.message

  if (err.name === 'CastError')
    error = handleCastErrorDB(error as MongooseError.CastError & IAppError)
  if (err.code === 11000)
    error = handleDuplicateFieldsDB(error as MongoServerError & IAppError)
  if (err.name === 'ValidationError') {
    error = handleValidationErrorDB(
      error as MongooseError.ValidationError & IAppError
    )
  }

  if (error.name === 'JsonWebTokenError') error = handleJWTError()
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res)
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(error, req, res)
  }
}
