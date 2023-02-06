"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/api/users"));
const products_1 = __importDefault(require("./routes/api/products"));
const bodyParser = require('body-parser');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/users', users_1.default);
app.use('/api/products', products_1.default);
app.get('/', (req, res) => {
    res.send('Index');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
