import { Date } from 'mongoose'

export interface IContact {
  name: string
  email: string
  phone: string
  createdAt: Date
}
