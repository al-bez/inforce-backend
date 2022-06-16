"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectModel_1 = __importDefault(require("../models/ProjectModel"));
const handleFactory_1 = __importDefault(require("./handleFactory"));
const createProject = handleFactory_1.default.createOne(ProjectModel_1.default);
const updateProject = handleFactory_1.default.updateOne(ProjectModel_1.default);
const deleteProject = handleFactory_1.default.deleteOne(ProjectModel_1.default);
const getProject = handleFactory_1.default.getOne(ProjectModel_1.default);
const getProjects = handleFactory_1.default.getAll(ProjectModel_1.default);
exports.default = {
    createProject,
    updateProject,
    deleteProject,
    getProject,
    getProjects,
};
//# sourceMappingURL=projectController.js.map