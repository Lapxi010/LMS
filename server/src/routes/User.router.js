import express from 'express';
const router = express.Router();
import {
    register,
    login,
    activate,
    logout,
    refresh,
    update,
    enterCourse,
    getUser,
    getUsers, getAllUsers
} from '../controllers/User.controller.js';
import authMiddleware from '../middlewares/Auth.middleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/user/:userId', getUser)
router.get('/getAllUsers', getAllUsers)
router.post('/getUsers', getUsers)
router.post('/updateUser', authMiddleware, update)
router.post('/enterCourse', authMiddleware, enterCourse)
export default router;
