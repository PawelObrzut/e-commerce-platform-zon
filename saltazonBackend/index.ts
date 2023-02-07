import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import productRouter from './routes/product';
import passport from 'passport';
import './middlewares/passport-local-login'; // ! TS side-effect import
import './middlewares/passport-local-signup';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use(passport.initialize());
app.use('/user', userRouter);
app.use('/product', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Index');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});