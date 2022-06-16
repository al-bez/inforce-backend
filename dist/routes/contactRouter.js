"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = __importDefault(require("../controllers/contactController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.route('/').post(contactController_1.default.createContact);
router.use(authController_1.default.protect);
router.use(authController_1.default.restrictTo('admin'));
router.route('/').get(contactController_1.default.getContacts);
router
    .route('/:id')
    .get(contactController_1.default.getContact)
    .patch(contactController_1.default.updateContact)
    .delete(contactController_1.default.deleteContact);
exports.default = router;
//# sourceMappingURL=contactRouter.js.map