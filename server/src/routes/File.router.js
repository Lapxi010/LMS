import express from 'express';
const router = express.Router();
import {
    getImage,
    uploadVideo,
    uploadImage,
    uploadDoc,
    docDownload,
    deleteVideo,
    deleteImage,
    uploadImageUser, deleteTitleImage
} from '../controllers/File.controller'

router.get('/getImage/:id', getImage);

router.post('/uploadVideo/:id', uploadVideo);
router.post('/uploadImageUser/:id', uploadImageUser)
router.post('/deleteVideo', deleteVideo);
router.post('/uploadImage/:id', uploadImage);
router.post('/deleteImage', deleteImage);
router.post('/deleteTitleImage', deleteTitleImage);
router.post('/uploadDoc/:id', uploadDoc);
router.get('/docDownload/:id', docDownload);

export default router;
