import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import expressLimit from "express-rate-limit";
import router from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const expressRateLimit = expressLimit({
    windowMs: 100 * 60 * 1000,
    max: 154234242424243242,
    standardHeaders: false,
    legacyHeaders: false,
});
const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3333'}));
app.use(helmet());

app.use(cookieParser(process.env.JWT_SECRET, cookieOptions));

app.use('/api/v1', expressRateLimit);

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on port=${port}`);
});
