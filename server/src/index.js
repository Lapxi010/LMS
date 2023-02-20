import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import expressLimit from "express-rate-limit";
import router from './routes/index.js';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import { createServer } from 'http';
import {Server} from "socket.io";

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
app.use('/uploads', express.static('./src/static'));
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3333'}));
app.use(helmet());
app.use(cookieParser(process.env.JWT_SECRET, cookieOptions));


app.use('/api/v1', expressRateLimit);

app.use('/api/v1', [(req, res, next) => {
    setTimeout(()=> {
        next()
    }, 1)
}], router);

const server = createServer(app)

const io = new Server(server, {
    cors: "http://localhost:3333",
    serveClient: false
})

let activeUsers = []

io.on('connection', (socket) => {
    socket.on('new-user-add', (newUserId) => {
        if(!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({userId: newUserId, socketId: socket.id});
            console.log('New User Connected', activeUsers);
        }

        io.emit('get-users', activeUsers);
    });

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log('User Disconnected', activeUsers);

        io.emit('get-users', activeUsers);
    });

    socket.on('send-message', (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);

        if (user) {
            io.to(user.socketId).emit('recieve-message', data);
        }
    });
})

server.listen(port, () => {
    console.log(`Server is running on port=${port}`);
});