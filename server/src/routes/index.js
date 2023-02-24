import express from 'express';
const router = express.Router();
import userRouter from './User.router.js';
import fileRouter from './File.router.js';
import courseRouter from './Course.router.js';
import chatRouter from "./Chat.router.js";
import messageRouter from "./Message.router.js";

router.use('/users', userRouter);
router.use('/files', fileRouter);
router.use('/courses', courseRouter);
router.use('/chat', chatRouter);
router.use('/messages', messageRouter);
export default router;
