"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const product_1 = __importDefault(require("./routes/product"));
const passport_1 = __importDefault(require("passport"));
require("./middlewares/passport-local-login"); // ! TS side-effect import
require("./middlewares/passport-local-signup");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use('/user', user_1.default);
app.use('/product', product_1.default);
app.get('/', (req, res) => {
    res.send('Index');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
