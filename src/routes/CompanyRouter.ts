import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';
import authMiddleware from '../middlewares/jwt';

const router = Router();

router.post('/sign', CompanyController.login);
router.get('/', authMiddleware, CompanyController.list);
router.post('/:id', authMiddleware, CompanyController.show);
router.post('/', CompanyController.register);
router.put('/:id', authMiddleware, CompanyController.update);
router.delete('/:id', authMiddleware, CompanyController.delete);

export default router;