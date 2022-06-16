import express from 'express'
const app = express()
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import compression from 'compression'
import cors, { CorsOptions } from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './controllers/errorController'
import AppError from './utils/appError'
// Router
import contactRouter from './routes/contactRouter'
import userRouter from './routes/userRouter'
import projectRouter from './routes/projectRouter'

// Enable CORS
// const whitelist = ['https://inforce.digital/', 'http://localhost:3000/']
// const corsOptions: CorsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
// }

app.use(cors())
app.options('*', cors())

app.enable('trust proxy')

// Security HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)

// Limits requests for specific api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many requsets from current API! Try again in 1 hour',
})

app.use('/api', limiter)

// Data sanitization against NOSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

app.use(compression())

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

// ROUTES
app.use('/api/v1/users', userRouter)
app.use('/api/v1/contact', contactRouter)
app.use('/api/v1/projects', projectRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

export default app
