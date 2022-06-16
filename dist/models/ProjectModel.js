"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
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
});
const Project = mongoose_1.default.model('Project', projectSchema);
exports.default = Project;
//# sourceMappingURL=ProjectModel.js.map