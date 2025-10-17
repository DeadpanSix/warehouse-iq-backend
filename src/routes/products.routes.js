import express from 'express';
import {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deactivateProduct,

} from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.patch('/:id', updateProduct);
router.patch('/:id/deactivate', deactivateProduct);

export default router;
