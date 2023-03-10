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
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils/utils");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const refreshTokens = [];
const refreshKey = process.env.REFRESH_TOKEN_SECRET;
router.get('/', authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersCollection = yield fetch('http://localhost:8000/api/user/', { method: 'GET' }).then(response => response.json());
    return res.send(usersCollection);
}));
router.post('/login', passport_1.default.authenticate('login'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const accessToken = generateAccessJWT(req.user as RequestUser);
    const refreshToken = (0, utils_1.genereteRefreshJWT)(req.user);
    refreshTokens.push(refreshToken);
    return res.cookie('credentials', refreshToken).send();
}));
router.post('/refreshToken', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    if (!refreshKey) {
        return res.status(500).json({ message: 'Cannot refresh Token' });
    }
    jsonwebtoken_1.default.verify(refreshToken, refreshKey, (error, user) => {
        if (error) {
            return res.sendStatus(403);
        }
        const accessToken = (0, utils_1.generateAccessJWT)(user);
        return res.json({ accessToken });
    });
    return res.status(500).json({ message: 'oops' });
});
router.post('/register', passport_1.default.authenticate('register'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('User or Admin has been created');
    return res.status(203).json({ message: 'User Registered' });
}));
exports.default = router;
