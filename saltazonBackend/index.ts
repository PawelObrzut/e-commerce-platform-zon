import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import productRouter from './routes/product';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';
import './middlewares/passport-local-login';
import './middlewares/passport-local-register';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'backend-logging' , 'access.log'), { flags: 'a' })

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
morgan.token('date', () =>  moment().tz('Europe/Stockholm').format('YYYY-MM-DD HH:mm ZZ'))
app.use(morgan('Type :method, Date [:date[Europe/Stockholm]], StatusCode :status', { stream: accessLogStream }));
app.use('/user', userRouter);
app.use('/product', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Index');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});