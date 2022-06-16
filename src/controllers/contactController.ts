import Contact from '../models/ContactModel'
import handleFactory from './handleFactory'
import { IContact } from 'types'

const createContact = handleFactory.createOne<IContact>(Contact)
const updateContact = handleFactory.updateOne<IContact>(Contact)
const deleteContact = handleFactory.deleteOne<IContact>(Contact)
const getContact = handleFactory.getOne<IContact>(Contact)
const getContacts = handleFactory.getAll<IContact>(Contact)

export default {
  createContact,
  updateContact,
  deleteContact,
  getContact,
  getContacts,
}
