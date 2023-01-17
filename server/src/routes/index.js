import express from 'express';
const router = express.Router();
import userRouter from './User.router';
import fileRouter from './File.router';
import courseRouter from './Course.router';

router.use('/users', userRouter);
router.use('/files', fileRouter);
router.use('/courses', courseRouter);
export default router;
