import express from 'express';
import fs from "fs";
import authMiddleware from "../middlewares/Auth.middleware.js";
import {
    createComment,
    createCourse,
    createLesson, deleteComment,
    getAllCourses,
    getComments,
    getCourse, visitedLesson,
} from "../controllers/Course.controller.js";
const router = express.Router();



router.post('/course', authMiddleware, createCourse);

router.post('/lesson/:id', authMiddleware, createLesson)

router.get('/course', authMiddleware, getAllCourses);

router.get('/course/:id', authMiddleware, getCourse);

router.get('/getComments/:id', authMiddleware, getComments);

router.post('/comment/:id', authMiddleware, createComment);

router.delete('/comment/:id', authMiddleware, deleteComment);

router.post('/visitedLesson', authMiddleware, visitedLesson);
export default router;
