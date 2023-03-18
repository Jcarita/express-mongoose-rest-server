import { body, check } from 'express-validator';
import { categoryExist } from '../helpers/db-validators';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { hasRoles } from '../middlewares/validate-roles';
import { ERoles } from '../models/role.model';

export const getCategoryByIdValidator = [
  check('id').isMongoId(),
  check('id').custom(categoryExist),
  validateFields,
];

export const saveCategoryValidator = [
  validateJWT,
  body('name', 'The name is required').isString().notEmpty(),
  validateFields,
];

export const updateCategoryValidator = [
  validateJWT,
  check('id').isMongoId(),
  check('id').custom(categoryExist),
  body('name', 'The name is required').isString().notEmpty(),
  validateFields,
];

export const deleteCategoryValidator = [
  validateJWT,
  hasRoles(ERoles.ADMIN),
  check('id').isMongoId(),
  check('id').custom(categoryExist),
  validateFields,
];
