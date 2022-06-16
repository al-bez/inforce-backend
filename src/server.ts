import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app'

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config({ path: './config.env' })
const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful.!'))
  .catch((err: Error) => {
    console.log(err.message)
    throw err
  })

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... (${process.env.NODE_ENV})`)
})

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
