import { check, body } from 'express-validator';
import { productExist, categoryExist } from '../helpers/db-validators';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { hasRoles } from '../middlewares/validate-roles';
import { ERoles } from '../models/role.model';

export const paramIdProductValidator = [
  check('id', 'not a  mongo id').isMongoId(),
  check('id').custom(productExist),
  validateFields,
];

export const saveProductValidator = [
  validateJWT,
  body('name').isString().notEmpty(),
  body('category', 'not a  mongo id').isMongoId(),
  check('category').custom(categoryExist),
  validateFields,
];

export const updateProductValidator = [
  validateJWT,
  check('id', 'not a  mongo id').isMongoId(),
  check('id').custom(productExist),
  body('name').isString().notEmpty(),
  validateFields,
];

export const deleteProductValidator = [
  validateJWT,
  hasRoles(ERoles.ADMIN),
  check('id', 'not a  mongo id').isMongoId(),
  check('id').custom(productExist),
  validateFields,
];
