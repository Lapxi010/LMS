import express from 'express';
import fs from "fs";
import authMiddleware from "../middlewares/Auth.middleware";
import {
    createComment,
    createCourse,
    createLesson, deleteComment,
    getAllCourses,
    getComments,
    getCourse, visitedLesson,
} from "../controllers/Course.controller";
const router = express.Router();

router.get('/video/:id', (req, res) => {
    const path =  `${__dirname}/../source/${req.params.id}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }

        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

router.post('/course', authMiddleware, createCourse);

router.post('/lesson/:id', authMiddleware, createLesson)

router.get('/course', authMiddleware, getAllCourses);

router.get('/course/:id', authMiddleware, getCourse);

router.get('/getComments/:id', authMiddleware, getComments);

router.post('/comment/:id', authMiddleware, createComment);

router.delete('/comment/:id', authMiddleware, deleteComment);

router.post('/visitedLesson', authMiddleware, visitedLesson);
export default router;
