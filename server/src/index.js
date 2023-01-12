import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import expressLimit from "express-rate-limit";
import router from './routes/index.js';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

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

app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3333'}));
app.use(helmet());

app.use(cookieParser(process.env.JWT_SECRET, cookieOptions));

app.get('/getPdf', (req, res) => {
   res.status(200).sendFile(__dirname + '/static/1.pdf');
});

app.post('/upload', (req, res) => {
   if(req.files === null) {
       return res.status(400).json({ msg: 'No file uploaded' });
   }
   const file = req.files.file;

   if (!file) return res.json({ msg: 'No file uploaded' });
   const newFileName = `${Date.now()}-${file.name}`;
   file.mv(`${__dirname}/source/${newFileName}`, err => {
       if(err) {
           console.error(err);
           return res.status(500);
       }
       res.json({ fileName: newFileName, filePath: `/source/${newFileName}` });
   });

});

app.use('/api/v1', expressRateLimit);

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on port=${port}`);
});
