import express from 'express';
const router = express.Router();
import {getImage, uploadVideo, uploadImage} from '../controllers/File.controller'

router.get('/getImage/:id', getImage);

router.post('/uploadVideo/:id', uploadVideo);
router.post('/uploadImage/:id', uploadImage);

export default router;
