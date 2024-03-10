"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.register = void 0;
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: errors.array() });
    }
    try {
        let user = yield user_model_1.default.findOne({ email: req.body.email });
        let username = yield user_model_1.default.findOne({ username: req.body.username });
        if (user || username) {
            return res.status(400).send({ message: 'User already exists!' });
        }
        user = new user_model_1.default(req.body);
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1D'
        });
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000
        });
        return res.status(200).send({ message: 'User registered successfully!' });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
});
exports.register = register;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        //WE DONT WANT TO INCLUDE PASSWORD IN RESPONSE
        const user = yield user_model_1.default.findById(userId).select('password');
        if (!user) {
            return res.status(400).send({ message: 'User not found!' });
        }
        res.status(200).json(user);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
});
exports.me = me;
