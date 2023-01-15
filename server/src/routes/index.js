import express from 'express';
const router = express.Router();
import userRouter from './User.router';
import fileRouter from './File.router';

router.use('/users', userRouter);
router.use('/files', fileRouter);
export default router;
