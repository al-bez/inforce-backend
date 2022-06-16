"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContactModel_1 = __importDefault(require("../models/ContactModel"));
const handleFactory_1 = __importDefault(require("./handleFactory"));
const createContact = handleFactory_1.default.createOne(ContactModel_1.default);
const updateContact = handleFactory_1.default.updateOne(ContactModel_1.default);
const deleteContact = handleFactory_1.default.deleteOne(ContactModel_1.default);
const getContact = handleFactory_1.default.getOne(ContactModel_1.default);
const getContacts = handleFactory_1.default.getAll(ContactModel_1.default);
exports.default = {
    createContact,
    updateContact,
    deleteContact,
    getContact,
    getContacts,
};
//# sourceMappingURL=contactController.js.map