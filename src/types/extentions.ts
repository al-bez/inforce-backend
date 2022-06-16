import { Request } from 'express'
import { IUser } from '.'

export interface IRequestWithAdditionalFields extends Request {
  user?: IUser & { id?: string }
}
