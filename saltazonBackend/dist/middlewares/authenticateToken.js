"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessKey = process.env.ACCESS_TOKEN_SECRET;
const authenticateToken = (req, res, next) => {
    console.log('is the token ok?');
    const authHeader = req.headers.authorization;
    if (!accessKey) {
        return res.sendStatus(500);
    }
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const accessToken = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(accessToken, accessKey, error => {
        if (error) {
            return res.sendStatus(403);
        }
        return next();
    });
    return (Error);
};
exports.default = authenticateToken;
