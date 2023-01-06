import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import router from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const sessionsOptions = {
  key: 'token',
  secret: process.env.JWT_SECRET,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 15,
  }
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session(sessionsOptions));

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on port=${port}`);
});
