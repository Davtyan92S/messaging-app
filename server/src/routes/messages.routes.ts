import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getMessages, postMessage } from '../controllers/messages.controller';

const router = Router();

router.post('/', asyncHandler(postMessage));
router.get('/', asyncHandler(getMessages));

export default router;
