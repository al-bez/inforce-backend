import { Date } from 'mongoose'

export type TUserRole = 'user' | 'admin'

export interface IUser {
  _id: string
  name: string
  email: string
  photo: string
  role: TUserRole
  password: string
  passwordConfirm: string
  passwordChangedAt: Date
  passwordResetToken: string
  passwordResetExpires: Date
  active: boolean
  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>
  changedPasswordAfter: (JWTTimestamp: number) => boolean
  createPasswordResetToken: () => string
}
