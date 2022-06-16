import mongoose from 'mongoose'
import validator from 'validator'
import { IContact } from 'types'

const contactSchema = new mongoose.Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minLength: 1,
    maxLength: 100,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el: string) {
        return el.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g)
          ? true
          : false
      },
      message: 'Not valid phone number',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
})

const Contact = mongoose.model<IContact>('Contact', contactSchema)

export default Contact
