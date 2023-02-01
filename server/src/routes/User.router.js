import express from 'express';
const router = express.Router();
import {register, login, activate, logout, refresh, update} from '../controllers/User.controller.js';
import authMiddleware from '../middlewares/Auth.middleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.post('/updateUser', authMiddleware, update)
export default router;
