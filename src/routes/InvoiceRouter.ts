import { Router } from 'express';
import InvoiceController from '../controllers/InvoiceController';

const router = Router();

router.get('/', InvoiceController.history);
router.delete('/cancel', InvoiceController.cancel);
router.post('/emission', InvoiceController.emission);
router.post('/validate', InvoiceController.validation);
router.get('/consultation', InvoiceController.consultation);

export default router;