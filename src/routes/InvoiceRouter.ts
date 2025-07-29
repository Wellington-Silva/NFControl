import { Router } from 'express';
import authMiddleware from '../middlewares/jwt';
import InvoiceController from '../controllers/InvoiceController';

const router = Router();

router.delete('/cancel', InvoiceController.cancel);
router.post('/emission', InvoiceController.emission);
router.get('/', authMiddleware, InvoiceController.history);
router.get('/consultation', InvoiceController.consultation);
router.get('/validate', authMiddleware, InvoiceController.validation);

export default router;