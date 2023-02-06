import express from 'express';
const router = express.Router();
import {getImage, uploadVideo, uploadImage, uploadDoc, docDownload} from '../controllers/File.controller'

router.get('/getImage/:id', getImage);

router.post('/uploadVideo/:id', uploadVideo);
router.post('/uploadImage/:id', uploadImage);
router.post('/uploadDoc/:id', uploadDoc);
router.get('/docDownload/:id', docDownload);

export default router;
