"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const product_1 = __importDefault(require("./routes/product"));
const passport_1 = __importDefault(require("passport"));
const PassportLocal = __importStar(require("passport-local"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const bodyParser = require('body-parser');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
passport_1.default.use(new PassportLocal.Strategy({
    usernameField: 'email'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('in the passport strategy before searching for a user');
        const usersCollection = yield fetch(`http://localhost:8000/api/user/`, { method: 'GET' }).then(response => response.json());
        const user = usersCollection.data.find((user) => user.email === email);
        if (!user) {
            return done(null, false, { message: 'User not found!' });
        }
        try {
            if (yield bcrypt_1.default.compare(password, user.password)) {
                return done(null, user);
            }
            return done(null, false, { message: 'Password is incorrect' });
        }
        catch (error) {
            return done(error);
        }
    }
    catch (error) {
        done(error);
    }
})));
app.use(passport_1.default.initialize());
app.use('/user', passport_1.default.authenticate('local', { failureRedirect: '/user/login' }), user_1.default);
app.use('/product', product_1.default);
app.get('/', (req, res) => {
    res.send('Index');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
