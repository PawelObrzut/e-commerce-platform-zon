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
exports.genereteRefreshJWT = exports.generateAccessJWT = exports.findUserByEmail = exports.expirationTime = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const privateKey = process.env.ACCESS_TOKEN_SECRET;
const refreshKey = process.env.REFRESH_TOKEN_SECRET;
exports.expirationTime = 5;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const usersCollection = yield fetch('http://127.0.0.1:8000/api/user/', { method: 'GET' }).then(response => response.json());
    return usersCollection.data.find((user) => user.email === email);
});
exports.findUserByEmail = findUserByEmail;
const generateAccessJWT = (user) => {
    if (!privateKey) {
        return 'Error, unable to issue a valid token';
    }
    return jsonwebtoken_1.default.sign(user, privateKey, { expiresIn: `${exports.expirationTime}m` });
};
exports.generateAccessJWT = generateAccessJWT;
const genereteRefreshJWT = (user) => {
    if (!refreshKey) {
        return 'Error, unable to issue a valid token';
    }
    return jsonwebtoken_1.default.sign(user, refreshKey);
};
exports.genereteRefreshJWT = genereteRefreshJWT;
exports.modules = {
    findUserByEmail: exports.findUserByEmail,
    generateAccessJWT: exports.generateAccessJWT,
    genereteRefreshJWT: exports.genereteRefreshJWT,
    expirationTime: exports.expirationTime,
};
