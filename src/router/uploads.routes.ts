import { Router } from 'express';
import {
  uploadFile,
  updateUploadFile,
  showImage,
} from '../controllers/uploads.controller';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { collectionsAllowed } from '../helpers/db-validators';
import { validateFile } from '../middlewares/validate-file';

const router = Router();

router.post('/', validateFile, uploadFile);

router.put(
  '/:collection/:id',
  [
    validateFile,
    check('id').isMongoId(),
    check('collection').custom((c) =>
      collectionsAllowed(c, ['user', 'product'])
    ),
    validateFields,
  ],
  updateUploadFile
);

router.get(
  '/:collection/:id',
  [
    check('id').isMongoId(),
    check('collection').custom((c) =>
      collectionsAllowed(c, ['user', 'product'])
    ),
    validateFields,
  ],
  showImage
);
export default router;
