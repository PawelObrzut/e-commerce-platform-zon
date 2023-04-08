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
exports.findUserByEmail = void 0;
const api_1 = __importDefault(require("../api"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const usersCollection = yield fetch(`${api_1.default}/api/user/`, { method: 'GET' }).then(response => response.json());
    return usersCollection.data.find((user) => user.email === email);
});
exports.findUserByEmail = findUserByEmail;
exports.modules = {
    findUserByEmail: exports.findUserByEmail,
};
