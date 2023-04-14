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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const api_1 = __importDefault(require("../api"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const refreshKey = process.env.REFRESH_TOKEN_SECRET;
const accessKey = process.env.ACCESS_TOKEN_SECRET;
const expireTime = '1m';
router.get('/', passport_1.default.authenticate('authenticateJWT'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${api_1.default}/api/user/`);
        const usersCollection = response.data;
        return res.send(usersCollection);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
router.post('/login', passport_1.default.authenticate('login'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!accessKey || !refreshKey || !req.user) {
        return res.status(500).json({ message: 'Internal server error' });
    }
    const { id: userId } = req.user;
    const accessToken = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, req.user), { iat: Math.floor(Date.now() / 1000) }), accessKey, { expiresIn: expireTime });
    const refreshToken = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, req.user), { iat: Math.floor(Date.now() / 1000) }), refreshKey);
    const body = {
        id: userId,
        token: refreshToken,
    };
    try {
        yield axios_1.default.post(`${api_1.default}/api/user/saveRefreshToken`, body, { headers: { 'Content-Type': 'application/json' } });
        return res
            .status(203)
            .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
            .json({
            accessToken: accessToken,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error, could not save the refresh token.' });
    }
}));
router.post('/refreshToken', (req, res) => {
    const { refreshToken } = req.cookies;
    console.log('the refresh token received from the client is :::', refreshToken);
    if (!refreshToken) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    if (!refreshKey || !accessKey) {
        return res.status(500).json({ message: 'Internal server error' });
    }
    axios_1.default
        .get(`${api_1.default}/api/user/token/${refreshToken}`)
        .then((response) => {
        const message = response.data;
        if (message) {
            jsonwebtoken_1.default.verify(refreshToken, refreshKey, (err, decode) => {
                if (err) {
                    return res.sendStatus(403);
                }
                const { iat, exp } = decode, userData = __rest(decode, ["iat", "exp"]);
                const accessToken = jsonwebtoken_1.default.sign(userData, accessKey, { expiresIn: expireTime });
                return res.status(203).json({ accessToken: accessToken });
            });
        }
        else {
            return res.status(403).json({ message: 'Refresh token revoked' });
        }
    })
        .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error, could not refresh the token.' });
    });
});
router.post('/register', passport_1.default.authenticate('register'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.status(203).json({ message: 'User Registered' }); }));
router.delete('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken)) {
        return res.status(204).json({ message: 'No cookie-token to delete' });
    }
    const refreshToken = cookies.refreshToken;
    try {
        const response = yield axios_1.default.delete(`${api_1.default}/api/user/token/${refreshToken}`);
        // console.log(response.data)
        return res
            .clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        })
            .sendStatus(204);
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        })
            .json({ message: 'cookie deleted' });
    }
}));
exports.default = router;
