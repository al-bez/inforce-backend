import express from 'express'
import contactController from '../controllers/contactController'
import authController from '../controllers/authController'

const router = express.Router()

router.route('/').post(contactController.createContact)

router.use(authController.protect)
router.use(authController.restrictTo('admin'))

router.route('/').get(contactController.getContacts)

router
  .route('/:id')
  .get(contactController.getContact)
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact)

export default router
