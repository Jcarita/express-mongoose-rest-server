import { Router } from 'express';
import {
  getCategoryByIdValidator,
  saveCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from '../validators/category.validator';
import {
  getCategories,
  getCategory,
  saveCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller';

const router = Router();

router.get('/', getCategories);

router.get('/:id', getCategoryByIdValidator, getCategory);

router.post('/', saveCategoryValidator, saveCategory);

router.put('/:id', updateCategoryValidator, updateCategory);

router.delete('/:id', deleteCategoryValidator, deleteCategory);

export default router;
