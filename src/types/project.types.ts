import { Date } from 'mongoose'

export interface IImage {
  src: string
  src_pixel: string
}

export interface ICustomer {
  name: string
  avatar: IImage
  review: string
  logo: IImage
  business_needs: string
  result: string
}

export interface IProject {
  title: string
  description: string
  img_preview: IImage
  imgs: IImage[]
  customer: ICustomer
  createdAt: Date
}
