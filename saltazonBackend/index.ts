import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import moment from 'moment-timezone';
import path from 'path';
import fs from 'fs';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user';
import productRouter from './routes/product';
import storeRouter from './routes/store';
import './middlewares/passport-local-login';
import './middlewares/passport-local-register';
import './middlewares/passport-jwt-auth';



dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'backend-logging', 'access.log'), { flags: 'a' });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(passport.initialize());
morgan.token('date', () => moment().tz('Europe/Stockholm').format('YYYY-MM-DD HH:mm ZZ'));
app.use(morgan('Type :method, Date [:date[Europe/Stockholm]], StatusCode :status', { stream: accessLogStream }));
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/store', storeRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Index');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
