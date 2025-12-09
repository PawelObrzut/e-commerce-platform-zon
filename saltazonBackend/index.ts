import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import moment from 'moment-timezone';
import path from 'path';
import fs from 'fs';
import passport from 'passport';
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

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'backend-logging', 'access.log'),
  { flags: 'a' }
);

const allowedOrigins: string[] = ['https://react-saltazon-production.up.railway.app'];

app.options('*', (req: Request, res: Response) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Accept, Origin'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH'
  );

  return res.sendStatus(200);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Accept, Origin'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH'
  );

  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
morgan.token('date', () => moment().tz('Europe/Stockholm').format('YYYY-MM-DD HH:mm ZZ'));
app.use(morgan('Type :method, Date [:date[Europe/Stockholm]], StatusCode :status', {stream: accessLogStream}));
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/store', storeRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('This is node backend service.');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Running at http://localhost:${port}`);
});
