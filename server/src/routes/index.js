import express from 'express';
const router = express.Router();
import userRouter from './User.router';
import fileRouter from './File.router';
import courseRouter from './Course.router';
import chatRouter from "./Chat.router";
import messageRouter from "./Message.router";

router.use('/users', userRouter);
router.use('/files', fileRouter);
router.use('/courses', courseRouter);
router.use('/chat', chatRouter);
router.use('/messages', messageRouter);
export default router;
