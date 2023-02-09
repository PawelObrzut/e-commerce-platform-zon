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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
dotenv_1.default.config();
const privateKey = process.env.ACCESS_TOKEN_SECRET;
router.get('/', authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersCollection = yield fetch(`http://localhost:8000/api/user/`, { method: 'GET' }).then(response => response.json());
    return res.send(usersCollection);
}));
router.post('/login', passport_1.default.authenticate('login'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.send({ message: "Did you forget password?" });
    }
    if (!privateKey) {
        return res.send('internal server error');
    }
    const token = jsonwebtoken_1.default.sign({ userid: req.user.id, mail: req.user.email }, privateKey
    // { expiresIn: '1d' } // ! I do not know yet how to refresh the token
    );
    return res.json({
        accessToken: token,
        email: req.user.email
    });
}));
router.post('/register', passport_1.default.authenticate('register'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('User or Admin has been created');
    return res.status(203).json({ message: 'User Registered' });
}));
exports.default = router;
