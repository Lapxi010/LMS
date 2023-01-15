import express from 'express';
const router = express.Router();
import {register, login, authMe, activate, logout, refresh} from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/authMe', authMiddleware, authMe);

export default router;
