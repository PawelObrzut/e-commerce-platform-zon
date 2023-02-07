import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import productRouter from './routes/product';
import passport from 'passport';
import * as PassportLocal from 'passport-local';
import { InterfaceUser } from './types/types';
import bcrypt from 'bcrypt';
const bodyParser = require('body-parser');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

passport.use(new PassportLocal.Strategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    console.log('in the passport strategy before searching for a user')
    const usersCollection = await fetch(`http://localhost:8000/api/user/`, {method: 'GET'}).then(response => response.json());
    const user = usersCollection.data.find((user: InterfaceUser) => user.email === email);
    if (!user) {
      return done(null, false, { message: 'User not found!'})
    }
    try {
      if (await bcrypt.compare(password, user.password)){
        return done(null, user)
      }
      return done(null, false, { message: 'Password is incorrect' })
    } catch (error) {
      return done(error)
    }
  } catch (error) {
    done(error)
  }
}));

app.use(passport.initialize());

app.use('/user', passport.authenticate('local', { failureRedirect: '/user/login' }), userRouter);
app.use('/product', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Index');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});