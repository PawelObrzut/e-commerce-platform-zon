"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./routes/user"));
const product_1 = __importDefault(require("./routes/product"));
const store_1 = __importDefault(require("./routes/store"));
require("./middlewares/passport-local-login");
require("./middlewares/passport-local-register");
require("./middlewares/passport-jwt-auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'backend-logging', 'access.log'), { flags: 'a' });
app.use(function (req, res, next) {
    const allowedOrigins = ['https://tradezon-vite.onrender.com', 'http://localhost:5173'];
    const origin = req.headers.origin;
    console.log('setting cors', origin);
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE');
    console.log('cors: res.header is set');
    next();
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
morgan_1.default.token('date', () => (0, moment_timezone_1.default)().tz('Europe/Stockholm').format('YYYY-MM-DD HH:mm ZZ'));
app.use((0, morgan_1.default)('Type :method, Date [:date[Europe/Stockholm]], StatusCode :status', { stream: accessLogStream }));
app.use('/user', user_1.default);
app.use('/product', product_1.default);
app.use('/store', store_1.default);
app.get('/', (req, res) => {
    res.send('Index');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
