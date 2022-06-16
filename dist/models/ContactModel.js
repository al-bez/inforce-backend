"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const contactSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minLength: 1,
        maxLength: 100,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please provide a valid email'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g)
                    ? true
                    : false;
            },
            message: 'Not valid phone number',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});
const Contact = mongoose_1.default.model('Contact', contactSchema);
exports.default = Contact;
//# sourceMappingURL=ContactModel.js.map