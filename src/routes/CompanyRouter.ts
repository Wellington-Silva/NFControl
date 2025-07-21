import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const router = Router();

router.post('/sign', CompanyController.login);
router.get('/', CompanyController.list);
router.post('/:id', CompanyController.show);
router.post('/', CompanyController.register);
router.put('/:id', CompanyController.update);
router.delete('/:id', CompanyController.delete);

export default router;