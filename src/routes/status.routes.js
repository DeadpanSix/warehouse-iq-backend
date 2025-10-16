import express from 'express';
import {
  getAllStatus,
  getStatusById
} from '../controllers/status.controller.js';

const router = express.Router();

router.get('/', getAllStatus);
router.get('/:id', getStatusById);

export default router;
