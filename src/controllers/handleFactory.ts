import { Model as MongoModel } from 'mongoose'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import APIFeatures from './../utils/apiFeatures'

const deleteOne = <T>(Model: MongoModel<T>) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  })

const updateOne = <T>(Model: MongoModel<T>) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  })

const createOne = <T>(Model: MongoModel<T>) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: 'success',
      data: doc,
    })
  })

const getOne = <T>(Model: MongoModel<T>, popOptions?: any) =>
  catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id)
    // if (popOptions) query = query.populate(popOptions)
    const doc = await query

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  })

const getAll = <T>(Model: MongoModel<T>) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    const filter = {}
    // if (req.params.tourId) filter = { tour: req.params.tourId }

    const features = new APIFeatures<MongoModel<T>>(
      Model.find(filter),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const doc = await features.query

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    })
  })

export default {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
}
