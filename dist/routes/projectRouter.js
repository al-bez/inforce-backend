"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = __importDefault(require("../controllers/projectController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.route('/').get(projectController_1.default.getProjects);
router.route('/:id').get(projectController_1.default.getProject);
router.use(authController_1.default.protect);
router.use(authController_1.default.restrictTo('admin'));
router.route('/').post(projectController_1.default.createProject);
router
    .route('/:id')
    .patch(projectController_1.default.updateProject)
    .delete(projectController_1.default.deleteProject);
exports.default = router;
//# sourceMappingURL=projectRouter.js.map