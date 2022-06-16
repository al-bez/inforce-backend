import { Request, Response, NextFunction } from 'express'
import User from '../models/UserModel'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import handleFactory from './handleFactory'
import { IUser, IRequestWithAdditionalFields } from 'types'

const filterObj = (obj: IUser, ...allowedFields: string[]) => {
  const newObj: any = {} // --------------------------
  Object.keys(obj).forEach((el: keyof IUser) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el]
    }
  })
  return newObj
}

const getMe = (
  req: IRequestWithAdditionalFields,
  res: Response,
  next: NextFunction
) => {
  req.params.id = req.user.id
  next()
}

const updateMe = catchAsync(
  async (
    req: IRequestWithAdditionalFields,
    res: Response,
    next: NextFunction
  ) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      )
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email', 'photo')

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    })
  }
)

const deleteMe = catchAsync(
  async (
    req: IRequestWithAdditionalFields,
    res: Response,
    next: NextFunction
  ) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })

    res.status(204).json({
      status: 'success',
      data: null,
    })
  }
)

const createUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  })
}

const getUser = handleFactory.getOne<IUser>(User)
const getAllUsers = handleFactory.getAll<IUser>(User)

// Do NOT update passwords with this!
const updateUser = handleFactory.updateOne<IUser>(User)
const deleteUser = handleFactory.deleteOne<IUser>(User)

export default {
  getMe,
  updateMe,
  deleteMe,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
}
