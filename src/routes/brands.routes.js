import express from 'express';
import { getBrands, addBrand, getBrandById, updateBrandDescription } from '../controllers/brands.controller.js';

const router = express.Router();

router.get('/', getBrands);
router.post('/', addBrand);
router.get('/:id', getBrandById);
router.patch('/:id', updateBrandDescription);

export default router;
