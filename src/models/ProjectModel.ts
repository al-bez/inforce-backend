import mongoose from 'mongoose'
import { IProject } from 'types'

const projectSchema = new mongoose.Schema<IProject>({
  title: {
    type: String,
    required: [true, 'Please provide project title'],
    minLength: 1,
    maxLength: 100,
  },
  description: {
    type: String,
    required: [true, 'Please provide project description'],
  },
  img_preview: { src: String, src_pixel: String },
  imgs: [{ src: String, src_pixel: String }],
  customer: {
    name: String,
    avatar: {
      src: String,
      src_pixel: String,
    },
    review: String,
    logo: {
      src: String,
      src_pixel: String,
    },
    business_needs: String,
    result: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
})

const Project = mongoose.model<IProject>('Project', projectSchema)

export default Project
