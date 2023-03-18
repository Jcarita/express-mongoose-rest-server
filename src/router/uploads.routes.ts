import { Router } from 'express';
import { uploadFile } from '../controllers/uploads.controller';

const router = Router();

router.post('/', uploadFile);

export default router;
