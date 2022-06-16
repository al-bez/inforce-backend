import express from 'express'
import projectController from '../controllers/projectController'
import authController from '../controllers/authController'

const router = express.Router()

router.route('/').get(projectController.getProjects)
router.route('/:id').get(projectController.getProject)

router.use(authController.protect)
router.use(authController.restrictTo('admin'))

router.route('/').post(projectController.createProject)

router
  .route('/:id')
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject)

export default router
