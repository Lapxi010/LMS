import express from 'express';
const router = express.Router();
import {getPdf, uploadVideo, uploadImage} from '../controllers/File.controller'

router.get('/getPdf', getPdf);

router.post('/uploadVideo/:id', uploadVideo);
router.post('/uploadImage/:id', uploadImage);

export default router;
