import Project from '../models/ProjectModel'
import handleFactory from './handleFactory'
import { IProject } from 'types'

const createProject = handleFactory.createOne<IProject>(Project)
const updateProject = handleFactory.updateOne<IProject>(Project)
const deleteProject = handleFactory.deleteOne<IProject>(Project)
const getProject = handleFactory.getOne<IProject>(Project)
const getProjects = handleFactory.getAll<IProject>(Project)

export default {
  createProject,
  updateProject,
  deleteProject,
  getProject,
  getProjects,
}
