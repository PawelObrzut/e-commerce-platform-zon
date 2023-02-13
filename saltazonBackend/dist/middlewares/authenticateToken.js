"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const refreshKey = process.env.REFRESH_TOKEN_SECRET;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!refreshKey) {
        return res.sendStatus(500);
    }
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const reqToken = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(reqToken, refreshKey, (error, decoded) => {
        if (error) {
            return res.sendStatus(403);
        }
        next();
    });
};
exports.default = authenticateToken;
