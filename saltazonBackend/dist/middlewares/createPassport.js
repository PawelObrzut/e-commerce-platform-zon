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
// import LocalStrategy from 'passport-local'
const LocalStrategy = require('passport-local').Strategy;
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // ?? due to async nature should it be wrapped in try catch block ?
    const usersCollection = yield fetch(`http://localhost:8000/api/user/`, { method: 'GET' }).then(response => response.json());
    return usersCollection.data.find((user) => user.email === email);
});
const createPassport = (passport, getUserByEmail) => {
    const verifyCallback = (user, password, cb) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user) {
            return cb(null, false, { message: 'User not found' });
        }
        try {
            if (yield bcrypt_1.default.compare(password, user.password)) {
                return cb(null, user);
            }
            return cb(null, false, { message: 'Password is incorrect' });
        }
        catch (error) {
            return cb(error);
        }
    });
    passport.use(new LocalStrategy(verifyCallback));
    passport.serializeUser();
    passport.deserializeUser();
};
exports.default = createPassport;
