import express from 'express';
import {
  newBrand,
  getBrands,
  getBrand,
  updateBrand
} from '../controllers/brands.controller.js';

const router = express.Router();

router.get('/', getBrands);
router.get('/:id', getBrand);
router.post('/', newBrand);
router.put('/:id', updateBrand);

export default router;
