import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/api/users';
import productRouter from './routes/api/products';
const bodyParser = require('body-parser');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Index');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});