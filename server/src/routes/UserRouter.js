import express from 'express';
const router = express.Router();
import {register, login, authMe} from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.get('/authMe', authMiddleware, authMe);

export default router;
