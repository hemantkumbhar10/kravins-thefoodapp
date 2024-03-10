"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controllers/user.controller");
const verifytoken_middleware_1 = require("../middlewares/verifytoken.middleware");
const router = express_1.default.Router();
router.get('/me', verifytoken_middleware_1.verifyToken, user_controller_1.me);
router.post('/register', [(0, express_validator_1.check)('firstname', 'Firstname is required!').isString(),
    (0, express_validator_1.check)('lastname', 'Lastname is required!').isString(),
    (0, express_validator_1.check)('username', 'Username is required!').isString(),
    (0, express_validator_1.check)('email', 'Email is invalid!').isEmail(),
    (0, express_validator_1.check)('password', 'Password must contain 1 Uppercase, 1 Symbol & 1 numeric character!').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 })], user_controller_1.register);
exports.default = router;
