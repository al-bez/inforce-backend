"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const appError_1 = __importDefault(require("./utils/appError"));
// Router
const contactRouter_1 = __importDefault(require("./routes/contactRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const projectRouter_1 = __importDefault(require("./routes/projectRouter"));
// Enable CORS
// const whitelist = ['https://inforce.digital/', 'http://localhost:3000/']
// const corsOptions: CorsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
// }
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.enable('trust proxy');
// Security HTTP Headers
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
// Limits requests for specific api
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'To many requsets from current API! Try again in 1 hour',
});
app.use('/api', limiter);
// Data sanitization against NOSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
// Data sanitization against XSS
app.use((0, xss_clean_1.default)());
app.use((0, compression_1.default)());
// Body parser, reading data from body into req.body
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
// ROUTES
app.use('/api/v1/users', userRouter_1.default);
app.use('/api/v1/contact', contactRouter_1.default);
app.use('/api/v1/projects', projectRouter_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map