import express from 'express';
const router = express.Router();
import {addMessage, getMessages} from "../controllers/Message.controller";

router.post('/', addMessage);

router.get('/:chatId', getMessages);

export default router;