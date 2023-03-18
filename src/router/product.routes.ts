import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import {
  paramIdProductValidator,
  saveProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from '../validators/product.validator';

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', paramIdProductValidator, getProductById);

router.post('/', saveProductValidator, saveProduct);

router.put('/:id', updateProductValidator, updateProduct);

router.delete('/:id', deleteProductValidator, deleteProduct);

export default router;
