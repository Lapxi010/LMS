import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3333'}));

app.use(cookieParser(process.env.JWT_SECRET, cookieOptions));

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on port=${port}`);
});
