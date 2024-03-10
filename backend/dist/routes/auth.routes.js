"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const verifytoken_middleware_1 = require("../middlewares/verifytoken.middleware");
const router = express_1.default.Router();
router.post('/login', [(0, express_validator_1.check)('email', 'Email field is invalid!').isEmail(),
    (0, express_validator_1.check)('password', 'Password field is invalid!').isLength({ min: 8 })
], auth_controller_1.login);
router.get('/validate-token', verifytoken_middleware_1.verifyToken, auth_controller_1.validateToken);
router.post('/logout', auth_controller_1.logout);
exports.default = router;
