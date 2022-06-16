export interface IAppError extends Error {
  code?: number
  status: string
  statusCode: number
  isOperational: boolean
}

class AppError extends Error implements IAppError {
  public status: string
  public isOperational: boolean
  constructor(public message: string, public statusCode: number) {
    super(message)

    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
