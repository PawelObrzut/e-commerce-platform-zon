import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import productRouter from './routes/product';
import passport from 'passport';
import './middlewares/passport-strategy-local'; // TS side-effect import

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use(passport.initialize());
// app.use('/user', passport.authenticate('local', { failureRedirect: '/user/login' }), userRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Index');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});