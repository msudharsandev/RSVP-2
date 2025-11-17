import { Router } from 'express';
import {
  getAllCategoryController,
  getCategoryByIdController,
} from '@/controllers/category.controller';
import authMiddleware from '@/middleware/authMiddleware';

const categoryRouter: Router = Router();

categoryRouter.get('/', authMiddleware, getAllCategoryController);

categoryRouter.get('/:id', authMiddleware, getCategoryByIdController);

export { categoryRouter };
